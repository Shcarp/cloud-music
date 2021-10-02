import classNames from "classnames";
import React, { forwardRef, MutableRefObject, useImperativeHandle, useRef } from "react";
import Lyric, {LinesProps} from "../../api/utils/Lyric";
import Scroll from "../Scroll";
import s from "./style.module.scss"
interface LyricContainerProps {
  currentLyric?: Lyric
  currentLineNum?: number
  lyricLineRefs: MutableRefObject<Array<React.RefObject<HTMLParagraphElement>>>
  currentState?: string
  // [name: string]: any
}
const LyricContainer = forwardRef<HTMLDivElement, LyricContainerProps>((props, ref)=>{
  const { currentLyric, currentLineNum, lyricLineRefs, currentState } = props
  const ScrollRef = useRef<any>()
  useImperativeHandle<HTMLDivElement, any>(ref, ()=>({
    ScrollRef: ScrollRef.current
  }))
  return (
      <Scroll direction="vertical" ref={ScrollRef}>
        <div className={s.lyric_wrapper} style={{visibility: currentState === "lyric" ? "visible" : "hidden"}}>
          {
            currentLyric
            ? currentLyric.lines.map((item: LinesProps, index: number) => {
              lyricLineRefs.current[index] = React.createRef();
              return (
                <p
                  className={classNames(s.text, currentLineNum === index ? s.current: "")}
                  key={item.time + index}
                  ref={lyricLineRefs?.current[index]}  
                >
                  {item.txt}
                </p>
              )
            })
            : <p className={classNames(s.text, s.pure)}>纯音乐，请欣赏</p>
          }
        </div>
      </Scroll>
  )
})

export default React.memo(LyricContainer)
