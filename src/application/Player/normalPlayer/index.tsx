import classNames from "classnames";
import React, { useRef, useEffect } from "react";
import { getName, formatPlayTime } from "../../../api/utils";
import s from "./style.module.scss"
import { CSSTransition } from "react-transition-group";
// @ts-ignore
import animations from "create-keyframe-animation"
import ProgressBar from "../../../baseUI/ProgressBar";
import { playMode } from "../../../api/config"
import Lyric from "../../../api/utils/Lyric";
import LyricContainer from "../../../components/LyricContainer"

interface NormalPropsCurr {
  currentLyric?: Lyric
  currentPlayingLyric?: string
  currentLineNumL?: number
}
type NormalProps = TSPlayProps.MiniPlayerPropsList & NormalPropsCurr

const NormalPlayer: React.FC<NormalProps> = (props) => {
  const div:HTMLDivElement = document.createElement('div');
  const { song, fullScreen, playing, percent, duration, currentTime, mode} = props
  const { toggleFullScreen, clickPlaying, onProgressChange, handleNext, handlePrev, changeMode, togglePlayList  } = props
  const normalPlayerRef = useRef<HTMLDivElement>(div)
  const cdWrapperRef = useRef<HTMLDivElement>(div);
  const currentState = useRef("");
  const lyricScrollRef = useRef<any>();
  const lyricLineRefs = useRef<Array<React.RefObject<HTMLParagraphElement>>>([]);

  const {
    currentLineNum,
    currentPlayingLyric,
    currentLyric
  } = props

  useEffect(()=>{
    if(!lyricScrollRef.current) return
    let bScroll = lyricScrollRef.current.ScrollRef.getBScroll()
    if (currentLineNum > 5) {
      let lineEl = lyricLineRefs.current[currentLineNum -5].current
      if(lineEl) {
        bScroll.scrollToElement(lineEl, 1000)
      }
    }else {
      bScroll.scrollTo(0, 0, 1000)
    }
  }, [currentLineNum])

  const _getPosAndScale = () => {
    const targetWidth = 40
    const paddingLeft = 40
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8
    const scale = targetWidth / width
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    return {
      x,
      y,
      scale
    }
  }

  const enter = () => {
    normalPlayerRef.current.style.display = "block"
    const { x, y, scale } = _getPosAndScale();
    let animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px,0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear"
      }
    })
    animations.runAnimation(cdWrapperRef.current, "move", ()=>{
      console.log(11111)
    })
  }

  const afterEnter = () => {
    // 进入之后解绑动画
    const cdWrapperDom = cdWrapperRef.current
    animations.unregisterAnimation ("move");
    cdWrapperDom.style.animation = ""
  }

  const leave = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = "all 0.4s"
    const { x, y, scale } = _getPosAndScale()
    cdWrapperDom.style.transform = `translate3d (${x} px, ${y} px, 0) scale (${scale})`
  }

  const afterLeave = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = ""
    cdWrapperDom.style.transform = ""
    normalPlayerRef.current.style.display = "none"
    currentState.current=""
  }

  const getPlayMode = () => {
    let content
    if (mode === playMode.sequence) {
      content = "icon-24gl-repeat2";
    } else if (mode === playMode.loop) {
      content = "icon-24gl-repeatOnce2";
    } else {
      content = "icon-xunhuan";
    }
    return content;
  }
  const toggleCurrentState = () => {
    if (currentState.current !== "lyric") {
      currentState.current = "lyric"
    }else {
      currentState.current = ""
    }
  }

  return (
    <CSSTransition
      classNames={{
        enter: s.normal_enter,
        enterActive: s.normal_enter_active,
        exitActive: s.normal_exit_active,
        exitDone: s.normal_exit_done,
      }}
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <div className={s.NormalPlayerContainer} ref={normalPlayerRef} >
        <div className={s.background}>
          <img src={song.al.picUrl+"?param=300*300"} width="100%" height="100%" alt="歌曲图片" />
        </div>
        <div className={classNames(s.background, s.layer)}></div>
        <div className={classNames(s.Top, s.top)}>
          <div className={s.back} onClick={()=>{toggleFullScreen(false)}}>
            <i className={classNames(s.iconfont, "iconfont", s.icon_back, "icon-fanhuijiantou")}></i>
          </div>
          <h1 className={s.title}>{ song.name }</h1>
          <h1 className={s.subtitle}>{getName(song.ar)}</h1>
        </div>
        <div className={s.Middle} ref={cdWrapperRef} onClick={toggleCurrentState}>
          <CSSTransition
            in={currentState.current !== "lyric"}
            timeout={400}
            classNames={s.fade}  
          >
            <div className={s.CDWrapper} style={{visibility: currentState.current !== "lyric" ? "visible": "hidden"}}>
              <div className={s.cd}>
                <img className={classNames(s.image, s.play, playing ? "": s.pause)} src={song.al.picUrl+"?param=400*400"} alt="" />
              </div>
              <p className={s.playing_lyric}>{currentPlayingLyric}</p>
            </div>
          </CSSTransition>
          <CSSTransition
            in={currentState.current === "lyric"}
            timeout={400}
            classNames={s.fade}
          >
            <div className={s.lyric_container}>
              <LyricContainer
                ref={lyricScrollRef}
                lyricLineRefs={lyricLineRefs}
                currentLyric={currentLyric}
                currentState={currentState.current}
                currentLineNum={currentLineNum}
              ></LyricContainer>
            </div>
          </CSSTransition>
        </div>
        <div className={s.Bottom}>
          <div className={s.ProgressWrapper}>
            <span className={classNames(s.time, s.time_l)}>{ formatPlayTime( (currentTime ? currentTime : 0)) }</span>
            <div className={s.progress_bar_wrapper}>
              <ProgressBar
                percent={percent}
                percentChange={onProgressChange}
              ></ProgressBar>
            </div>
            <div className={classNames(s.time, s.time_r)}> { formatPlayTime((duration ? duration: 0)) } </div>
          </div>
          <div className={s.Operators}>
            <div className={classNames(s.icon, s.i_left)} onClick={changeMode}>
              <i className={classNames("iconfont", getPlayMode())}></i>
            </div>
            <div className={classNames(s.icon, s.i_left)} onClick={handlePrev}>
              <i className={classNames("iconfont", "icon-skipbackkuaitui")}></i>
            </div>
            <div className={classNames(s.icon, s.i_center)}>
              <i className={classNames("iconfont", playing ? "icon-24gf-pause2" : "icon-24gl-play")} onClick={e => clickPlaying(e, !playing)}></i>
            </div>
            <div className={classNames(s.icon, s.i_right)} onClick={handleNext}>
              <i className={classNames("iconfont", "icon-kuaijin")}></i>
            </div>
            <div className={classNames(s.icon, s.i_right)} onClick={()=>togglePlayList(true)}>
              <i className={classNames("iconfont", "icon-gedanliebiao2x")}></i>
            </div>
          </div>
        </div>  
      </div>
    </CSSTransition>
    
  )
}

export default React.memo(NormalPlayer)
