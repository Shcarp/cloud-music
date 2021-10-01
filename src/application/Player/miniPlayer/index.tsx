import classNames from "classnames";
import React, { useRef } from "react";
import { getName } from "../../../api/utils";
import s from "./style.module.scss"
import { CSSTransition } from "react-transition-group";
import ProgressCircle from "../../../baseUI/ProgressCircle";
import "./style.css"

const MiniPlayer = (props: TSPlayProps.MiniPlayerPropsList) => {
  const { song, fullScreen, playing , percent=0} = props
  const { toggleFullScreen, togglePlayList } = props
  const { clickPlaying } = props
  const div:HTMLDivElement = document.createElement('div');
  const miniPlayerRef = useRef<HTMLDivElement>(div)

  const handleTogglePlayList = (e: React.MouseEvent<HTMLDivElement> ) => {
    togglePlayList(true)
    e.stopPropagation()
  }

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current.style.display = "flex";
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = "none";
      }}
      >
      <div className={s.MiniPlayerContainer} ref={miniPlayerRef} onClick={()=>toggleFullScreen(true)}>
        <div className={s.icon}>
          <div className={s.imgWrapper}>
            <img className={classNames(s.play, playing ? "": s.pause)} src={song.al.picUrl} width="40" height="40" alt="img" />
          </div>
        </div>
        <div className={s.text}>
          <h2 className={s.name}>{song.name}</h2>
          <p className={s.desc}>{getName(song.ar)}</p>
        </div>
        <div className={s.control}>
          <ProgressCircle radius={32} percent={percent}>
            {
              playing ? 
              <i className={classNames("iconfont" , s.icon_mini, s.iconfont, s.icon_pause,  "icon-24gf-pause2")} onClick={e => clickPlaying(e, false)}></i>
              :
              <i className={classNames("iconfont", s.icon_mini, s.iconfont, s.icon_play, "icon-24gl-play")} onClick={e => clickPlaying(e, true)}></i> 
            }
          </ProgressCircle>
        </div>
        <div className={s.control} onClick={handleTogglePlayList}>
          <i className={classNames("iconfont", s.iconfont, "icon-gedanliebiao2x")}></i>
        </div>
      </div>
    </CSSTransition>
    
  )
}

export default React.memo(MiniPlayer) 
