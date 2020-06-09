
import React, { useEffect, useState, useContext } from 'react'

import useEncounter from './EncounterState'

import EncounterContext from './EncounterContext'
import EncActor from './EncActor'
import styles from './Encounter.module.scss'

const emptyEncounter = {
    "encounterId": "e0000",
    "name": "loading...",
    "participants": [],
    "factions": []
}

export default function Encounter({encounterId}) {
    // ----------------------------------------------------
    // get this encounter and its dispatcher
    const [enc, dispatch] = useEncounter(encounterId)
    // ----------------------------------------------------
    // make a list of ready and done actors
    const [readyActors, setReadyActors] = useState([])
    const [doneActors, setDoneActors] = useState([])
    useEffect( ()=> {
        let ready = []
        let done = []
        for (const aId in enc.actors) {
            const a = enc.actors[aId]
            if (a.readyRound <= enc.round) {
                ready.push(a)
            } else {
                done.push(a)
            }
        }
        ready.sort((a,b)=> b.actRank - a.actRank )
        done.sort((a,b)=> b.actRank - a.actRank )
        setReadyActors(ready)
        setDoneActors(done)
        if (ready.length === 0) {
            dispatch({type:'endRound'})
        }
    }, [enc, setReadyActors, setDoneActors])
    // ----------------------------------------------------
    return (enc && dispatch &&
        <EncounterContext.Provider value={{enc, dispatch}}>
            <div className={styles.encounter}>
                <h1>{enc.name} <small>{enc.encounterId}</small></h1>
                <RoundMarker current />
                <div className={styles.participantsList}>
                    { readyActors.map( (a, index)=>
                        <EncActor
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
                                <EncActor
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
    || null)
}
// ========================================================
function RoundMarker({current, next}) {
    const {enc} = useContext(EncounterContext)
    return (
        <div className={styles.RoundMarker + (next ? ' ' + styles.next : '')}>
            {enc.round + (next ? 1 : 0)}
        </div>
    )
}
