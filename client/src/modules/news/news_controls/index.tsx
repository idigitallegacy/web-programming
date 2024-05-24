import { useEffect, useState } from "react";
import Auth_manager from "../../../scripts/auth_manager/auth_manager.ts";
import "./index.css"
import { Button } from "@gravity-ui/uikit";

export type NewsControlsProps = {
  auth_manager: Auth_manager
}

function NewsControls(props: NewsControlsProps) {
  const [isAbleToWrite, setWriteAbility] = useState(false)
  const request = async () => {
    if (await props.auth_manager.vk_checkIfAuthorized()) {
      const credentials = await props.auth_manager.vk_getCredentials()
      if (credentials.is_active && credentials.group == 1)
        setWriteAbility(true)
    }
  }

  useEffect(() => {
    request()
  }, []);

  if (isAbleToWrite)
    return (
      <div className="news-controls">
        <Button view="action" size="l" href="/add_post">Добавить новость</Button>
      </div>
    )
}

export default NewsControls