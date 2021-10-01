import React from "react";
import s from "./style.module.scss"
import { getName } from "../../api/utils";
import classNames from "classnames";
import { changePlayList, changeCurrentIndex, changeSequecePlayList } from './../../application/Player/store/actionCreators';
import { connect } from 'react-redux';
interface SongListProps {
  collectCount: number
  showCollect: boolean
  songs: any
  showBackground: boolean
  changePlayListDispatch: Function
  changeCurrentIndexDispatch: Function
  changeSequecePlayListDispatch: Function
  musicAnimation: Function
  [name: string]: any
}

const SongsList = React.forwardRef<HTMLDivElement, SongListProps>((props, refs) => {
  const { collectCount, showCollect, songs, showBackground} = props
  const { changePlayListDispatch, changeCurrentIndexDispatch, changeSequecePlayListDispatch } = props;
  // 接收触发动画的函数
  const { musicAnimation } = props;
  const totalCount = songs.length
  const selectItem = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    changePlayListDispatch(songs)
    changeCurrentIndexDispatch(index)
    changeSequecePlayListDispatch(songs)
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY)
  }
  let songList = (list: any) => {
    let res = []
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      res.push (
        <li key={item.id} onClick={(e)=>selectItem(e,i)}>
          <span className={s.index}>{i+1}</span>
          <div className={s.info}>
            <span>{item.name}</span>
            <span>
              { item.ar ? getName(item.ar): getName(item.artists) }- {item.al ? item.al.name: item.album.name}
            </span>
          </div>
        </li>
      )
    }
    return res
  }
  const collect = (count: number) => {
    return (
      <div className={s.add_list}>
        <i className={classNames("iconfont", "icon-shoucang", s.iconfonts)}></i>
        <span> 收藏 ({Math.floor (count/1000)/10} 万)</span>
      </div>
    )
  }
  return (
    <div ref={refs} className={s.song_list} style={{background: `${showBackground ? '$highlight-background-color': ''}`}}>
      <div className={s.first_line}>
        <div className={s.play_all}>
          <i className={classNames("iconfont","icon-bofang", s.iconfonts)}></i>
          <span>播放全部 <span className="sum">(共 {totalCount} 首)</span></span>
        </div>
        { showCollect ? collect(collectCount): null }
      </div>
      <ul className={s.song_item}>
        { songList(songs) }
      </ul>
    </div>
  )
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    changePlayListDispatch (data: any[]){
      dispatch (changePlayList(data));
    },
    changeCurrentIndexDispatch(data: number) {
      dispatch (changeCurrentIndex(data));
    },
    changeSequecePlayListDispatch(data: any[]) {
      dispatch (changeSequecePlayList(data))
    }
  }
};
export default connect(null, mapDispatchToProps)(React.memo(SongsList)) 
