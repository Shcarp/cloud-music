import React, { forwardRef, MouseEventHandler, useImperativeHandle, useState } from "react";
import s from "./style.module.scss"
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";

export interface ConfirmProps {
  text: string
  cancelBtnText: string
  confirmBtnText: string
  handleConfirm: MouseEventHandler
  [name: string]: any
}

const Confirm = forwardRef<HTMLDivElement, ConfirmProps>((props, ref) => {
  const [show, setShow] = useState(false)
  const { text, cancelBtnText , confirmBtnText } = props
  const { handleConfirm } = props

  useImperativeHandle<HTMLDivElement, any>(ref, ()=>({
    show(){
      setShow(true)
    }
  }))
  let CSSCP =  {
    enterActive: s.confirm_fade_enter_active
  }
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames={CSSCP}
    >

      <div className={s.ConfirmWrapper} style={{display: show ? "block": "none"}} onClick={e => e.stopPropagation()}>
        <div>
          <div className={s.confirm_content}>
            <p className={s.text}>{text}</p>
            <div className={s.operate}>
              <div className={classNames(s.operate_btn, s.left)} onClick={()=>setShow(false)}> {cancelBtnText}</div>
              <div className={classNames(s.operate_btn)} onClick={(e)=>{setShow(false); handleConfirm(e);}}> {confirmBtnText} </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
})

export default React.memo(Confirm)
