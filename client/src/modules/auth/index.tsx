import {Text} from '@gravity-ui/uikit';
import "./index.css"
import * as VKID from "@vkid/sdk";
import { useEffect } from "react";

function Auth() {
  VKID.Config.set({
    app: 51911097, // Идентификатор приложения.
    redirectUrl: 'http://localhost', // Адрес для перехода после авторизации.
    state: 'dj29fnsadjsd82...' // Произвольная строка состояния приложения.
  })

  const oneTap = new VKID.OneTap();
  let elementRendered = false

  useEffect(() => {
    const timerID = setInterval(() => {
      const element = document.getElementById('vkIDAuthWrapper');
      if (element && !elementRendered) {
        oneTap.render({ container: element, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS });
        elementRendered = true
      }
    }, 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return (
    <>
      <div className="auth-form">
        <Text variant="display-3">Авторизация</Text>
        <div id="vkIDAuthWrapper"></div>
      </div>
    </>
  )
}

export default Auth