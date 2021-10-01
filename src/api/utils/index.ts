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

export const getSongUrl = (id: number) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const isEmptyObject = (obj: any) => !obj || Object.keys(obj).length === 0;

export const formatPlayTime = (interval: number) => {
  interval = interval | 0
  const minute = (interval / 60) | 0
  const second = (interval % 60).toString().padStart(2, "0")
  return `${minute}:${second}`
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr: any) {
  let new_arr: Array<any> = []
  arr.forEach((item: any) => {
    new_arr.push(item)
  });
  for (let i = 0; i < new_arr.length; i++) {
    let j = getRandomInt(0, i);
    let t: any = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
}

export const findIndex = (song: any, list: Array<any>) => {
  return list.findIndex((item: any) => {
    return song.id === item.id
  })
}

let elementStyle = document.createElement("div").style;

export let vendor = (() => {
  //首先通过transition属性判断是何种浏览器
  let transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransfrom",
    ms: "msTransform",
    standard: "Transform"
  };
  for (var key in transformNames) {
    // @ts-ignore
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

