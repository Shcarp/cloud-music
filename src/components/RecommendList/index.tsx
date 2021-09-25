import React from "react"
import style from "./style.module.scss"
import classes from "classnames"
import { getCount } from "../../api/utils"
import LazyLoad from "react-lazyload"

export interface RecommendListProps {
  recommendList: Array<TSPersonalizedData.PersonalizedData>
  historys: any
  [name: string]: any
}

const RecommendList = (props: RecommendListProps ) => {
  const { recommendList } = props
  const enterDetail = (id: string | number) => {
    props.historys.push(`/recommend/${id}`)
  }
  return (
    <div className={style.ListWrapper}>
      <h1 className={style.title}>推荐歌单</h1>
      <div className={style.List}>
        {
          recommendList.map((item, index)=>{
            return (
              <div className={style.ListItem} key={item.id} onClick={()=>enterDetail(item.id)}>
                <div className={style.imgWrapper}>
                  <div className={style.decorate}></div>
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./04.jpg')} alt="music"/>}>
                    <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                  <div className={style.playCount}>
                    <i className={classes("iconfont", style.play, "icon-erji")}></i>
                    <span className={style.count}>{ getCount(item.playCount) }</span>
                  </div>
                </div>
                <div className={style.desc}>{ item.name }</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default React.memo(RecommendList)