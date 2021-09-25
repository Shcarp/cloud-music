import React from "react";
import s from "./style.module.scss"
import classes from "classnames"


const AlumTemplate = (props: Album.AlbumTmp ) => {
  const { currentAlbum } = props
  return (
    <div>
          <div className={s.TopDesc}>
            <div className={s.background} style={{background: `url(${currentAlbum.coverImgUrl}) no-repeat` }}>
              <div className={s.filter}></div>
            </div>
            <div className={s.img_wrapper}> 
              <div className={s.decorate}></div>
              <img src={currentAlbum.coverImgUrl} alt=""></img>
              <div className={s.play_count}>
                <i className={classes("iconfont", s.play, "icon-bofang")}></i>
                <span className={s.count}> {Math.floor(currentAlbum.subscribedCount/1000)/10} 万</span>
              </div>
            </div>
            <div className={s.desc_wrapper}>
              <div className={s.title}>{ currentAlbum.name }</div>
              <div className={s.person}>
                <div className={s.avatar}>
                  <img src={currentAlbum.creator.avatarUrl} alt=""/>
                </div>
                <div className={s.name}>{currentAlbum.creator.nickname}</div>
              </div>
            </div>
          </div>
          <div className={s.Menu}>
            <div>
              <i className="iconfont icon-pinglun"></i>
              评论
            </div>
            <div>
              <i className="iconfont icon-dianzan"></i>
              点赞
            </div>
            <div>
              <i className="iconfont icon-shoucang"></i>
              收藏
            </div>
            <div>
              <i className="iconfont icon-gengduo"></i>
              更多
            </div>
          </div>
        </div> 
  )
}

export default AlumTemplate
