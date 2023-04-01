import React from 'react'
import Navbar from '../../components/Navbar'
import * as styles from './styles.module.css'

export default function Nightly({path, pageContext, ...others}) {
    console.log(others)
    console.log(path)
    console.log(pageContext)
    const langKey = path.split("/")[1]
    const html = pageContext.html
    return (<div className={styles.container}>
        <Navbar lang={langKey} path={path}/>
        <div className={styles.md} dangerouslySetInnerHTML={{__html:html}}/>
    </div>)
}