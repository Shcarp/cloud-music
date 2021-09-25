import React from "react";
import s from "./style.module.scss"

const LoadingV2 = () => {
  return (
    <div className={s.Loading}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span > 拼命加载中...</span>
    </div>
  )
}

export default React.memo(LoadingV2)
