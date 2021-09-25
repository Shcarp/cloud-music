declare namespace TSSingersData {
  import { Map, List } from "immutable"
  export interface SingerProps {
    singerList: ArrList
    enterLoading: boolean
    pullUpLoading: boolean
    pullDownLoading: boolean
    pageCount: boolean
    getHotSingerDispatch: Function
    updateDispatch: Function
    pullUpRefreshDispatch: Function
    pullDownRefreshDispatch: Function
    [name: string]: any
  }
  export interface ObjType {
    singerList: Array<TSHotArtistsData.HotArtistsData | TSSingersList.SingerListData>
    enterLoading: boolean,
    pullUpLoading?: boolean,
    pullDownLoading?: boolean,
    pageCount: number
  }
  export type singerList = Array<TSHotArtistsData.HotArtistsData | TSSingersList.SingerListData>
  export type ArrList = List<TSHotArtistsData.HotArtistsData | TSSingersList.SingerListData>
  export type MapType = Map<keyof ObjType, TSHotArtistsData.HotArtistsData[] | TSSingersList.SingerListData[]>
}