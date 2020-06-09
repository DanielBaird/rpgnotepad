
import React from 'react'

import * as get from './EncounterState'
import styles from './Encounter.module.scss'

export default function ActorName({name}) {
    const {pre, core, post} = get.nameParts(name)

    return (
        <div className={styles.PptName}>
            <span className={styles.pre}>{pre}</span>
            <span className={styles.core}>{core}</span>
            <span className={styles.post}>{post}</span>
        </div>
    )
}