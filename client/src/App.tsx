import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Post from "./components/post";
import * as VKID from '@vkid/sdk';
import AuthManager from "./scripts/auth_manager/auth_manager.ts";
import AddPost from "./components/add_post";

function App() {
  const environment = import.meta.env.VITE_ENVIRONMENT

  const server = "http://localhost:3000/api"
  const events = "http://localhost:3000"

  // switch (environment) {
  //   case "DEV" : {
  //     server = "http://localhost:3000/api"
  //     break
  //   }
  //
  //   case "PROD": {
  //     server = "https://web-y25-makarov.onrender.com:3000/api"
  //   }
  // }

  const authManager = new AuthManager(server, events)

  return (
    <>
      <Routes>
        <Route path='/' element={ <Home auth_manager={authManager} serverURL={server} eventsURL={events} /> }></Route>
        <Route path='/about' element={<About serverURL={server} auth_manager={authManager} />}></Route>
        <Route path='/post' element={<Post serverURL={server} auth_manager={authManager} />}></Route>
        <Route path='/add_post' element={<AddPost serverURL={server} auth_manager={authManager} eventsURL={events} />}></Route>
      </Routes>
    </>
  )
}

export default App
