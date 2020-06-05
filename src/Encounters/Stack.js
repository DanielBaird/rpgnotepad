
import React from 'react'

import styles from './Encounter.module.scss'

export default function Stack({children, ...props}) {
    return (
        <div className={styles.Stack} {...props}>
            {children}
        </div>
    )
}