import Header from "../../modules/common/header";
import Content from "../../modules/common/content";
import Footer from "../../modules/common/footer";
import { useSearchParams } from "react-router-dom";
import {Text} from '@gravity-ui/uikit';
import {User} from '@gravity-ui/uikit';

import "./index.css"
import { useEffect, useState } from "react";
import AuthManager from "../../scripts/auth_manager/auth_manager.ts";
import NewsItem from "../../modules/news/item";

export type PostProps = {
  serverURL: string,
  auth_manager: AuthManager
}

function Post(props: PostProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = searchParams.get("id")?.toString()

  const [postImage, setPostImage] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [postBody, setPostBody] = useState("")
  const [postDate, setPostDate] = useState("")
  const [postAuthorId, setPostAuthorId] = useState("")
  const [postAuthor, setPostAuthor] = useState("")
  const postsServer = props.serverURL + "/posts"
  const usersServer = props.serverURL + "/users"

  const getPost = async () => {
    const response = await fetch(postsServer + "/post/" + postId)
      .then((response) => response.json())

    const pictureRequest = async () => {
      let newsItemPicture = response.picture_link
      const pictureResponse = await fetch(postsServer + "/picture?file_path=" + encodeURIComponent(response.picture_link))
        .then(response => response.json())
      if (pictureResponse.data) {

        newsItemPicture = "data:image/jpeg;base64," + pictureResponse.data
      }

      const date = new Date(response.date);
      const formattedTime = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear();
      setPostImage(newsItemPicture)
      setPostTitle(response.title)
      setPostBody(response.body)
      setPostDate(formattedTime)
      setPostAuthorId(response.author_id)

      const userResponse = await fetch(usersServer + "/id/" + response.author_id)
        .then((response) => response.json())

      setPostAuthor(userResponse.username)
    }

    pictureRequest()
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Header auth_manager={props.auth_manager} serverURL={props.serverURL}></Header>
      <Content>
        <div className="container">
          <div className="post">
            <div className="post-image">
              <img src={postImage} />
            </div>
            <div className="post-content">
              <div className="post-header">
                <Text variant="display-3">{postTitle}</Text>
                <div className="post-meta">
                  <time dateTime={postDate}>{postDate}</time>
                  <span className="author"><User avatar={{text: postAuthor, theme: 'brand'}} description={"id: " + postAuthorId} name={postAuthor} size="xs" /></span>
                </div>
              </div>
              <Text variant="body-1"><div dangerouslySetInnerHTML={{ __html: postBody }}></div></Text>
            </div>
          </div>
        </div>
      </Content>
      <Footer></Footer>
    </>
  )
}

export default Post;