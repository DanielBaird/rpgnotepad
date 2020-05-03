
import React, {useState, useContext, useEffect} from 'react'

import get from '../utilities/get'
import styles from './Encounter.module.scss'
import EncounterContext from './EncounterContext'

export default function PptAvatar({p}) {

    const [initials, setInitials] = useState('--')
    const enc = useContext(EncounterContext)

    useEffect( ()=> {
        setInitials( get.initials(enc, p) )
        console.log('set initials to ', get.initials(enc, p))
    }, [p, enc])

    return (
        <div className={styles.PptAvatar}>
            <span className={styles.PptAvatarInitials}>{initials}</span>
        </div>
    )
}


