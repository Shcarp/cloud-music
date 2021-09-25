import { RankTypes } from "../config";

export const getCount = (count: number) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}


export function debounce (func: Function, delay: number) {
  let last: number
  let timer: any
  return function (...args: any[]) {
     //@ts-ignore
    let context = this
    let now = + new Date()
    clearTimeout(timer)
    if (now - last < delay) {
      timer = setTimeout(() => {
        last = now
        func.apply(context, args)
      }, delay)
    }else {
      last = now
      func.apply(context, args)
    }
  }
}
export const filterIdx = (name: string ) => {
  for(let i in RankTypes) {
    if (RankTypes[i] === name) {
      return i
    }
  }
  // return ""
};

interface Tprops {
  name: string
  [name: string]: any
}

export function getName<T extends Tprops> (list: Array<T>): string {
  let str = "";
  list.map ((item: T, index: number) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};
