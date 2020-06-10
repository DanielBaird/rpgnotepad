
import React, {useState, useContext, useEffect} from 'react'

import * as get from '../Encounters/EncounterState'
import styles from '../Encounters/Encounter.module.scss'
import EncounterContext from '../Encounters/EncounterContext'

export default function ActorAvatar({a}) {

    const [initials, setInitials] = useState('--')
    const {enc} = useContext(EncounterContext)

    useEffect( ()=> {
        setInitials( get.initials(enc, a) )
    }, [enc, a])

    return (
        <div className={styles.ActorAvatar}>
            <span className={styles.ActorAvatarInitials}>{initials}</span>
        </div>
    )
}


