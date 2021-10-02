import React from "react";
import s from "./style.module.scss"

const Loading = () => {
  return (
    <div className={s.LoadingWrapper}>
      <div></div>
      <div></div>
    </div>
  )
}

export default React.memo(Loading)