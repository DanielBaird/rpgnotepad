
import React from 'react'

import * as get from '../Encounters/EncounterState'
import styles from '../Encounters/Encounter.module.scss'

export default function ActorName({name}) {
    const {pre, core, post} = get.nameParts(name)

    return (
        <div className={styles.ActorName}>
            <span className={styles.pre}>{pre}</span>
            <span className={styles.core}>{core}</span>
            <span className={styles.post}>{post}</span>
        </div>
    )
}