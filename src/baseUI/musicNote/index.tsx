import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import s from "./style.module.scss"

interface MusicNoteProps {
  [name: string]: any
}
interface domProps {
  running: boolean
  // [name:string]: any
}

type MElementProps = domProps & HTMLElement

interface startAnimationProps {
  x: number,
  y: number
  [name: string]: any
}

const MusicNote = forwardRef<HTMLDivElement, MusicNoteProps>((props, ref) => {
  const div = document.createElement('div')
  const iconRef = useRef<HTMLDivElement>(div)
  const ICON_NUMBER = 3

  const createNode = (txt:string) => {
    const template = `<div class=${s.icon_wrapper}> ${txt}</div>`
    let tempNode = document.createElement('div')
    tempNode.innerHTML = template
    return tempNode.firstChild
  }
  useEffect(()=>{
    for (let i = 0; i < ICON_NUMBER; i++) {
      let node = createNode(`<div class="iconfont icon-yinle"></div>`)
      if (node) {
        iconRef.current.appendChild(node)
      }
      let domArray = Array.from(iconRef.current.children)
      domArray.forEach((item: Element) =>{
        const  myItem: MElementProps = item as MElementProps
        myItem.running = false
        myItem.addEventListener('transitionend', function(){
          this.style.display = 'none'
          this.style.transform = 'translate3d(0, 0, 0)'
          // @ts-ignore
          this.running = false
          let icon = this.querySelector('div')
          if (icon) {
            icon.style.transform = 'translate3d(0, 0, 0)'
          }
        }, false)
      })
    }
  }, [])

  const startAnimation = ({x, y}: startAnimationProps) => {
    for (let i = 0; i < ICON_NUMBER; i ++) {
      let domArray = Array.from(iconRef.current.children)
      let item = domArray[i] as MElementProps
      if (item.running === false) {
        item.style.left = x + "px"
        item.style.top = y + "px"
        item.style.display = "inline-block"
        setTimeout(()=>{
          item.running = true
          item.style.transform = `translate3d(0, 750px, 0)`
          let icon = item.querySelector("div")
          if (icon) {
            icon.style.transform = `translate3d(-40px, 0, 0)`
          }
        }, 20)
        break
      }
    }
  }

  useImperativeHandle<HTMLDivElement, any>(ref, () => ({
    startAnimation
  }))

  return (
    <div className={s.Container} ref={iconRef}>

    </div>
  )
})

export default React.memo(MusicNote)
