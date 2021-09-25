import { useCallback, useEffect, useRef } from "react"

interface Debounce {
  fn?: Function,
  delay?: number,
  dep?: any
} 

const useDebounce = (props: Debounce) => {
  const { fn , delay, dep = [] } = props
  const { current } = useRef({fn, timer: null})

  useEffect(function(){
    current.fn = fn
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn])
  return useCallback(function f(...args: any[]){
    if (current.timer) {
      clearTimeout(current.timer)
    }
    current.timer = setTimeout(()=>{
      //@ts-ignore
      current.fn.call(this, ...args)
    }, delay) as any
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dep)
}

export default useDebounce
