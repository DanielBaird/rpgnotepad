
import React, { useEffect, useState, useContext } from 'react'

import useEncounter from './EncounterState'

import EncounterContext from './EncounterContext'
import Actor from '../Actors/Actor'
import styles from './Encounter.module.scss'
import GameContext from '../Games/GameContext'

export default function Encounter({encounterId}) {
    // ----------------------------------------------------
    // get the campaign
    const campaign = useContext(GameContext)
    // get this encounter and its dispatcher
    const [enc, dispatch] = useEncounter(campaign, encounterId)

    // ordered lists of actors
    const [sortedActors, setSortedActors] = useState([])
    const [readyActors, setReadyActors] = useState([])
    const [doneActors, setDoneActors] = useState([])
    // ----------------------------------------------------
    // make an actor list sorted by their order of action
    useEffect( ()=> {
        let sorted = enc.actionOrder.map( (aId)=> enc.actors[aId] )
        setSortedActors(sorted)
    }, [enc, setSortedActors])
    // ----------------------------------------------------
    // split actor list into ready and had-their-turn
    useEffect( ()=> {
        let ready = sortedActors.filter((a) => a.readyRound <= enc.round )
        let done = sortedActors.filter((a) => a.readyRound > enc.round )
        setReadyActors(ready)
        setDoneActors(done)
        if (done.length > 0 && ready.length === 0) {
            dispatch({type:'endRound'})
        }
    }, [enc, dispatch, sortedActors, setReadyActors, setDoneActors])
    // ----------------------------------------------------
    return (
        <EncounterContext.Provider value={{enc, dispatch}}>
            <div className={styles.encounter}>
                <h1>{enc.name} <small>{enc.encounterId}</small></h1>
                <RoundMarker current />
                <div className={styles.participantsList}>
                    { readyActors.map( (a, index)=>
                        <Actor
                            mode={index === 0 ? 'up' : 'ready'}
                            actor={a}
                            key={index}
                        />
                    )}
                </div>
                { doneActors.length > 0 &&
                    <>
                        <RoundMarker next />
                        <div className={styles.participantsList}>
                            { doneActors.map( (a, index)=>
                                <Actor
                                    mode="done"
                                    actor={a}
                                    key={index}
                                />
                            )}
                        </div>
                    </>
                }
            </div>
        </EncounterContext.Provider>
    )
}
// ========================================================
function RoundMarker({current, next}) {
    const {enc} = useContext(EncounterContext)
    return (
        <div className={styles.RoundMarker + ' ' + (next ? styles.next : styles.current)}>
            Round {enc.round + (next ? 1 : 0)}
        </div>
    )
}
