import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useToaster } from "@gravity-ui/uikit";
import {Text} from '@gravity-ui/uikit';
import { useNavigate } from "react-router-dom";

export type EventProps = {
  eventsURL: string,
}

function EventsLogger(props: EventProps) {
  const {add} = useToaster();
  const navigate = useNavigate();

  function eventsReceiver() {
    const socket = io(props.eventsURL);
    socket.on('broadcast_authorized', (payload) => {
      add({
        name: "broadcast_authorized_" + payload,
        title: "Новый вход",
        content: (<>{payload} только что зашел на сайт!</>),
        theme: "info",
        autoHiding: 3000
      })
    });

    socket.on('broadcast_exited', (payload) => {
      add({
        name: "broadcast_exited_" + payload,
        title: "Выход",
        content: (<>{payload} вышел с сайта.</>),
        theme: "info",
        autoHiding: 3000
      })
    });

    socket.on('broadcast_new_post', (payload) => {
      console.log(payload)
      const json = JSON.parse(payload)
      add({
        name: "broadcast_new_post_" + json.id,
        title: "Новая запись",
        content: (<>
          <div><Text variant="header-1">{json.title}</Text></div>
          <div><Text variant="body-1">{json.body}</Text></div>
          <div></div>
        </>),
        actions: [{label: "Прочитать полностью", onClick: () => { navigate("post?id=" + json.id) }, view: "action"}],
        theme: "info",
        autoHiding: false,
        isClosable: true
      })
    });
  }

  useEffect(() => {
    eventsReceiver()
  }, []);

  return (
    <>

    </>
  )
}

export default EventsLogger