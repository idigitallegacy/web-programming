import './index.css'
import React from "react";

export type ContentProps = {
  children?: React.ReactNode
  inline?: boolean
  wrap?: boolean
}

function Content(props: ContentProps) {
  let className = "content";
  if (props.inline)
    className += " inline"
  if (props.wrap)
    className += " wrap"

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

export default Content