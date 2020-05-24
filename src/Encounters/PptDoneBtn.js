
import React, {useState, useContext, useEffect} from 'react'

import * as get from '../utilities/get'
import styles from './Encounter.module.scss'
import EncounterContext from './EncounterContext'

export default function PptDoneBtn({onClick}) {
    return (
        <button className={styles.PptDoneBtn} onClick={onClick}>
            <span>Done</span>
        </button>
    )
}