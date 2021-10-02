import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  changePlayingState,
  changePlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changeShowPlayList,
  changePlayMode,
  changeFullScreen,
} from './store/actionCreators'
// import s from "./style.module.scss"
import MiniPlayer from './miniPlayer'
import NormalPlayer from "./normalPlayer"
import { getSongUrl, isEmptyObject, findIndex, shuffle } from "../../api/utils"
import Lyric, { LinesProps, HandleProps } from "../../api/utils/Lyric";
import Toast from "../../baseUI/Toast";
import { playMode } from "../../api/config";
import PlayList from "./PlayList";
import { getLyricRequest } from "../../api/request"

const Player: React.FC<TSPlayProps.PlayComProps> = (props) => {
  const { fullScreen, playing, currentIndex, mode, sequencePlayList:immutableSequencePlayList, currentSong: immutableCurrentSong, togglePlayListDispatch } = props;
  const { toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch, changeModeDispatch, changePlayListDispatch, changeCurrentDispatch } = props;
  const [ currentTime, setCurrentTime ] = useState(0)
  const [ duration, setDuration ] = useState(0)
  // 记录当前歌曲， 以便于下次重渲染时对比
  const [preSong, setPreSong] = useState<TSPlayProps.CurrentSong>({})
  const audioEl = document.createElement("audio")
  const div = document.createElement("div")
  const audioRef = useRef<HTMLAudioElement>(audioEl)
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration
  let currentSong = immutableCurrentSong.toJS()
  // @ts-ignore
  let playList = immutableSequencePlayList.toJS() 
  let sequencePlayList = immutableSequencePlayList.toJS()
  const [modeText, setModeText] = useState<string>("")
  const toastRef = useRef<any>(div)
  const songReady = useRef(true)
  // 歌词
  const currentLyric = useRef<Lyric>()
  // 记录行数
  const currentLineNum = useRef (0);
  // 歌词
  const [currentPlayingLyric, setPlayingLyric] = useState ("")
  // 一曲循环
  const handleLoop =() => {
    audioRef.current.currentTime = 0
    changePlayingState(true)
    audioRef.current.play()
  }
 
  const changeMode = () => {
    let newMode =(mode + 1) % 3
    if (newMode === 0) {
      changePlayListDispatch(sequencePlayList)
      let index = findIndex(currentSong, sequencePlayList)
      changeCurrentIndexDispatch(index)
      setModeText("顺序播放")
    }else if (newMode === 1) {
      changePlayListDispatch(sequencePlayList)
      setModeText("单曲循环")
    }else if (newMode === 2) {
      let newList = shuffle(sequencePlayList);  // 把歌曲队列随机
      let index = findIndex(currentSong, sequencePlayList)
      changePlayListDispatch(newList)
      changeCurrentIndexDispatch(index)
      setModeText("随机播放")
    }
    changeModeDispatch(newMode)
    toastRef.current.show()
  }

  const handlePrev = () => {
    // 如果列表只有一首歌的时候
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex - 1
    if (index < 0) index = playList.length -1 // 如果已经小于第一首，则播放最后一首
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index) 
  }

  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex + 1
    if (index === playList.length) index = 0  // 如果超过长度则播放第一首
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }
  // 歌曲暂停
  const clickPlaying = (e: React.MouseEvent<HTMLDivElement>, state: boolean) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
    if (currentLyric.current) {
      currentLyric.current.togglePlay(currentTime * 1000)
    }
  };

  const handleLyric = ({lineNum, txt}: HandleProps ) => {
    if (!currentLyric.current) return
    currentLineNum.current = lineNum
    setPlayingLyric(txt)
  }

  const getLyric = async (id: number) => {
    let lyric = ""
    try {
      let res = await getLyricRequest(id)
      lyric = res.lrc.lyric
      if (!lyric) {
        currentLyric.current = new Lyric("")
        return
      }
      // 初始化
      currentLyric.current = new Lyric(lyric, handleLyric)
      currentLyric.current.play()
      currentLineNum.current = 0
      currentLyric.current.seek(0)
    } catch (error) {
      songReady.current = true
      audioRef.current.play()
    }
  }

  useEffect(()=>{
    if ( !playList.length || currentIndex === -1 || !playList[currentIndex] || playList[currentIndex].id === preSong.id || !songReady.current) {
      return
    }
    let current = playList[currentIndex]
    setPreSong(current)
    songReady.current = false
    changeCurrentDispatch(current)
    audioRef.current.src = getSongUrl(current.id)
    setTimeout(() => {
      audioRef.current.play().then(()=>{
        songReady.current = true
      });
    });
    getLyric(current.id)
    togglePlayingDispatch(true);//播放状态
    setCurrentTime(0);//从头开始播放
    setDuration((current.dt / 1000) | 0);//时长
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playList, currentIndex])

  useEffect(()=>{
    playing ? audioRef.current.play() : audioRef.current.pause()
  }, [playing])

  const updateTime: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    // @ts-ignore
    setCurrentTime(e.target.currentTime)
  }
  // 更新进度条
  const onProgressChange = (curPercent: any) => {
    const newTime = curPercent * duration
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
    if (!playing) {
      togglePlayingDispatch(true)
    }
    if(currentLyric.current) {
      currentLyric.current.seek(newTime * 1000) 
    }
  }

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop()
    }else {
      handleNext()
    }
  }

  const handleError = () => {
    songReady.current = true
    alert("播放出错")
  }

  return (
    <div>
      {
        isEmptyObject(currentSong) ? null : 
        <MiniPlayer 
          song={currentSong}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          playing={playing}
          percent={percent}
          changeMode={changeMode}
          togglePlayList={togglePlayListDispatch}
          > 
        </MiniPlayer>
      }
      {
        isEmptyObject(currentSong) ? null :
        <NormalPlayer 
          song={currentSong}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          playing={playing}
          duration={duration}
          currentTime={currentTime}
          percent={percent}
          onProgressChange={onProgressChange}
          handlePrev={handlePrev}
          handleNext={handleNext}
          mode={mode}
          changeMode={changeMode}
          togglePlayList={togglePlayListDispatch}
          currentLyric={currentLyric.current}
          currentPlayingLyric={currentPlayingLyric}
          currentLineNum={currentLineNum.current}
          >
        </NormalPlayer>
      }
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd} onError={handleError}></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
      <PlayList></PlayList>
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  fullScreen: state.getIn (["player", "fullScreen"]) as boolean,
  playing: state.getIn (["player", "playing"]) as boolean,
  currentSong: state.getIn (["player", "currentSong"]) as TSPlayProps.CurrentSong,
  showPlayList: state.getIn (["player", "showPlayList"]) as boolean,
  mode: state.getIn (["player", "mode"]) as number,
  currentIndex: state.getIn (["player", "currentIndex"]) as number,
  playList: state.getIn (["player", "playList"]) as Array<any>,
  sequencePlayList: state.getIn (["player", "sequencePlayList"]) as Array<any>
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    togglePlayingDispatch(data: boolean) {
      dispatch(changePlayingState(data))
    },
    toggleFullScreenDispatch(data: boolean) {
      dispatch(changeFullScreen(data))
    },
    togglePlayListDispatch (data: boolean) {
      dispatch (changeShowPlayList(data));
    },
    changeCurrentIndexDispatch (index: number) {
      dispatch (changeCurrentIndex (index));
    },
    changeCurrentDispatch (data: TSPlayProps.CurrentSong) {
      dispatch (changeCurrentSong (data));
    },
    changeModeDispatch (data: number) {
      dispatch (changePlayMode (data));
    },
    changePlayListDispatch (data: Array<any>) {
      dispatch (changePlayList (data));
    }
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(React.memo (Player));
