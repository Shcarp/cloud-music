import React, { useState, useEffect } from "react";
import Horizen from "../../baseUI/horizen-item"
import { categoryTypes,alphaTypes, areaTypes } from "../../api/config" 
import s from "./style.module.scss"
import Scroll from "../../components/Scroll";
import { 
  getHotSingerList, 
  getSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreHotSingerList, 
  refreshMoreSingerList, 
  changePullDownLoading, 
  changePullUpLoading 
} from "./store/actionCreators"
import { connect } from "react-redux";
import LazyLoad from "react-lazyload"
import { forceCheck } from 'react-lazyload';
import Loading from "../../components/Loading";
import { renderRoutes } from "react-router-config";

const Singers = (props: TSSingersData.SingerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount, songsCount} = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props
  const [category, setCategory] = useState("")
  const [alpha, setAlpha ] = useState("")
  const [area, setArea] = useState("")
  const handleUpdateAlpha = (val: string) => {
    setAlpha(val)
    updateDispatch(category, area, val)
  }
  const handleUpdateCatetory = (val: string) => {
    setCategory(val)
    updateDispatch(val, area, alpha)
  }
  const handleUpdateArea = (val: string) => {
    setArea(val)
    updateDispatch(category, val, alpha)
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, area, alpha, category === "", pageCount)
  }
  const handlePullDown = () => {
    pullDownRefreshDispatch(category, area, alpha)
  }
  const enterDetail = (id: number)  => {
    props.history.push (`/singers/${id}`);
  };  

  useEffect(() => {
    getHotSingerDispatch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const singerListJS = singerList ? singerList.toJS() as TSSingersData.singerList : []

  const renderSingerList = () => {
    return (
      <div className={s.List}>
        {
          singerListJS.map ((item, index) => {
            return(
              <div className={s.ListItem} key={item?.accountId+""+index} onClick={()=>enterDetail(item.id)}>
                <div className={s.imgWrapper}>
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./04.jpg')} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300*300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className={s.name}>{item.name}</span>
              </div>
            ) 
          })
        }
      </div>
    )
  }
  return (
    <div>
      <div className={s.NavContainer}>
        <Horizen
    list={categoryTypes}
    handleClick={handleUpdateCatetory}
    oldVal={category}
    title={"类别:"}/>
        <Horizen
    list={areaTypes}
    title={"地区:"}
    oldVal={area}
    handleClick={handleUpdateArea}/>
        <Horizen
    list={alphaTypes}
    title={"首字母:"}
    oldVal={alpha}
    handleClick={handleUpdateAlpha}/>
        
      </div>
      <div className={s.ListContainer} style={{bottom: songsCount >0 ? "60px": "0"}}>
        <Scroll 
          direction="vertical" 
          onScroll={()=> forceCheck()}
          onPulldown={ handlePullDown }
          onPullup={ handlePullUp }
          pullDownLoading={ pullDownLoading }
          pullUpLoading={ pullUpLoading } >
        { renderSingerList() }
        </Scroll>
      </div>
      { enterLoading ? <Loading></Loading> : null }
      { renderRoutes(props.route.routes) }
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
  songsCount: state.getIn (['player', 'playList']).size
})

const mapDispatchToProps  = (dispatch: any) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList())
    },
    updateDispatch(type: string, area: string, alpha: string) {
      dispatch(changePageCount(0))
      dispatch(changeEnterLoading(true))
      dispatch(getSingerList(type, area, alpha))
    },
    pullUpRefreshDispatch(type: string, area: string, alpha: string, hot: boolean, count: number) {
      dispatch(changePullUpLoading(true))
      dispatch(changePageCount(count + 1))
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(type, area, alpha));
      }
    },
    pullDownRefreshDispatch(type: string, area: string, alpha: string) {
      dispatch(changePullDownLoading(true))
      dispatch(changePageCount(0))
      if (type === "" && alpha === "" && area === "") {
        dispatch(getHotSingerList())
      }else {
        dispatch(getSingerList(type, area, alpha))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
