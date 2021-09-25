import React, { useEffect } from "react";
import { connect } from "react-redux";
import {getRankList} from "./store";
import s from "./style.module.scss";
import { filterIdx } from "../../api/utils"
import Scroll from "../../components/Scroll";
import Loading from "../../components/Loading";
import { renderRoutes } from "react-router-config";

const Rank = (props: TSRankData.RankProps) => {
    const { rankList: List, loading } = props
    const { getRankListDataDispatch } = props
    let rankList = List ? List.toJS() : []
    useEffect(()=>{
        getRankListDataDispatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const idx =  rankList.findIndex((item: TSRankData.RankData) => {
        return (item?.tracks?.length <= 0)
    })
    let officialList = rankList.slice (0, idx);
    let globalList = rankList.slice (idx);
    const enterDetail = (id: number) => {
       console.log(id)
       props.history.push (`/rank/${id}`)
    }

    const renderRankList = (list: Array<TSRankData.RankData>, global: boolean) => {
        return (
            <ul className={s.List} style={{display: global ? "flex": ""}}>
                {
                    list.map((item: TSRankData.RankData) => {
                        return (
                            <li className={s.ListItem} style={{display: item.tracks.length ? "flex" : ""}} onClick={()=> enterDetail(item.id)}>
                                <div style={{width: item.tracks.length ? "27vw": "32vw", height: item.tracks.length ? "27vw" : "32vw", borderRadius: "3px", position: "relative"}}>
                                    <img src={item.coverImgUrl} alt=""></img>
                                    <div className={s.decorate}></div>
                                    <span className={s.updateFrequecy}>{item.updateFrequency}</span>
                                </div>
                                { renderSongList(item.tracks) }
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    const renderSongList = (list: Array<TSRankData.TopListArtists>) => {
        return (
            list.length ? (
                <ul className={s.SongList}>
                    {
                        list.map((item: TSRankData.TopListArtists, index: number) => {
                            return <li key={index}>{ index + 1 }. { item.first } - { item?.second }</li>
                        })
                    }
                </ul>
            ): null
        )
    }
    let displayStyle = loading ? {"display":"none"}:  {"display": ""}; 
    return (
        <div className={s.Container}>
            <Scroll direction="vertical">
                <div>
                    <h1 className={ s.offical } style={displayStyle}> 官方榜 </h1>
                    { renderRankList (officialList, false) }
                    <h1 className={s.global} style={displayStyle}> 全球榜 </h1>
                    { renderRankList (globalList, true) }
                    { loading ? <div className={s.EnterLoading}><Loading></Loading></div> : null }
                </div>
            </Scroll>
            { renderRoutes (props.route.routes) }
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    rankList: state.getIn(['rank', 'rankList']),
    loading: state.getIn(['rank', 'loading'])
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        getRankListDataDispatch() {
            dispatch(getRankList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))