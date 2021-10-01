import React, { forwardRef, useState, useImperativeHandle } from "react";
import s from "./style.module.scss"
import { CSSTransition } from 'react-transition-group';

interface ToastProps {
  text: string
  [name: string]: any
}

const Toast: React.FC<ToastProps> = forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const [show, setShow] = useState<boolean>(false);
  const [timer, setTimer] = useState<any>();
  const {text} = props;

  useImperativeHandle<HTMLDivElement, any>(ref, () =>(
    {
      show() {
        if(timer) clearTimeout(timer);
        setShow(true);
        setTimer(setTimeout(() => {
          setShow(false)
        }, 3000));
      }
    }
  ))

  const tran = {
    enter: s.drop_enter,
    enterActive: s.drop_enter_active,
    exitActive: s.drop_exit_active,
  }
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames={tran}
      unmountOnExit
    >
      <div className={s.ToastWrapper}>
        <div className={s.text}>{text}</div>
      </div>
    </CSSTransition>
  )
})

export default React.memo(Toast)
