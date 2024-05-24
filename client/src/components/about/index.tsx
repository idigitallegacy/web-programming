import Header from "../../modules/common/header";
import Footer from "../../modules/common/footer";
import AuthManager from "../../scripts/auth_manager/auth_manager.ts";
import Content from "../../modules/common/content";

export type AboutProps = {
  serverURL: string,
  auth_manager: AuthManager
}

function About(props: AboutProps) {
  return (
    <>
      <Header serverURL={props.serverURL} auth_manager={props.auth_manager}></Header>
      <Content wrap={true}>
        <div>Наполнение отсутствует</div>
      </Content>
      <Footer></Footer>
    </>
  )
}

export default About