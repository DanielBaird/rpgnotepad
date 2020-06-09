
import React, {useState, useContext, useEffect} from 'react'

import * as get from '../utilities/get'
import styles from './Encounter.module.scss'
import EncounterContext from './EncounterContext'

export default function ActorName({name}) {
    console.log(name)
    const {pre, core, post} = get.nameParts(name)
    const enc = useContext(EncounterContext)

    return (
        <div className={styles.PptName}>
            <span className={styles.pre}>{pre}</span>
            <span className={styles.core}>{core}</span>
            <span className={styles.post}>{post}</span>
        </div>
    )
}