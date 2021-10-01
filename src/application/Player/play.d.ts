declare namespace TSPlayProps {
  import { List } from "immutable";
  interface PlayProps {
    fullScreen: boolean
    playing: boolean, // 当前歌曲是否播放
    sequencePlayList: Array<any>, // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
    playList: Array<any>,
    mode: number,// 播放模式
    currentIndex: number,// 当前歌曲在播放列表的索引位置
    showPlayList: boolean,// 是否展示播放列表
    currentSong:  CurrentSong
  }
  interface CurrentSong {
    [name: string]: any
  }

  interface ActionProps {
    type: string,
    data: boolean | number | string | Array<any> | CurrentSong
  }
  interface al {
    picUrl: string,
    [name: string]: any,
  }
  interface arD {
    name: string
  }
  interface MiniPlayerProps {
    al: al,
    name: string,
    ar: Array<arD>
  }
  interface MiniPlayerPropsList {
    song: MiniPlayerProps,
    clickPlaying: Function
    setFullScreen?: Function
    playing: boolean
    percent: number
    duration?: number
    currentTime?: number
    handlePrev?: MouseEventHandler<HTMLDivElement>
    handleNext?: MouseEventHandler<HTMLDivElement>
    changeMode: MouseEventHandler<HTMLDivElement>
    togglePlayList: MouseEventHandler<HTMLDivElement>
    [name: string]: any
  }
  interface Song {
    [name: string]: any
  }
  interface PlayComProps {
    fullScreen: boolean,
    playing: boolean,
    currentSong: TSPlayProps.CurrentSong,
    showPlayList: boolean,
    mode: number,
    currentIndex: number,
    playList: List<any>,
    sequencePlayList: List<any>,
    togglePlayingDispatch: Function
    toggleFullScreenDispatch: Function
    togglePlayListDispatch: Function
    changeCurrentIndexDispatch: Function
    changeCurrentDispatch: Function
    changeModeDispatch: Function
    changePlayListDispatch: Function

    [name: string]: any
  }
  interface PlayListProps {
    showPlayList: boolean
    togglePlayListDispatch: Function
    currentIndex: number
    currentSong: TSPlayProps.CurrentSong
    playList: List<any>
    sequencePlayList: List<any>
    mode: number
    changeCurrentIndexDispatch: Function
    changeModeDispatch: Function
    changePlayListDispatch: Function
    [name: string]: any
  }
  
} 