
import React from 'react'
import styles from './Bar.module.scss'

export default function BarLabel({text='-'}) {

    return (
        <div className={styles.BarLabel}>
            <span className={styles.BarLabelText}>{text}</span>
        </div>
    )
}


