import Header from "../../modules/common/header";
import Content from "../../modules/common/content";
import NewsControls from "../../modules/news/news_controls";
import NewsCollection from "../../modules/news/collection";
import Footer from "../../modules/common/footer";
import AuthManager from "../../scripts/auth_manager/auth_manager.ts";
import { Button, TextArea, TextInput } from "@gravity-ui/uikit";
import { DateField } from "@gravity-ui/date-components";
import { dateTimeParse } from "@gravity-ui/date-utils";
import { useEffect, useState } from "react";
import "./index.css";
import content from "../../modules/common/content";
import { Simulate } from "react-dom/test-utils";
import submit = Simulate.submit;

export type AddPostProps = {
  serverURL: string
  auth_manager: AuthManager
}

function AddPost(props: AddPostProps) {
  const [pictureLink, setPictureLink] = useState("")
  const [userId, setUserId] = useState(0);

  let loadFile = async function(event) {
    if (event.target.files[0]) {
      const formData = new FormData();
      formData.append("file", event.target.files[0])

      const request = props.serverURL + "/posts/upload"
      const response = await fetch(request, {
        method: "POST",
        body: formData})
        .then((response) => response.json())
      setPictureLink(response.path)
    }
  };

  let submitForm = async function(event) {
    event.preventDefault()
    const form = document.getElementById("create-post")
    const submitter = document.querySelector("button[type=submit]")
    const formData = new FormData(form, submitter);

    let submitData = {};
    formData.forEach(function(value, key){
      submitData[key] = value;
    });

    submitData["author_id"] = parseInt(submitData["author_id"])

    const request = props.serverURL + "/posts/add"
    const response = await fetch(request, {
      method: "POST",
      headers: {
        'Accept': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitData)})
      .then((response) => response.json())
  }

  const request = async () => {
    if (props.auth_manager.vk_checkIfAuthorized()) {
      const credentials = await props.auth_manager.vk_getCredentials();
      setUserId(credentials.id);
    }
  };

  request();

  return (
    <>
      <Header serverURL={props.serverURL} auth_manager={props.auth_manager}></Header>
      <Content wrap={true}>
        <form method="POST" id="create-post" onSubmit={submitForm}>
          <TextInput name="title" label="Заголовок" placeholder="Сегодня я сделал лабу" />
          <TextArea name="body" placeholder="Lorem ipsum..." />
          <DateField name="date" label="Дата" disabled={true} defaultValue={dateTimeParse(new Date())} />
          <input name="author_id" type="hidden" value={userId} />
          <input name="picture_link" type="hidden" value={pictureLink} />
          <input id="file_upload" type="file" onChange={loadFile} multiple={false} accept={"image/*"} required={true}/>
          <Button type="submit" view="action" size="l">Action</Button>
        </form>
      </Content>
      <Footer></Footer>
    </>
  );
}

export default AddPost;