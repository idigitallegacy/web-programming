import { Button, Modal, Tabs, User, UserLabel } from "@gravity-ui/uikit";
import ElementWrapper from "../private/element-wrapper";

import './index.css'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Auth from "../../auth";
import Auth_manager from "../../../scripts/auth_manager/auth_manager.ts";
import Badge from "../../badge";

export type HeaderProps = {
  serverURL: string
  auth_manager: Auth_manager
}

function Header(props: HeaderProps) {
  const navigate = useNavigate();

  const [authorized, setAuthorized] = useState(false)
  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState("")
  const [open, setOpen] = React.useState(false);

  const checkIfAuthorized = async () => {
    const is_authorized = await props.auth_manager.vk_checkIfAuthorized()
    setAuthorized(is_authorized)

    if (is_authorized) {
      const credentials = await props.auth_manager.vk_getCredentials()
      setUsername(credentials.username)
      setUserId(credentials.id)
    }
  }

  useEffect(() => {
    checkIfAuthorized()
  }, []);


  const navigationCallback = (tabId: string) => {
    switch (tabId) {
      case "home" : {
        navigate('/')
        break
      }
      case "about" : {
        navigate('/about')
        break
      }
    }
  }

  return (
    <ElementWrapper>
      <Tabs
        activeTab="first"
        className={"header-menu"}
        items={[
          { id: 'home', title: 'Главная' },
          { id: 'about', title: 'Обо мне' },
        ]}
        onSelectTab={navigationCallback}
      />


      <Button onClick={() => setOpen(true)} style={{display: authorized ? "none" : "block"}}>Вход</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Auth></Auth>
      </Modal>

      <>
        <User avatar={{text: username, theme: 'brand'}} description={"id: " + userId} name={username} size="m" style={{display: authorized ? "flex" : "none"}}/>
        <Button onClick={async () => {
          await props.auth_manager.vk_exit()
          navigate("/")
        } } style={{display: authorized ? "block" : "none"}}>Выход</Button>
      </>
    </ElementWrapper>)
}

export default Header