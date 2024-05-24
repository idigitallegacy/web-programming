import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let instance;

class AuthManager {
  __serverURL = ""
  __eventsURL = ""

  constructor(serverURL: string, eventsURL: string) {
    if (instance)
      throw new Error("Authorizer is singletone")
    instance = this
    this.__serverURL = serverURL
    this.__eventsURL = eventsURL
  }

  getInstance() {
    return instance
  }

  async vk_checkIfAuthorized() : Promise<boolean> {
    const request = this.__serverURL + "/users/is_authorized?auth_origin=vk"
    const response = await fetch(request, {
      headers: {
        'Accept': '*',
        'Content-Type': 'application/json'
      },
      credentials: "include"
    })
      .then(response => response.json())

    console.log(await response)
    return await response
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
        .then(() => {
          const socket = io(this.__eventsURL);
          socket.on('connect', async () => {
            const credentials = await this.vk_getCredentials()
            socket.emit('logged_in', credentials.username)
          });
        })
    }
    access_response();
  }

  async vk_exit() {
    const request = this.__serverURL + "/users/exit?auth_origin=vk"
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
      .then((response) => {
        const socket = io(this.__eventsURL);
        socket.on('connect', async () => {
          socket.emit('logged_off', response.username)
        });
      })
  }
}

export default AuthManager