import classNames from "classnames";
import React from "react";
import s from "./style.module.scss"
import { getCount, getName } from "../../../api/utils"

const AlbumList = (props: Album.AlbumListPops) => {
  const { currentAlbum } = props

  return (
    <div className={s.song_list}>
      <div className={s.first_line}>
        <div className={s.play_all}>
          <i className={classNames("iconfont","icon-bofang", s.iconfonts)}></i>
          <span>播放全部 <span className="sum">(共 {currentAlbum.tracks.length})</span></span>
        </div>
        <div className={s.add_list}>
          <i className={classNames("iconfont", "icon-shoucang", s.iconfonts)}></i>
          <span>收藏 ({getCount(currentAlbum.subscribedCount)})</span>
        </div>
      </div>
      <ul className={s.song_item}>
        {
          currentAlbum.tracks.map((item, index) => {
            return (
              <li key={index}>
                <span className={s.index}>{ index + 1 }</span>
                <div className={s.info}>
                  <span>{item.name}</span>
                  <span>
                    { getName (item.ar) } - { item.al.name }
                  </span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default AlbumList
