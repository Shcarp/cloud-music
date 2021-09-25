declare namespace Album {
  import { Map } from "immutable"
  export interface AlbumTmp {
    currentAlbum: TSPlayListData.PlayData
    [name: string]: any
  }
  export interface AlbumListPops {
    currentAlbum: TSPlayListData.PlayData
    [name: string]: any
  }
  export interface ReducerData {
    currentAlbum: TSPlayListData.PlayData
    enterLoading: false
  }
  type IMReducerData = Map<keyof ReducerData, TSPlayListData.PlayData>
  type IMReducerArrDate = Map<keyof TSPlayListData.PlayData, string | number | TSPlayListData.creator | Array<TSPlayListData.tracksData>>

}