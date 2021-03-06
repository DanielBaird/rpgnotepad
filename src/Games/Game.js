
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import GameLoader from '../utilities/GameLoader'
import GameContext from './GameContext'
import GameEncounter from './GameEncounter'
import Encounter from '../Encounters/Encounter'
import styles from './Game.module.scss'

export default function Game(props) {

    // ----------------------------------------------------
    const {gameId, encId} = useParams()
    const loadingGame = GameLoader.getBlankGame({name: 'loading...'})
    const [game, setGame] = useState(loadingGame)
    const [encounterId, setEncounterId] = useState(null)
    // ----------------------------------------------------
    // load the game
    useEffect( ()=> {
        if (gameId) {
            GameLoader.getGame(gameId).then( (g) => setGame(g) )
        }
    }, [gameId])
    // ----------------------------------------------------
    const encounters = game.encounters.map( (e) => {
        return (<GameEncounter e={e} key={e.encounterId} />)
        // return (<p>{e.name}</p>)
    })
    // ----------------------------------------------------
    return (
        <GameContext.Provider value={game}>
            <div className={styles.game}>
                <h1>{game.name} <small>{game.gameId}</small></h1>
                { encId ?
                    <Encounter encounterId={encId} />
                :
                    <div className={styles.encounterList}>
                        {encounters}
                    </div>
                }
                {/* <pre style={{fontSize: "75%", lineHeight: "1.1"}}>
                    { JSON.stringify(game, null, 4) }
                </pre> */}
            </div>
        </GameContext.Provider>
    )
}

