import React, { useCallback, useEffect, useState } from "react";
import s from "./style.module.scss"
import "./style.css"
import { CSSTransition } from "react-transition-group";
import SearchBox from "../../baseUI/searchBox";
import { getHotKeyWords, changeEnterLoading, getSuggestList  } from "./store/actionCreators";
import { getSongDetail } from './../Player/store/actionCreators';
import { connect } from "react-redux";
import { List } from "immutable";
import Scroll from "../../components/Scroll";
import Loading from "../../components/Loading";
import LazyLoad, {forceCheck} from "react-lazyload";

export interface SearchProps {
  hotList: List<TSHot.DataArr>
  enterLoading: boolean
  suggestList: any
  songsCount: number
  songsList: List<TSSuggest.SongeData>
  getHotKeyWordsDispatch: Function
  changeEnterLoadingDispatch: Function
  getSuggestListDispatch: Function
  getSongDetailDispatch: Function
  [name: string]: any
} 

const Search: React.FC<SearchProps> = (props) => {
  const {
    hotList: immutableHotList ,
    enterLoading,
    suggestList: immutableSuggestList,
    songsCount,
    songsList: immutableSongsList
  } = props
  const hotList = immutableHotList.toJS() as Array<TSHot.DataArr>
  const suggestList = immutableSuggestList.toJS() as TSSuggest.RespRes
  const songsList = immutableSongsList.toJS() as Array<TSSuggest.SongeData>
  const {
    getHotKeyWordsDispatch,
    changeEnterLoadingDispatch,
    getSongDetailDispatch,
    getSuggestListDispatch
  } = props
  const [ show, setShow ] = useState(false)
  const [ query, setQuery ] = useState("") 

  useEffect(()=>{
    setShow(true)
    if (!immutableHotList.size) {
      getHotKeyWordsDispatch()
    }
  }, [])

  const searchBack = useCallback(()=>{
    setShow(false)
  }, [])
  const handleQuery = (q: string) => {
    setQuery(q)
    if (!q) return
    changeEnterLoadingDispatch(true)
    getSuggestListDispatch(q)
  }
  const renderHotKey = () => {
    let list = hotList ? hotList : []
    return (
      <ul>
        {
          list.map((item: TSHot.DataArr) => {
            return (
              <li className={s.item} key={item.first} onClick={()=>setQuery(item.first)}>
                <span>{ item.first }</span>
              </li>
            )
          })
        }
      </ul>
    )
  }
  const renderSingers = () => {
    let singers = suggestList.artists
    if (!singers || !singers.length) return
    return (
      <div className={s.List}>
        <h1 className={s.title}>相关歌手</h1>
        {
          singers.map((item:TSSuggest.Artist, index: number) => {
            return (
              <div className={s.ListItem} key={item.id+""+index}>
                <div className={s.img_wrapper}>
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./04.png')} alt="singer"/>}>
                    <img src={item.picUrl} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className={s.name}>歌手：</span>
              </div>
            )
          })
        }
      </div>
    )
  }
  const renderAlbum = () => {
    let albums = suggestList.playlists
    if (!albums || !albums.length) return
    return (
      <div className={s.List}>
        <h1 className={s.title}></h1>
        {
          albums.map((item: TSSuggest.PlayListData , index: number) => {
            return (
              <div className={s.ListItem} key={item.id+""+index} onClick={()=>props.histroy.push(`/album/${item.id}`)}>
                <div className={s.img_wrapper}>
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./04.png')} alt="music" />}>
                    <img src={item.coverImgUrl} width="100%" alt="music" />
                  </LazyLoad>
                </div>
                <span className={s.name}></span>
              </div>
            )
          })
        }
      </div>
    )
  }
  const renderSongs = () => {

  }

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={()=>props.history.goBack()}
    >
      <div className={s.cantainer} >
        <div className={s.search_box_wrapper}>
            <SearchBox handleQuery={handleQuery} back={searchBack} newQuery={query}></SearchBox>
        </div>
        <div className={s.ShortcutWrapper} style={{display: !query ? "":"none"}}>
          <Scroll direction="vertical">
            <div>
              <div className={s.HotKey }>
                <h1 className={s.title}></h1>
                { renderHotKey() }
              </div>
            </div>
          </Scroll>
        </div>
        <div className={s.ShortcutWrapper} style={{display: query ? "": "none"}}>
          <Scroll direction="vertical" onScroll={forceCheck}>
            <div>
              { renderSingers() }
              { renderAlbum() }
              { renderSongs() }
            </div>
          </Scroll>
        </div>
        { enterLoading ? <Loading></Loading>: null }
      </div>
    </CSSTransition>
  )
}

const mapStateToProps = (state: any) => ({
  hotList: state.getIn (['search', 'hotList']),
  enterLoading: state.getIn (['search', 'enterLoading']),
  suggestList: state.getIn (['search', 'suggestList']),
  songsCount: state.getIn (['player', 'playList']).size,
  songsList: state.getIn (['search', 'songsList'])
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getHotKeyWordsDispatch() {
      dispatch(getHotKeyWords())
    },
    changeEnterLoadingDispatch(data: boolean) {
      dispatch(changeEnterLoading(data))
    },
    getSuggestListDispatch(data: string) {
      dispatch(getSuggestList(data))
    },
    getSongDetailDispatch(id: number) {
      dispatch(getSongDetail(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search))
