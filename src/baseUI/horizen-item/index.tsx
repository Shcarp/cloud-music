import React from "react";
import s from './style.module.scss'
import Scroll from "../../components/Scroll";
import classes from "classnames"

const Horizon: React.FC<TSHorizen.TSHorizenProps> = (props) => {
  const { list, oldVal, title } = props
  const { handleClick } = props

  return (
    <Scroll direction="horizental">
      <div style={{width:"max-content"}}>
        <div className={s.List}>
          <span>{title}</span>
          {
            list.map((item)=> {
              return (
                <span 
                  key={item.key}
                  className={classes(s.ListItem, `${oldVal === item.key ? s.selected: ""}`)}
                  onClick={() => handleClick(item.key)}
                >
                  {item.name}
                </span>
              )
            })
          }
        </div>
      </div>
    </Scroll>
  )
}

Horizon.defaultProps = {
  list: [],
  oldVal: '',
  title: "",
};

export default React.memo(Horizon)