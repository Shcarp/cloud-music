import React, { MouseEventHandler, TouchEventHandler, useEffect, useRef, useState } from "react";
import s from "./style.module.scss";

interface touchProps {
  initiated: boolean
  startX: number
  left: number
  [name: string]: any
}

interface ProgressBarProps {
  percentChange?: Function
  percent: number
  [name: string]: any
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const { percentChange, percent } = props
  const div: HTMLDivElement = document.createElement("div")
  const progressBar = useRef(div)
  const progress = useRef(div)
  const progressBtn = useRef(div)
  const [touch, setTouch] = useState<touchProps>({initiated: false, startX: 0, left: 0})

  const progressBtnWidth = 8;  

  // 根据 歌曲进度调整
  useEffect(()=>{
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth
      const offsetWidth = percent * barWidth
      progress.current.style.width = `${offsetWidth}px`
      progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent])

  const _changePercent = () => {
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const curPercent = progress.current.clientWidth / barWidth
    percentChange && percentChange(curPercent)
  }

  const _offset = (offsetWidth: number) => {
    progress.current.style.width = `${offsetWidth}px`
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
  }

  const progressTouchStart: TouchEventHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    const startTouch: touchProps = {
      initiated: true,
      startX: e.touches[0].pageX ?? 0,
      left: progress.current.clientWidth,
    }
    setTouch (startTouch);
  }

  const progressTouchMove:TouchEventHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touch.initiated) return
    const deltaX = e.touches[0].pageX - touch.startX
    const barWidth = progressBar.current.clientWidth - progressBtnWidth

    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth)
    // console.log(offsetWidth)
    _offset(offsetWidth)
  }

  const progressTouchEnd: TouchEventHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    const endTouch: touchProps = JSON.parse(JSON.stringify(touch))  // 克隆了一份touch
    endTouch.initiated = false
    setTouch(endTouch)
    _changePercent()
  }

  const progressClick: MouseEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e)
    const rect = progressBar.current.getBoundingClientRect()
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth)
    _changePercent()
  }
 
  return (
    <div className={s.ProgressBarWrapper}>
      <div className={s.bar_inner} ref={progressBar} onClick={progressClick}>
        <div className={s.progress} ref={progress}></div>
        <div className={s.progress_btn_wrapper} ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className={s.progress_btn}></div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
