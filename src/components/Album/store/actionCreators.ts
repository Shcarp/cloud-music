import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from './constants';
import { getAlbumDetailRequest } from '../../../api/request';
import { fromJS } from 'immutable';

const changeCurrentAlbum = (data: TSPlayListData.PlayData) => ({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS(data) as Album.IMReducerArrDate
})

export const changeEnterLoading = (data: boolean) => ({
  type: CHANGE_ENTER_LOADING,
  data
});


export const getAlbumList = (id: number) => {
  return async (dispatch: (arg0: { type: string; data: any; }) => void) => {
    try {
      let res = await getAlbumDetailRequest(id)
      let data = res.playlist
      dispatch(changeCurrentAlbum(data))
      dispatch(changeEnterLoading(false))
    } catch (error) {
      console.log("获取 album 数据失败！") 
    }
  }
}