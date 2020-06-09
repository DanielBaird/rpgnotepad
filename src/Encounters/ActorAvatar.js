
import React, {useState, useContext, useEffect} from 'react'

import * as get from './EncounterState'
import styles from './Encounter.module.scss'
import GameContext from '../Games/GameContext'
import EncounterContext from './EncounterContext'

export default function ActorAvatar({a}) {

    const [initials, setInitials] = useState('--')
    const {enc} = useContext(EncounterContext)

    useEffect( ()=> {
        setInitials( get.initials(enc, a) )
    }, [enc, a])

    return (
        <div className={styles.PptAvatar}>
            <span className={styles.PptAvatarInitials}>{initials}</span>
        </div>
    )
}


