import { useEffect, useState } from "react";

let instance;

class AuthManager {
  __serverURL = ""

  constructor(serverURL: string) {
    if (instance)
      throw new Error("Authorizer is singletone")
    instance = this
    this.__serverURL = serverURL
  }

  getInstance() {
    return instance
  }

  vk_checkIfAuthorized() : boolean {
    const vkAccessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("vk_access_token="))
      ?.split("=")[1];

    return !!vkAccessToken
  }

  async vk_getCredentials() : Promise<JSON> {
    const userRequest = this.__serverURL + "/users/authorize?method=cookies"
    const response = await fetch(userRequest, {
        headers: {
          'Accept': '*',
          'Content-Type': 'application/json'
        },
        credentials: "include"})
    return await response.json()
  }

  vk_authorize(payload: URLSearchParams) : void {
    const json = JSON.parse(decodeURI(payload.get("payload")!))
    const access_response = async () => {
      const request = this.__serverURL + "/users/authorize?method=vk&token=" + json.token + "&uuid=" + json.uuid
      const response = await fetch(request, {
        headers: {
          'Accept': '*',
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })
        .then(response => {
          return response.json()
        })
    }

    access_response();
  }
}

export default AuthManager