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