import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

export interface Response {
  time: bigint;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        map((data) => { return { ...data, 'elapsed_time': Date.now() - now }; })
      );
  }
}