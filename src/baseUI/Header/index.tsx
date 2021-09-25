import React from "react";
import s from "./style.module.scss";
import classes from "classnames";

export interface HeaderProps {
  title: string,
  handleClick: React.MouseEventHandler<HTMLElement>
  isMarquee: boolean
  [name: string]: any
}

const Header = React.forwardRef((props: HeaderProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const { handleClick, title, isMarquee } = props
  return (
    <div className={s.HeaderContainer} ref={ref}>
      <div onClick={handleClick}>
        <i className={ classes('iconfont',s.back, "icon-fanhuijiantou")}></i>
        {
          isMarquee ? <div className={s.Marquee}><h1 className={s.text}>{title}</h1></div> : <h1>{ title }</h1>
        }
      </div>
    </div>
  )
} )

Header.defaultProps = {
  handleClick: () => {},
  title: "标题",
  isMarquee: false
}

export default React.memo(Header)
