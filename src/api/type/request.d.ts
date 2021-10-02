declare namespace TSBannersProps {
  export interface BannerData {
    imageUrl: string,
    targetId: number,
    targetType?: number,
    titleColor?: string,
    typeTitle: string,
    [name: string]: any
  }
  export interface BannersList {
    banners: Array<BannerData>
    code: number
  }
} 

declare namespace TSPersonalizedData {
  export interface PersonalizedData {
    id: number,
    type: 0,
    name: string,
    copywriter: string,
    picUrl: string,
    canDislike: true,
    trackNumberUpdateTime: number,
    playCount: number,
    trackCount: number,
    highQuality: boolean,
    alg: string
  }
  export interface PersonalizedList {
    hasTaste: boolean,
    code: number,
    category: number,
    result: Array<PersonalizedData>
  }
}

declare namespace TSHotArtistsData {
  export interface HotArtistsData {
    id: number,
    name: string,
    picId: number,
    img1v1Id: number,
    briefDesc: string,
    picUrl: string,
    img1v1Url: string,
    albumSize: number,
    alias: Array<string>,
    trans: string,
    musicSize: number,
    topicPerson: number,
    accountId: number,
    picId_str: string,
    img1v1Id_str: string,
    [name: string]: any
  }
  export interface HotArtistsList {
    code: number,
    more: boolean,
    artists: Array<HotArtistsData>,
  }
}

declare namespace TSSingersList {
  export interface SingerListProps {
    type?: string,
    area?: string,
    alpha?: string,
    count?: number
  }
  export interface SingerListData {
    albumSize: string,
    alias: Array<string>,
    briefDesc: string,
    followed: boolean,
    id: number,
    img1v1Id: number,
    img1v1Id_str: string,
    img1v1Url: string,
    musicSize: number,
    name: string,
    picId: number,
    picId_str: string,
    picUrl: string,
    topicPerson: number,
    trans: string,
    [name: string]: any
  }
  export interface SingerList {
    artists: Array<SingerListData>,
    more: boolean,
    code: number
  }
}

declare namespace TSPlayListData {
  interface al {
    name: string
    [name: string]: any
  }
  
  interface ar {
    name: string
    [name: string]: any
  }
  export interface tracksData {
    name: string
    ar: Array<ar>
    al: al
    [name: string]: any
  }
  export interface creator {
    avatarUrl: string
    nickname: string
    [name: string]: any
  }
  export interface PlayData {
    coverImgUrl: string
    description: string
    id: number
    name: string
    subscribedCount: number
    creator: creator
    tracks: Array<tracksData>

  }
  export interface PlayList {
    code: number
    playlist: PlayData
    privileges: Array<any>
    [name: string]: any
  }
}

declare namespace TSSingerData {
  interface SingerData {
    picUrl: string
    name: string
    briefDesc: string
    [name: string]: any
  }
  interface arD {
    name: string
    [name: string]: any
  }
  interface alD {
    name: string
    [name: string]: any
  }
  interface hotSongsData {
    name: string,
    ar: Array<arD>,
    al: alD
    [name: string]: any
  }
  interface SingerList {
    artist: SingerData
    code: number
    more: boolean
    hotSongs: Array<hotSongsData>
    [name: string]: any
  }
}

declare namespace TSLrcProps {
  interface LrcData {
    lyric: string
    version: number
  }
  interface LrcList {
    code: number
    klyric: LrcData
    lrc: LrcData
    tlyric: LrcData
    qfy: boolean
    sfy: boolean
    sgc: boolean
  }
}

declare namespace TSHot {
  interface DataArr {
    first: string
    iconType: number
    second: number
    third: unknown
  }
  interface HotData {
    hots: Array<DataArr>
  }
  interface HotRssp {
    code: number
    result: HotData
  }
}

declare namespace TSSuggest {
  interface BaseData {
    id: number
    name: string
  }
  interface Artist extends BaseData {
    albumSize: number
    alia: Array<string>
    alias: Array<string>
    img1v1: number
    img1v1Url: string
    picId: number
    picUrl: string
    trans: any
  }
  interface AlbumsData extends BaseData {
    alia: Array<string>
    artist: Artist
    copyrightId: number
    mark: number
    picId: number
    publishTime: number
    size: number
    status: number
  }
  interface PlayListData extends BaseData {
    bookCount: number
    coverImgUrl: string
    creator: any
    description: string
    highQuality: boolean
    officialTags: any
    playCount: number
    specialType: number
    subscribed: false
    trackCount: number
    userId: number
  }
  interface SongeData extends BaseData {
    album: AlbumsData
    alias: Array<any>
    artists: Array<Artist>
    copyrightId: number
    duration: number
    fee: number
    ftype: number
    mark: number
    mvid: number
    rUrl: any
    rtype: number
    status: number
    transNames: Array<string>
  }
  interface RespRes {
    albums: Array<AlbumsData>
    artists: Aarray<Artist>
    order: Array<string>
    playlists: Array<PlayListData>
    songs: Array<SongeData>
  }
  interface SuggestResp {
    code: number
    result: RespRes
  }
}
declare namespace TSSong {
  interface SongRespData {
    hasMore: boolean
    songCount: number
    songs: Array<TSSuggest.SongeData>
  }
  interface SongResp {
    code: number
    result: SongRespData
  }
}
