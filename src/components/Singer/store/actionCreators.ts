import { CHANGE_SONGS_OF_ARTIST, CHANGE_ARTIST, CHANGE_ENTER_LOADING } from './constants';
import { fromJS } from 'immutable';
import { getSingerInfoRequest } from './../../../api/request';

const changeArtist = (data: TSSingerData.SingerData) => ({
  type: CHANGE_ARTIST,
  data: fromJS(data)
})

const changeSongs = (data: Array<TSSingerData.hotSongsData>) => ({
  type: CHANGE_SONGS_OF_ARTIST,
  data: fromJS(data)
})

export const changeEnterLoading = (data: boolean) => ({
  type: CHANGE_ENTER_LOADING,
  data
}) 

export const getSingerInfo = (id: number) => {
  return async (dispatch: any) => {
    let res = await getSingerInfoRequest(id)
    dispatch(changeArtist(res.artist))
    dispatch(changeSongs(res.hotSongs))
    dispatch(changeEnterLoading(false))
  }
}

