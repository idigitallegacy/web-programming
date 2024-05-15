import { useEffect, useState } from "react";
import { Pagination, PaginationProps } from "@gravity-ui/uikit";
import NewsItem from "../item";
import { Buffer } from "buffer";

import './index.css'

export type NewsCollectionProps = {
  serverURL: string
  postsPerPage: number
  currentPage: number
}

function NewsCollection(props: NewsCollectionProps) {
  const [postsAmount, setPostsAmount] = useState(null);
  const [pagesAmount, setPagesAmount] = useState(1);
  const [pageState, setPageState] = useState({page: props.currentPage, pageSize: 10});
  const dtype : any[] = []
  const [newsItems, setNewsItems] = useState(dtype)


  const postsServer = props.serverURL + "/posts"

  const getPostsAmount = async () => {
    const response = await fetch(postsServer + "/amount")
      .then((response) => response.json())
    setPostsAmount(response)
    setPagesAmount(Math.ceil(response / props.postsPerPage))
    setPageState({page: props.currentPage, pageSize: pagesAmount})
  }

  const getPosts = async () => {
    const response = await fetch(postsServer + "/range/" + (pageState.page - 1) * props.postsPerPage + "/" + props.postsPerPage)
      .then((response) => response.json())

    for (let i = 0; i < response.length; ++i) {
      const pictureRequest = async () => {
        let newsItemPicture = response[i].picture_link
        const pictureResponse = await fetch(postsServer + "/picture?file_path=" + encodeURIComponent(response[i].picture_link))
          .then(response => response.json())
        if (pictureResponse.data) {

          newsItemPicture = "data:image/jpeg;base64," + pictureResponse.data
        }

        const date = new Date(response[i].date);
        const formattedTime = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear();
        console.log(response[i])
        setNewsItems(newsItems => [...newsItems, <NewsItem key={response[i].id} postId={response[i].id} picture_link={newsItemPicture} title={response[i].title} body={response[i].body} date={formattedTime} author={"asdf"}></NewsItem>])
      }

      pictureRequest()

    }
  }

  useEffect(() => {
    getPostsAmount();
    getPosts();
  }, []);

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => {
    setPageState((prevState) => ({ ...prevState, page, pageSize }));
    console.log(page)
  }

  return (
    <>
      <div className="news-wrapper">
        <div className="news-grid">
          {newsItems}
        </div>
        <div><Pagination className="news-pagination" page={1} pageSize={props.postsPerPage} total={pagesAmount} onUpdate={handleUpdate} /></div>
      </div>
    </>
  )
}

export default NewsCollection