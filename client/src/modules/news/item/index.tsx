import { Button, Label, Text, ThemeProvider, UserLabel } from "@gravity-ui/uikit";
import './index.css'
import { useNavigate } from "react-router-dom";
import react from "@vitejs/plugin-react";

export type NewsItemProps = {
  postId: number
  picture_link: string
  title: string
  body: string
  date: string
  author: string
}

function NewsItem(props: NewsItemProps) {
  let description;
  const navigate = useNavigate();

  if (props.body.length > 100) {
    let trunc_index = 101
    while (props.body.charAt(trunc_index) != ' ')
      trunc_index -= 1
    description = props.body.substring(0, trunc_index) + "..."
  } else {
    description = props.body
  }

  const onclickHandler = () => {
    navigate('/post?id=' + props.postId)
  }

  return (
      <div className="card">
        <img src={props.picture_link} />
        <div className="info">
          <div><Text variant="header-2">{props.title}</Text></div>
          <div><Text variant="body-2"><div dangerouslySetInnerHTML={{__html: description}}></div></Text></div>
          <div><Button id="1" view="action" size="xl" pin="brick-brick" onClick={onclickHandler}>Читать</Button></div>
          <div><Text variant="body-1">{props.date}</Text> <UserLabel type="person">{props.author}</UserLabel></div>
        </div>
      </div>
  )
}

export default NewsItem