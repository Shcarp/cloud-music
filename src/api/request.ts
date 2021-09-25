import { axiosInstance } from "./config"

// 获取轮播图
export const getBannerRequest = (): Promise<TSBannersProps.BannersList> => {
  return axiosInstance.get('./banner') 
}
// 获取推荐列表
export const getRecommendListRequest = (): Promise<TSPersonalizedData.PersonalizedList> => {
  return axiosInstance.get("/personalized")
}

export const getHotSingerListRequest  = (count: number): Promise<TSHotArtistsData.HotArtistsList> => {
  return axiosInstance.get(`/top/artists?offset=${count}`)
}

export const getSingerListRequest = (props: TSSingersList.SingerListProps): Promise<TSSingersList.SingerList> => {
  return axiosInstance.get(`/artist/list?type=${props.type}&area=${props.area}&initial=${props.alpha?.toLowerCase()}&offset=${props.count}`)
}

export const getRankListRequest = (): Promise<TSRankData.RankList> => {
  return axiosInstance.get("/toplist/detail")
}

export const getAlbumDetailRequest = (id: number): Promise<TSPlayListData.PlayList> => {
  return axiosInstance.get (`/playlist/detail?id=${id}`);
}