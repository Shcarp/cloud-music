import BScroll from '@better-scroll/core'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import ObserveDOM from '@better-scroll/observe-dom'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react'
import Loading from '../Loading'
import s from "./style.module.scss"
import LoadingV2 from "../Loading-v2"
import useDebounce from '../../hooks/useDebounce'

export interface ScrollProps {
  prop?: any;
  onPullup?: Function;
  onPulldown?: Function;
  onScroll?: Function;
  direction: "vertical" | "horizental";
  refresh?: boolean;
  pullDownRefresh?: Object;
  pullUpLoad?: Object;
  pullUpLoading ?: boolean
  pullDownLoading ?: boolean;
  bounceTop?: boolean
  [name: string]: any
}

const Scroll: React.FC<ScrollProps> = forwardRef<HTMLDivElement, ScrollProps> (({   
  direction,
  onPullup,
  onPulldown,
  onScroll,
  children,
  pullDownRefresh = {
    threshold: 70,
    stop: 0
  },
  pullUpLoad = {
    threshold: 90,
    stop: 10
  },
  pullDownLoading=false,
  pullUpLoading=false,
  bounceTop=true,
  refresh= true}, ref) => {
  BScroll.use(ObserveDOM)
  BScroll.use(MouseWheel)
  BScroll.use(ScrollBar)
  BScroll.use(PullDown)
  BScroll.use(Pullup)
  const wrapRef = useRef<HTMLDivElement>(null)
  const initRef = useRef(false)
  const [scrollObj, setScrollObj] = useState<BScrollConstructor>()
  const upDebounce = useDebounce({ fn: onPullup, delay: 300})
  const downDebounce = useDebounce({fn: onPulldown, delay: 300})
  const initBScroll = () => {
    setScrollObj(
      new BScroll(wrapRef.current as HTMLDivElement, {
        scrollX: direction === "horizental",
        scrollY: direction === "vertical",
        probeType: 3,
        click: true,
        observeDOM: true,
        bounce: {
          top: bounceTop,
          bottom: false,
          // left: false,
          // right: false
        },
        // scrollbar: true, // 显示滚动条
        useTransition: true, // 过渡动画
        //  下拉刷新
        pullDownRefresh: pullDownRefresh,
        //  上拉加载更多
        pullUpLoad: pullUpLoad
      })
    )
  }
  // 对象初始化
  useEffect(()=>{
    initBScroll()
    return () =>{
      scrollObj?.destroy()  // 卸载时，将其销毁
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect (() => {
    if (refresh && scrollObj){
      scrollObj.refresh ();
    }
  });
  // 下拉刷新
  useEffect (() => {
    if (!scrollObj || !onPulldown) return;
    scrollObj.on ('touchEnd', (pos: { y: number }) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        downDebounce ();
      }
    });
    return () => {
      scrollObj.off ('touchEnd');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downDebounce, scrollObj]);

  useEffect (() => {
    if (!scrollObj || !onPullup) return;
    scrollObj.on ('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (scrollObj.y <= scrollObj.maxScrollY + 100){
        upDebounce();
      }
    });
    return () => {
      scrollObj.off ('scrollEnd');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upDebounce, scrollObj]);

  useEffect (() => {
    if (!scrollObj || !onScroll) return;
    scrollObj.on ('scroll', (scroll: any) => {
      onScroll (scroll);
    })
    return () => {
      scrollObj.off ('scroll');
    }
  }, [onScroll, scrollObj]);

  // 对象事件挂载
  useEffect(()=>{
    if (initRef.current === true) {

    } else {
      initRef.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useImperativeHandle<HTMLDivElement, any>(ref, ()=>({
    refresh(){
      if(scrollObj) {
        scrollObj.refresh();
        scrollObj.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if(scrollObj) {
        return scrollObj;
      }
    },
  }))

  const PullUpdisplayStyle = pullUpLoading ? { display: ""} : {display: "none"}
  const PullDowndisplayStyle = pullDownLoading ? { display: ""} : {display: "none"}

  return (
    <div ref={wrapRef} style={{ height: "100%", width: "100%",overflow: 'hidden' }}>
        { children }
        {/* 滑到底部加载动画 */}  
        <div className={s.PullUpLoading} style={ PullUpdisplayStyle }>
          <Loading></Loading>
        </div>
        {/* 顶部下拉刷新动画 */}
        <div className={s.PullDownLoading} style={ PullDowndisplayStyle }>
          <LoadingV2></LoadingV2>
        </div>
    </div>
  )
})

export default Scroll
