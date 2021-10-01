import React from "react";
import s from "./style.module.scss"

interface ProgressCircleProps {
  [name: string]: any
}

const ProgressCircle: React.FC<ProgressCircleProps> = (props) => {
  const { radius, percent } = props
  const dashArray  = Math.PI * 92
  const dashOffset = (1 - percent) * dashArray

  return (
    <div className={s.CircleWrapper}>
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle className={s.progress_background} r="46" cx="50" cy="50" fill="transparent"/>
        <circle className={s.progress_bar} r="46" cx="50" cy="50" fill="transparent" 
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}/>
      </svg>
      {props.children}
    </div>
  )
}

export default React.memo(ProgressCircle)
