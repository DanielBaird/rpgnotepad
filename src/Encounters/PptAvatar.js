
import React, {useState, useContext, useEffect} from 'react'

import * as get from '../utilities/get'
import styles from './Encounter.module.scss'
import GameContext from '../Games/GameContext'
import EncounterContext from './EncounterContext'

export default function PptAvatar({p}) {

    const [initials, setInitials] = useState('--')
    const game = useContext(GameContext)
    const enc = useContext(EncounterContext)

    useEffect( ()=> {
        setInitials( get.initials(game, enc, p) )
    }, [game, p, enc])

    return (
        <div className={styles.PptAvatar}>
            <span className={styles.PptAvatarInitials}>{initials}</span>
        </div>
    )
}


