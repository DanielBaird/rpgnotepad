
import React, {useState, useContext, useEffect} from 'react'

import styles from './Encounter.module.scss'

export default function PptDelayButton({onClick}) {
    return (
        <button className={styles.PptDelayBtn} onClick={onClick}>
            <span>Wait</span>
        </button>
    )
}