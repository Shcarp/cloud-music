import React, { MouseEventHandler, useCallback, useRef, useState } from "react";
import { connect } from "react-redux";
import s from "./style.module.scss"
import "./style.css"
import { changeShowPlayList, changeCurrentIndex, changePlayMode, changePlayList, deleteSong, changeSequecePlayList, changeCurrentSong, changePlayingState } from "../store/actionCreators"
import { CSSTransition } from 'react-transition-group';
import { vendor, getName, shuffle, findIndex } from '../../../api/utils'
import classNames from "classnames";
import Scroll from "../../../components/Scroll";
import { playMode } from "../../../api/config";
import Confirm from "../../../baseUI/confirm";


const PlayList: React.FC<TSPlayProps.PlayListProps> = (props) => {
  const {
    showPlayList,
    currentIndex,
    currentSong: immutableCurrentSong,
    mode,
    playList: immutablePlayList ,
    sequencePlayList: immutableSequencePlayList
  } = props

  const {
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changeModeDispatch,
    changePlayListDispatch,
    deleteSongDispatch,
    clearDispatch
  } = props

  const currentSong = immutableCurrentSong.toJS()
  const playList = immutablePlayList.toJS()
  const sequencePlayList = immutableSequencePlayList.toJS()
  const div = document.createElement('div')
  const playListRef = useRef<HTMLDivElement>(div)
  const listWrapperRef = useRef<HTMLDivElement>(div)
  const [isShow, setShow] = useState(false);
  const confirmRef = useRef<any>()
  const [ canTouch, setCanTouch ] = useState(true)
  const listContentRef = useRef<HTMLDivElement>()
  //touchStart 后记录 y 值
  const [startY, setStartY] = useState (0);
  //touchStart 事件是否已经被触发
  const [initialed, setInitialed] = useState (true);
  // 用户下滑的距离
  const [distance, setDistance] = useState (0);

  const onEnterCB = useCallback(()=>{
    setShow(true)
    listWrapperRef.current.style.transform = "translate3d(0, 100%, 0)"
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor])

  const onEnteringCB = useCallback(()=>{
    listWrapperRef.current.style.transition = "all 0.3s"
    listWrapperRef.current.style.transform = "translate3d(0, 0, 0)"
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor])

  const onExitingCB = useCallback(()=>{
    listWrapperRef.current.style.transition = "all 0.3s";
    listWrapperRef.current.style.transform = `translate3d(0px, 100%, 0px)`;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor])

  const onExitedCB = useCallback (() => {
    setShow(false);
    listWrapperRef.current.style.transform = `translate3d(0px, 100%, 0px)`;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor]);

  const getCurrentIcon = (item: TSPlayProps.CurrentSong) =>{
    const current = currentSong.id === item.id
    const className = current ? s.icon_play : ""
    const content = current ? "icon-24gl-play": ""
    return (
      <i className={classNames(s.current, "iconfont", className, content)}></i>
    )
  }

  const handleDeleteSong = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, song: TSPlayProps.CurrentSong) => {
    e.stopPropagation()
    deleteSongDispatch(song)
  }

  const getPlayMode = () =>{
    let content, text
    if (mode === playMode.sequence) {
      content = "icon-24gl-repeat2"
      text = "顺序播放"
    }else if (mode === playMode.loop) {
      content = "icon-24gl-repeatOnce2"
      text = "单曲循环"
    }else {
      content = "icon-xunhuan"
      text = "随机播放"
    }
    return (
      <div>
        <i className={classNames("iconfont", s.iconfont,content)} onClick={(e)=> changeMode(e)}></i>
        <span className={s.text} onClick={(e)=>changeMode(e)}>{text}</span>
      </div>
    )
  }
  const changeMode = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    let newMode = (mode + 1) % 3
    if (newMode === 0) {
      changePlayListDispatch(sequencePlayList)
      let index = findIndex(currentSong, sequencePlayList)
      changeCurrentIndexDispatch(index)
    }else if (newMode === 1) {
      changeCurrentIndexDispatch(sequencePlayList)
    }else {
      let newList = shuffle(sequencePlayList)
      let index = findIndex(currentSong, sequencePlayList)
      changePlayList(newList)
      changeCurrentIndexDispatch(index)
    }
    changeModeDispatch(newMode)
  }

  const handleChangeCurrentIndex = (index: number) => {
    if (currentIndex === index) return
    changeCurrentIndexDispatch(index)
  }
  const handleShowClear = () => {
    confirmRef.current.show();
  } 
  const handleConfirmClear: MouseEventHandler = () => {
    clearDispatch()
  }
  const handleScroll = (pos: any) => {
    let state = pos.y === 0
    // console.log(state)
    setCanTouch(state)
  }

  const handleTouchMove = (e:React.TouchEvent<HTMLDivElement>) => {
    if (!canTouch || !initialed) return
      let distance = e.nativeEvent.touches[0].pageY - startY
      if (distance < 0) return
      setDistance(distance)
      listWrapperRef.current.style.transform = `translate3d(0, ${distance} px, 0)`
  }
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setInitialed(false)
    console.log(distance)
    if (distance >= 100) {
      togglePlayListDispatch(false)
    }else {
      listWrapperRef.current.style.transition = "all 0.3s"
      listWrapperRef.current.style.transform = `translate3d(0px, 0px, 0px)`
    }
  }
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if ( !canTouch || !initialed) return
    listWrapperRef.current.style.transition = ""
    setStartY(e.nativeEvent.touches[0].pageY)
    setInitialed(true)
  };

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <div className={s.PlayListWrapper} ref={playListRef} style={ isShow === true ? {display: "block"}: {display: "none"}}
        onClick={()=>togglePlayListDispatch(false)}>
        <div className={s.list_wrapper} 
          ref={listWrapperRef} 
          onClick={e => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={s.ListHeader}>
            <h1 className={s.title}>
              { getPlayMode() }
              <span className={classNames("iconfont", s.iconfont, "icon-shanchu")} onClick={handleShowClear}></span>
            </h1>
          </div>
          <div className={s.ScrollWrapper}>
            <Scroll direction="vertical"
              ref={listContentRef}
              onScroll={(pos: any) => handleScroll(pos)}
            >
              <div className={s.ListContent}>
                {
                  playList.map((item: TSPlayProps.CurrentSong, index: number) => {
                    return (
                      <li className={s.item} key={item.id} onClick={()=>handleChangeCurrentIndex(index)}>
                        { getCurrentIcon(item) }
                        <span className={s.text}>{item.name} - {getName(item.ar)}</span>
                        <span className={s.like}>
                          <i className="iconfont icon-xihuan1"></i>
                        </span>
                        <span className={s.delete} onClick={(e) => handleDeleteSong(e, item)}>
                          <i className="iconfont icon-shanchu"></i>
                        </span>
                      </li>
                    )
                  })
                }
              </div>
            </Scroll>
          </div>
        </div>
        <Confirm
          ref={confirmRef}
          text={"是否删除全部？"}
          cancelBtnText={"取消"}
          confirmBtnText={"确定"}
          handleConfirm={handleConfirmClear}
        >
        </Confirm>
      </div>
    </CSSTransition>
  )
}

const mapStateToProps = (state: any) => ({
  showPlayList: state.getIn (['player', 'showPlayList']),
  currentIndex: state.getIn (['player', 'currentIndex']),
  currentSong: state.getIn (['player', 'currentSong']),
  playList: state.getIn (['player', 'playList']),// 播放列表
  sequencePlayList: state.getIn (['player', 'sequencePlayList']),// 顺序排列时的播放列表
  mode: state.getIn (['player', 'mode'])
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    togglePlayListDispatch (data: boolean) {
      dispatch (changeShowPlayList (data));
    },
    // 修改当前歌曲在列表中的 index，也就是切歌
    changeCurrentIndexDispatch (data: number) {
      dispatch (changeCurrentIndex (data));
    },
    // 修改当前的播放模式
    changeModeDispatch (data: number) {
      dispatch (changePlayMode (data));
    },
    // 修改当前的歌曲列表
    changePlayListDispatch (data: any[]) {
      dispatch (changePlayList (data));
    },
    deleteSongDispatch (data: any) {
      dispatch (deleteSong(data))
    },
    clearDispatch() {
      // 1. 清空两个列表
      dispatch (changePlayList ([]));
      dispatch (changeSequecePlayList ([]));
      // 2. 初始 currentIndex
      dispatch (changeCurrentIndex (-1));
      // 3. 关闭 PlayList 的显示
      dispatch (changeShowPlayList (false));
      // 4. 将当前歌曲置空
      dispatch (changeCurrentSong ({}));
      // 5. 重置播放状态
      dispatch (changePlayingState (false));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList))
