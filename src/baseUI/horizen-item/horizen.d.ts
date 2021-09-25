declare namespace TSHorizen {
  export interface TypeS {
    key: string,
    name: string
  }
  export interface HorizenList {
    key: string,
    name: string
  }
  export interface TSHorizenProps {
    list: Array<HorizenList> | Array<TypeS>
    oldVal: string
    title: string
    handleClick: ((string) => void)
  }
}