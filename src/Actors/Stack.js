
import React from 'react'

import styles from '../Encounters/Encounter.module.scss'

export default function Stack({children, middle, ...props}) {
    let cN = [styles.Stack]
    if (middle) {
        cN.push(styles.StackMiddle)
    }
    return (
        <div className={cN.join(' ')} {...props}>
            {children}
        </div>
    )
}