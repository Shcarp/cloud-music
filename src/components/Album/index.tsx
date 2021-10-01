import React, { useCallback, useEffect, useRef, useState } from "react";
import s from "./style.module.scss"
import { CSSTransition  } from "react-transition-group"
import Header from "../../baseUI/Header"
import './style.css'
import Scroll from "../Scroll";
// import classes from "classnames"
import ATemplate from "./AlumTemplate"
// import AList from "./AlbumList"
import { connect } from 'react-redux';
import { changeEnterLoading, getAlbumList } from "./store/actionCreators";
import Loading from "../Loading";
import SongList from '../../application/SongList'
import MusicNote from "../../baseUI/musicNote"

interface AlbumProps {
  currentAlbum: Album.IMReducerArrDate
  enterLoading: boolean
  getAlbumDataDispatch: Function
  [name: string]: any
}
export const HEADER_HEIGHT = 45;

const Album = (props: AlbumProps) => {
  const [showStatus, setShowStatus] = useState (true);
  const [title, setTitle] = useState ("歌单");
  const [isMarquee, setIsMarquee] = useState (false);// 是否跑马灯
  const headerEl = useRef<HTMLDivElement>(null)
  const musicNoteRef = useRef<any>()
  const id = props.match.params.id;
  const { currentAlbum, enterLoading, getAlbumDataDispatch, songsCount } = props
  const currentAlbumJS =  currentAlbum.toJS() as TSPlayListData.PlayData

  const musicAnimation =(x: number, y: number) => {
    musicNoteRef.current.startAnimation({x, y})
  }

  useEffect (()=> {
    getAlbumDataDispatch(id)
  }, [getAlbumDataDispatch, id])

  //如果不用 useCallback 包裹，父组件每次执行时会生成不一样的 handleBack 和 handleScroll 函数引用，那么子组件每一次 memo 的结果都会不一样，导致不必要的重新渲染，也就浪费了 memo 的价值。
  const handleScroll = useCallback((pos: { y: number; [name: string]: any}) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs (pos.y/minScrollY);
    let headerDom:HTMLDivElement = headerEl.current as HTMLDivElement;
    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = "#e57373";
      headerDom.style.opacity = String(Math.min (1, (percent-1)/2));
      setTitle (currentAlbumJS.name);
      setIsMarquee (true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = "1";
      setTitle ("歌单");
      setIsMarquee (false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  const handBack = useCallback(() => {
    setShowStatus(false)
  }, []) 

  return (
    <CSSTransition 
      in={ showStatus }
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <div className={s.container} style={{bottom: songsCount > 0 ? "80px": "0"}}>
        <Header ref={headerEl} title={title} isMarquee={isMarquee} handleClick={handBack} ></Header>
        <Scroll direction="vertical" bounceTop={false} onScroll={handleScroll}>
          <div>
            <ATemplate currentAlbum={currentAlbumJS}></ATemplate>
            <SongList songs={currentAlbumJS.tracks} collectCount={currentAlbum.subscribedCount} musicAnimation={musicAnimation}>
            </SongList>
          </div>
        </Scroll>
        { enterLoading ? <Loading></Loading> : null}
        <MusicNote ref={musicNoteRef}></MusicNote>
     </div>
    </CSSTransition>
  )
}
const mapStateToProps = (state: { getIn: (arg0: string[]) => any; }) => ({
  currentAlbum: state.getIn (['album', 'currentAlbum']),
  enterLoading: state.getIn (['album', 'enterLoading']),
  songsCount: state.getIn(['player', 'playList']).size
})

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    getAlbumDataDispatch (id: number) {
      dispatch (changeEnterLoading(true));
      dispatch (getAlbumList(id));
    },
  }
};


export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Album));

