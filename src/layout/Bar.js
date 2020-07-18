
import React from 'react'
import styles from './Bar.module.scss'

export default function Bar({left, right, className, children}) {

    let classes = [styles.Bar]

    // left might be an array of stuff
    let leftThing = <div className={styles.leftControls}>
        {left}
    </div>

    // but if left is a string, they want a Bar Label
    if (typeof left === 'string') {
        classes.push(styles.withLabel)
        leftThing = <div className={styles.BarLabel}>
            <span className={styles.BarLabelText}>
                {left}
            </span>
        </div>
    }

    return (
        <div className={classes.join(' ')}>
            {leftThing}
            <div className={styles.main}>
                {children}
            </div>
            <div className={styles.rightControls}>
                {right}
            </div>
        </div>
    )
}

