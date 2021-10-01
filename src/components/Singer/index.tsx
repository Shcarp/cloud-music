import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CSSTransition } from "react-transition-group";
import s from "./style.module.scss"
import "./style.css"
import Header from '../../baseUI/Header';
import classNames from 'classnames';
import Scroll from '../Scroll';
import SongList from '../../application/SongList';
import { HEADER_HEIGHT  } from "../../api/config"
import { getSingerInfo, changeEnterLoading } from './store/actionCreators';
import { connect } from 'react-redux'
import Loading from '../Loading';
import MusicNote from '../../baseUI/musicNote'

interface SingerProps {
  artist: TSSingerData.SingerData,
  songs: TSSingerData.hotSongsData,
  loading: boolean,
  [name: string]: any
}

function Singer (props: SingerProps) {
  const div:HTMLDivElement = document.createElement('div');
  const [showStatus, setShowStatus] = useState(true)
  const collectButton  = useRef<HTMLDivElement>(div)
  const imageWrapper = useRef<HTMLDivElement>(div)
  const songScrollWrapper = useRef<HTMLDivElement>(div);
  const songScroll = useRef<any> (div);
  const header = useRef (div);
  const layer = useRef<HTMLDivElement> (div);
  const musicNoteRef = useRef<any>(div)
  const initialHeight = useRef<string>("0")
  const OFFSET = 5;
  const musicAnimation = (x: number, y: number) => {
    musicNoteRef.current.startAnimation({x, y})
  }

  const {
    artist: immutableArtist,
    songs: immutableSongs,
    songsCount,
    loading
  } = props;

  const { getSingerDataDispatch } = props;

  const artist = immutableArtist.toJS();
  const songs = immutableSongs.toJS();

  useEffect(()=>{
    const id = props.match.params.id;
    console.log(id)
    getSingerDataDispatch(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    let h: number | string = imageWrapper.current?.offsetHeight ? imageWrapper.current.offsetHeight : 0
    songScrollWrapper.current.style.top = `${h - OFFSET}px`
    initialHeight.current= `${h - OFFSET}px`
    layer.current.style.top = `${h - OFFSET}px`
    songScroll.current.refresh()
  }, [])

  const setShowStatusFalse = useCallback (() => {
    setShowStatus (false);
  }, []);

  const  handleScroll = useCallback((pos: any) => {
    let height = parseInt(initialHeight.current);
    const newY = pos.y
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    const percent = Math.abs(newY / height)
    if (newY > 0) {
      // eslint-disable-next-line no-whitespace-before-property
      imageDOM.style ["transform"] = `scale (${1 + percent})`;
      // eslint-disable-next-line no-whitespace-before-property
      buttonDOM.style ["transform"] = `translate3d (0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } 
    else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs (newY)}px`;

      songScrollWrapper.current.style.top = `${height - OFFSET - Math.abs (newY)}px`
      // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = "1";
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = "0";
      imageDOM.style.zIndex = "-1";
      // 按钮跟着移动且渐渐变透明
      // eslint-disable-next-line no-whitespace-before-property
      buttonDOM.style ["transform"] = `translate3d (0, ${newY}px, 0)`;
      // eslint-disable-next-line no-whitespace-before-property
      buttonDOM.style ["opacity"] = `${1 - percent * 2}`;
    }
    else if (newY < minScrollY) {
      // 往上滑动，但是超过 Header 部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = "1";
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = "100";
      // 此时图片高度与 Header 一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = "0";
      imageDOM.style.zIndex ="99";
    }
  }, [])

  return (
    <CSSTransition
    in={showStatus}
    timeout={300}
    classNames="fly"
    appear={true}
    unmountOnExit
    onExited={() => props.history.goBack ()}
  >
    <div className={s.Container} style={{bottom: songsCount > 0 ? "70px":"0"}}>
      <Header title={artist.name} 
        handleClick={setShowStatusFalse}
        ref={header}></Header>
      <div className={s.ImgWrapper} ref={imageWrapper} style={{background: `url(${artist.picUrl})`, backgroundSize: "cover"}}>
        <div className={s.filter}> 
          {/* <div className={s.desc}>
            {artist.briefDesc} 
          </div> */}
        </div>
      </div>
      <div className={s.CollectButton} ref={collectButton}>
        <i className={classNames("iconfont", "icon-shoucang")}></i>
        <span className={s.text}> 收藏 </span>
      </div>
      <div className={s.BgLayer} ref={layer}></div>
      <div className={s.SongListWrapper} ref={songScrollWrapper}>
        <Scroll direction="vertical" ref={songScroll} onScroll={handleScroll}>
          <SongList
            songs={ songs }
            showCollect={false}
            musicAnimation={musicAnimation}
            >
          </SongList>
        </Scroll>
      </div>
      { loading ? (<Loading></Loading>) : null}
      <MusicNote ref={musicNoteRef}></MusicNote>
    </div>
  </CSSTransition>
  )
}

const mapStateToProps = (state: TSSingerProps.StatePropsMap) => ({
  artist: state.getIn (["singerInfo", "artist"]) ,
  songs: state.getIn (["singerInfo", "songsOfArtist"]),
  loading: state.getIn  (["singerInfo", "loading"]),
  songsCount: state.getIn(['player', 'playList']).size
})

const mapDispatchToProps = (dispatch: any) => {
  return {  
    getSingerDataDispatch(id: number) {
      dispatch(changeEnterLoading(true))
      dispatch(getSingerInfo(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer))
