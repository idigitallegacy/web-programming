import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'https://web-y25-makarov.onrender.com/',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('logged_in')
  async authorized(@MessageBody() username: string): Promise<void> {
    this.server.emit('broadcast_authorized', username)
  }

  @SubscribeMessage('logged_off')
  async exited(@MessageBody() username: string): Promise<void> {
    this.server.emit('broadcast_exited', username)
  }

  @SubscribeMessage('added_post')
  async new_post(@MessageBody() payload: string): Promise<void> {
    const json = JSON.parse(payload)
    let trimmedBody = json.body.substring(0, Math.min(100,json.body.length));
    if (json.body.length > 100)
      trimmedBody = trimmedBody + "..."
    this.server.emit('broadcast_new_post', JSON.stringify({id: json.id, title: json.title, body: trimmedBody}))
  }
}