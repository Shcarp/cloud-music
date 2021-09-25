import React, { useEffect } from "react";
import Slider from "../../components/Slider"
import RecommendList  from "../../components/RecommendList"
import Loading from "../../components/Loading";
import Scroll from "../../components/Scroll"
import style from "./style.module.scss"
import * as actionTypes from "./store/actionCreators"
import { connect } from "react-redux";
import { forceCheck } from 'react-lazyload';
import { renderRoutes } from 'react-router-config'

const Recommend = (props: TSRecommendData.RecommendProps) => {
  const { bannerList, recommendList, enterLoading } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
  useEffect(() => {
    getBannerDataDispatch();
    getRecommendListDataDispatch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const bannerListJS = bannerList ? bannerList.toJS () as TSRecommendData.BannerArrDataType : [];
  const recommendListJS = recommendList ? recommendList.toJS () as TSRecommendData.PersonalizedArrDataType :[];
  return (
    <div className={ style.Content }>
      <Scroll direction="vertical" onScroll={ ()=>forceCheck() }>
        <div>
          <Slider bannerList={bannerListJS} >
            <div className={style.before}></div>
          </Slider>
          <RecommendList historys={props.history} recommendList={recommendListJS}></RecommendList >
          
        </div>
      </Scroll>
      { enterLoading ? <Loading /> : null }
      { renderRoutes(props.route?.routes ) }
    </div>
  )
}
// 映射Redux 全局的state 到props上
const mapStateToProps = (state: TSRecommendData.ObjType) => ({
  bannerList: state.getIn(['recommend', 'bannerList']) as TSRecommendData.IBannerArrDataType,
  recommendList: state.getIn (['recommend', 'recommendList']) as TSRecommendData.IPersonalizedDataType,
  enterLoading: state.getIn(['recommend', 'enterLoading'])
})

const mapDispatchToProps = (dispatch: any)=> {
  return {
    getBannerDataDispatch () {
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch () {
      dispatch(actionTypes.getRecommendList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend) ) 