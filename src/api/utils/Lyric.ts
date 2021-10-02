const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g

const STATE_PAUSE= 0
const STATE_PLAYING  = 1

export interface LinesProps {
  time: number
  txt: string
}

export interface HandleProps {
  txt: string
  lineNum:number
  [name: string]: any
}

export default class Lyric {
  lrc: string
  lines: Array<LinesProps>
  handler: (arg0: HandleProps)=>void
  state: number
  curLineIndex: number
  startStamp: number
  timer: any
  constructor(lrc: string, handler= (arg0: HandleProps)=>{}) {
    this.lrc = lrc
    this.lines = []
    this.handler = handler
    this.state = STATE_PAUSE
    this.curLineIndex = 0
    this.startStamp = 0

    this.initLines()
  }
  // 歌词解析
  private initLines() {
    const lines = this.lrc.split("\n")
    lines.forEach((line: string, index: number)=>{
      let result = timeExp.exec(line) as Array<string>
      const txt = line.replace(timeExp, "").trim()
      if (txt && result) {
        if (result[3].length === 3) {
          result[3] = (parseInt(result[3] as string) / 10).toString()
        }
        this.lines.push({
          time: parseInt(result[1]) * 60 *1000 + parseInt(result[2]) * 1000 + (parseInt(result[3]) || 0) * 10,
          txt: txt
        })
      }
    })
    this.lines.sort((a, b) =>{
      return a.time - b.time
    })
  }
  // 播放
  public play (offset = 0, isSeek = false) {
    if (!this.lines.length) {
      return;
    }
    this.state = STATE_PLAYING
    // 找到当前
    this.curLineIndex = this.findcurLineIndex(offset)
    this.callHandler(this.curLineIndex - 1)

    // 根据时间进度判断歌曲开始的时间戳
    this.startStamp = + new Date() - offset
    if(this.curLineIndex < this.lines.length) {
      clearTimeout(this.timer)
      this.playRest(isSeek)
    }
  }
  private findcurLineIndex(offset: number) {
    let res =  this.lines.findIndex((line) => {
      return offset <= line.time
    })
    if (res !== -1) {
      return res
    }
    return this.lines.length -1
  }
  private callHandler (i: number) {
    if (i < 0) {
      return
    }
    this.handler({
      txt: this.lines[i].txt,
      lineNum: i
    })
  }
  // isSeek 表示用户是否手动调整位置
  private playRest(isSeek = false) {
    // 表示调整的行数
    let line = this.lines[this.curLineIndex]
    let delay
    if (isSeek) {
      // 根据时间进行偏移
      delay = line.time - (+ new Date() - this.startStamp)
    }else{
      // 拿到上一行的时间
      let preTime = this.lines[this.curLineIndex -1 ] ? this.lines[this.curLineIndex - 1].time : 0
      delay = line.time - preTime
    }
    this.timer = setTimeout(()=>{
      this.callHandler(this.curLineIndex++)
      if (this.curLineIndex < this.lines.length && this.state === STATE_PLAYING) {
        this.playRest()
      }
    }, delay)
  }
  public togglePlay(offset: number) {
    if (this.state === STATE_PLAYING) {
      this.stop()
    }else {
      this.state = STATE_PLAYING
      this.play(offset, true)
    }
  }
  public stop() {
    this.state = STATE_PAUSE
    clearTimeout(this.timer)
  }
  // 手动调整
  public seek(offset: number) {
    this.play(offset, true)
  }
} 