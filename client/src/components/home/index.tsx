import Header from "../../modules/common/header";
import Footer from "../../modules/common/footer";
import Content from "../../modules/common/content";
import NewsCollection from "../../modules/news/collection";
import { useNavigate, useSearchParams } from "react-router-dom";
import Auth_manager from "../../scripts/auth_manager/auth_manager.ts";
import { useEffect } from "react";
import auth_manager from "../../scripts/auth_manager/auth_manager.ts";
import NewsControls from "../../modules/news/news_controls";
import { io } from "socket.io-client";
import EventsLogger from "../../modules/common/events_logger";



export type HomeProps = {
  serverURL: string,
  eventsURL: string,
  auth_manager: Auth_manager
}

function Home(props: HomeProps) {
  const navigate = useNavigate();
  const [payload, setPayload] = useSearchParams();

  function auth() {
    if (payload.get("payload")) {
      props.auth_manager.vk_authorize(payload);
      setPayload(new URLSearchParams());
      navigate("/");
    }
  }

  useEffect(() => {
    auth()
  }, []);


  return (
    <>
      <EventsLogger eventsURL={props.eventsURL}></EventsLogger>
      <Header serverURL={props.serverURL} auth_manager={props.auth_manager}></Header>
      <Content wrap={true}>
        <NewsControls auth_manager={props.auth_manager}></NewsControls>
        <NewsCollection serverURL={props.serverURL} postsPerPage={10} currentPage={1}>
        </NewsCollection>
      </Content>
      <Footer></Footer>
    </>
  );
}

export default Home;