declare namespace TSRankData {

    import { Map, List } from "immutable"

    export interface TopListArtists {
        first?: string
        second?: string
        third?: number
    }
    export interface RankData {
        subscribers?: Array<any>
        subscribed?: any
        creator?: any
        artists?: any
        tracks: Array<TopListArtists>
        updateFrequency?: string
        backgroundCoverId?: number
        backgroundCoverUrl?: any
        titleImage?: any
        titleImageUrl?: any
        englishTitle?: any
        opRecommend?: any
        recommendInfo?: any
        adType?: number
        trackNumberUpdateTime?: number
        subscribedCount?: number
        cloudTrackCount?: number
        highQuality?: boolean
        createTime?: number
        coverImgId?: any
        specialType?: number
        newImported?: boolean
        updateTime?: number
        anonimous?: boolean
        trackCount?: number
        totalDuration?: number
        commentThreadId?: string
        trackUpdateTime?: any
        privacy?: number
        description?: string
        name: string
        id: number
        coverImgId_str?: string
        ToplistType?: string
        coverImgUrl?: string
        playCount?: number
        status?: string
        userId?: number
        tags?: Array<string>
        ordered?: boolean
        [name: string]: any
    }

    export interface RankTopList {
        coverUrl?: string
        artists?: Array<TopListArtists>
        name?: string
        upateFrequency?: string
        position?: number
        updateFrequency?: string
        [name: string]: any
    }

    export  interface  SongArtists {
        name?: string
        id?: number
        picId?: number
        img1v1Id?: number
        briefDesc?: string
        picUrl?: string
        img1v1Url?: string
        albumSize?: number
        alias?: Array<any>
        trans?: string
        musicSize?: number
        topicPerson?: number
    }
    export interface Music {
        name?: any,
        id?: number,
        size?: number,
        extension?: string,
        sr?: number,
        dfsId?: number,
        bitrate?: number,
        playTime?: number,
        volumeDelta?: number
    }

    export interface RankRewardTopListSong {
        name?: string
        id?: number
        position?: number
        alias?: Array<any>
        status?: number
        fee?: number
        copyrightId?: number
        disc?: number
        no?: number
        artists?: Array<SongArtists>
        album?: Array<any>
        starred?: boolean
        popularity?: number,
        score?: number,
        starredNum?: number,
        duration?: number,
        playedNum?: number,
        dayPlays?: number,
        hearTime?: number,
        ringtone?: string,
        crbt?: any,
        audition?: any,
        copyFrom?: string,
        commentThreadId?: string,
        rtUrl?: any,
        ftype?: number,
        rtUrls?: Array<string>,
        copyright?: number,
        transName?: any,
        sign?: any,
        mark?: number,
        originCoverType?: number,
        originSongSimpleData?: any,
        single?: number,
        noCopyrightRcmd?: any,
        mvid?: number,
        bMusic?: Music
        mp3Url?: any,
        rtype?: number,
        rurl?: number,
        hMusic?: Music
        mMusic?: Music
        lMusic?: Music
    }

    export interface RankRewardTopList {
        coverUrl?: string
        songs?: Array<RankRewardTopListSong>
        name?: string
        position?: number
    }

    export interface RankList {
        code?: number;
        list: Array<RankData>
        artistToplist?: RankTopList
        rewardToplist?: RankRewardTopList
    }
    export interface DefaultProps {
        rankList: Array<RankData>
        loading: boolean
    }
    const defaultState: TSRankData.DefaultProps =  {
        rankList: [],
        loading: true
      }
    interface ActionType {
        data?: Array<TSRankData.RankData>
        type?: any
        [name: string]: any
    }
    type MapData = Map<keyof defaultState, Array<TSRankData.RankData>>
    type ListData = List<TSRankData.RankData>
    export interface RankProps {
        rankList: ListData
        loading: boolean
        getRankListDataDispatch: Function
        [name: string]: any
    }
}