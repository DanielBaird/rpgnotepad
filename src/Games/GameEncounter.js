
import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import styles from './Game.module.scss'

export default function GameEncounter({e}) {
    const loc = useLocation()
    return (
        <Link 
            to={loc.pathname + '/' + e.encounterId} 
            className={styles.gameEncounter}
        >
            <h1>{e.name} <small>{e.encounterId}</small></h1>
        </Link>
    )
}

