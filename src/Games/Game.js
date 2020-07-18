
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import GameLoader from '../utilities/GameLoader'
import GameContext from './GameContext'
import GameEncounter from './GameEncounter'
import Encounter from '../Encounters/Encounter'
import styles from './Game.module.scss'

import useBodyClass from '../utilities/useBodyClass'

export default function Game(props) {

    // ----------------------------------------------------
    const {gameId, encId} = useParams()
    const [game, setGame] = useState(null)
    const [small, setSmall] = useState(false)
    const [large, setLarge] = useState(false)
    const [size, setSize] = useState(false)
    // ----------------------------------------------------
    // load the game
    useEffect( ()=> {
        if (gameId) {
            GameLoader.getGame(gameId).then( (g) => setGame(g) )
        }
    }, [gameId])
    // ----------------------------------------------------
    // apply the font size switcher
    useBodyClass('small', small)
    useBodyClass('large', large)
    useEffect( ()=> {
        setSmall(size === 's')
        setLarge(size === 'l')
    }, [size, setSmall, setLarge])
    // ----------------------------------------------------
    if (!game) {
        return (
            <p>loading...</p>
        )
    } else {
        const encounters = Object.keys(game.encounters).map( (eId) => {
            const e = game.encounters[eId]
            return (<GameEncounter e={e} key={eId} />)
        })
        return (
            <GameContext.Provider value={game}>
                <div className={styles.game}>
                    <h1>{game.name} <small>{game.gameId}</small></h1>
                    <button onClick={()=> setSize('s')}>small</button>
                    <button onClick={()=> setSize('m')}>medium</button>
                    <button onClick={()=> setSize('l')}>large</button>
                    { encId ?
                        <Encounter encounterId={encId} />
                    :
                        <div className={styles.encounterList}>
                            {encounters}
                        </div>
                    }
                </div>
            </GameContext.Provider>
        )            
    }
    // ----------------------------------------------------
}

