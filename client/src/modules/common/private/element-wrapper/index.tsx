import React from "react";

import './index.css'

export type WrapperProps = {
  children?: React.ReactNode
  inline?: boolean
}

function ElemetWrapper(props: WrapperProps) {
  const className = props.inline ? "wrapper inline" : "wrapper";

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

export default ElemetWrapper