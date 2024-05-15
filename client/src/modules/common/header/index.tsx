import { Button, Modal, Tabs, User, UserLabel } from "@gravity-ui/uikit";
import ElementWrapper from "../private/element-wrapper";

import './index.css'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Auth from "../../auth";
import Auth_manager from "../../../scripts/auth_manager/auth_manager.ts";

export type HeaderProps = {
  serverURL: string
  auth_manager: Auth_manager
}

function Header(props: HeaderProps) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState("")

  const request = async () => {
    if (props.auth_manager.vk_checkIfAuthorized()) {
      const credentials = await props.auth_manager.vk_getCredentials()

      setUsername(credentials.username)
      setUserId(credentials.id)
    }
  }

  useEffect(() => {
    request()
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

  const [open, setOpen] = React.useState(false);

  if (!props.auth_manager.vk_checkIfAuthorized()) {
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
        <Button onClick={() => setOpen(true)}>Вход</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Auth></Auth>
        </Modal>
      </ElementWrapper>
    )
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

      <User avatar={{text: username, theme: 'brand'}} description={"id: " + userId} name={username} size="m" />
    </ElementWrapper>

  )
}

export default Header