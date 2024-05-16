import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Post from "./components/post";
import * as VKID from '@vkid/sdk';
import AuthManager from "./scripts/auth_manager/auth_manager.ts";
import AddPost from "./components/add_post";

function App() {
  let environment = import.meta.env.VITE_ENVIRONMENT

  let server = "";

  switch (environment) {
    case "DEV" : {
      server = "http://localhost:3000/api"
      break
    }

    case "PROD": {
      server = "https://web-y25-makarov.onrender.com:3000/api"
    }
  }

  const authManager = new AuthManager(server)

  return (
    <>
      <Routes>
        <Route path='/' element={ <Home auth_manager={authManager} serverURL={server} /> }></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/post' element={<Post serverURL={server} auth_manager={authManager} />}></Route>
        <Route path='/add_post' element={<AddPost serverURL={server} auth_manager={authManager} />}></Route>
      </Routes>
    </>
  )
}

export default App
