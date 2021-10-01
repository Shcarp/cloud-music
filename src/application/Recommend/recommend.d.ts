declare namespace  TSRecommendData {
  import { List, Map } from "immutable"
  export interface TSDateObj {
    bannerList: Array<TSBannersProps.BannerData>
    recommendList: Array<TSPersonalizedData.PersonalizedData>
    enterLoading: boolean
  } 
  export interface DisPatchFunc {
    type: string
    data: List<TSBannersProps.BannerData | TSPersonalizedData.PersonalizedList>
  }
  export interface RecommendProps {
    bannerList: TSRecommendData.IBannerArrDataType
    recommendList: TSRecommendData.IPersonalizedDataType
    enterLoading: boolean
    getBannerDataDispatch: Function
    getRecommendListDataDispatch: Function
    [name: string]: any
  }
  type DispachFunc = (arg0: RecommendData.DisPatchFunc) => void
  type ObjType = Map<keyof TSDateObj, TSBannersProps.BannerData[] | TSPersonalizedData.PersonalizedData[]>
  type ArrType =  List<TSBannersProps.BannerData | TSPersonalizedData.PersonalizedList>
  type BannerArrDataType = Array<TSBannersProps.BannerData>
  type PersonalizedArrDataType = Array<TSPersonalizedData.PersonalizedData>
  type IBannerArrDataType = List<TSBannersProps.BannerData>
  type IPersonalizedDataType = List<TSPersonalizedData.PersonalizedData>
} 