import React from 'react'
import { navigate } from 'gatsby'
import Logo from "../../images/logo"
import * as styles from "./styles.module.css"

const KeyToLang = {
    cn:"中文",
    en:"English"
}
const NextLang = {
    cn:"en",
    en:"cn"
}

export default function Navbar({lang, path}){
    const path_arr = path.split("/")
    const cur_lang = path_arr[1]
    path_arr[1] = NextLang[cur_lang]
    const new_path = path_arr.join("/")
    const new_lang = KeyToLang[NextLang[lang]]
    // console.log("lang")
    // console.log(lang)
    // console.log("path")
    // console.log(path)
    // console.log("new_lang")
    // console.log(new_lang)
    // console.log("new_path")
    // console.log(new_path)
    // console.log(Logo)
    return (
    <div className={styles.container}>
        <div className={styles.logo} onClick={()=>{
            navigate("/"+cur_lang)
        }}>
            <Logo/>
        </div>
        <div className={styles.lang} onClick={()=>{
            navigate(new_path)
        }}>{new_lang}</div>
    </div>)
}