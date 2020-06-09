
import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import styles from './Game.module.scss'

import GameContext from './GameContext'

export default function GameEncounter({e}) {

    const game = useContext(GameContext)

    return (
        <Link 
            to={['/game', game.gameId, e.encounterId].join('/')} 
            className={styles.gameEncounter}
        >
            <h1>{e.name} <small>{e.encounterId}</small></h1>
        </Link>
    )
}

