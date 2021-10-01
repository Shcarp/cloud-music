declare namespace TSSingerProps {
  import { Map } from "immutable"
  interface StateProps {
    artist: TSSingerData.SingerData
    songsOfArtist: Array<TSSingerData.hotSongsData>
    loading: boolean
  }
  type StatePropsMap =  Map<keyof TSSingerProps.StateProps, boolean | TSSingerData.SingerData | TSSingerData.hotSongsData[]>
  interface actionType {
    data: Array<TSSingerData.hotSongsData> | boolean | TSSingerData.SingerData,
    type: string,
    [name: string]: any
  }
}