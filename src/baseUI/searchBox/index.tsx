import classNames from "classnames";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "../../api/utils";
import s from "./style.module.scss"

interface SearchBoxProps {
    newQuery: string
    handleQuery: Function
    back: Function
    [name: string]: any
}

const SearchBox: React.FC<SearchBoxProps> = (props) => {
    const input = document.createElement("input")
    const queryRef = useRef<HTMLInputElement>(input)
    const [ query, setQuery ] = useState("")
    const { newQuery } = props
    const { handleQuery } = props
    const displayStyle = query ? {display: "block"}: {display: "none"}

    useEffect(()=>{
        queryRef.current.focus()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value)
    }

    const handleQueryDebounce = useMemo(()=>{
        return debounce<Function>(handleQuery, 500)
    }, [handleQuery])

    useEffect(()=>{
        handleQueryDebounce(query)
    }, [query])

    useEffect(()=>{
        if (newQuery !== query) {
            setQuery(newQuery)
        }
    }, [newQuery])
    
    const clearQuery = () => {
        setQuery('')
        queryRef.current.focus()
    }

    return (
        <div className={s.SearchBoxWrapper}>
            <i className={classNames("iconfont", "icon-fanhuijiantou")} onClick={()=>props.back()}></i>
            <input 
            type="text" 
            ref={queryRef} 
            className={s.box} 
            placeholder="搜索歌手、歌曲、专辑" 
            value={query} 
            onChange={handleChange} />
            <i className={classNames("iconfont", "icon-shanchu")} onClick={clearQuery} style={displayStyle}></i>
        </div>
    )
}

export default React.memo(SearchBox)