import React from "react";
import { renderRoutes } from "react-router-config"
import { RouteConfig } from "react-router-config"
import style from "./style.module.scss"
import classes from "classnames"
import { NavLink } from "react-router-dom";
import Player from "../Player";

export interface HomeProps {
  route?: RouteConfig
}
const Home =  (props: HomeProps) => {
  const { route } = props
  return (
    <div className={ style.homeRoot }>
      <div className={style.top }>
        <span className={classes("iconfont", style.menu, "icon-mulu")}></span>
        <span className={style.title}>
          <input className={style.inputClass}></input>
        </span>
        <span className={classes("iconfont", style.search, "icon-sousuo")}></span>
      </div>
      <div className={style.tab}>
        <NavLink to="/recommend" activeClassName={style.selected}>
          <div className={style.tabItem}>
            <span> 推荐 </span>
          </div>
        </NavLink>
        <NavLink to="/singers" activeClassName={style.selected}>
          <div className={style.tabItem}>
            <span> 歌手 </span>
          </div>
        </NavLink>
        <NavLink to="/rank" activeClassName={style.selected}>
          <div className={style.tabItem}>
            <span> 排行榜 </span>
          </div>
        </NavLink>
      </div>
      { renderRoutes( route?.routes ) }
      <Player></Player>
    </div>
  )
}

export default React.memo(Home)