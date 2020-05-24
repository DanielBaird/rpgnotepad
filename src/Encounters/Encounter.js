
import React, { useEffect, useState, useContext } from 'react'

import GameContext from '../Games/GameContext'
import EncounterContext from './EncounterContext'
import EncounterParticipant from './EncounterParticipant'
import styles from './Encounter.module.scss'

const emptyEncounter = {
    "encounterId": "e0000",
    "name": "loading...",
    "participants": [],
    "factions": []
}

export default function Encounter({encounterId}) {

    // ----------------------------------------------------
    const game = useContext(GameContext)
    const [encounter, setEncounter] = useState(emptyEncounter)
    const [orderBy, setOrderBy] = useState('actRank')
    const [ordered, setOrdered] = useState([])
    const [round, setRound] = useState(1)
    // ----------------------------------------------------
    // load the encounter
    useEffect( ()=> {
        const enc = game.encounters.find(
            (e) => e.encounterId === encounterId
        )
        setEncounter(enc || emptyEncounter)
    }, [game, encounterId])
    // ----------------------------------------------------
    // sort the participants
    useEffect( ()=> {
        setOrdered(encounter.participants.sort( (p1, p2) => {
            return (p1.actRank - p2.actRank)
        }))
    }, [orderBy, encounter])
    // ----------------------------------------------------
    // record that someone has acted
    function hasActed(participant) {
        setOrdered(
            ordered.map( (p) => {
                if (p === participant) {
                    p.round = p.round || 0
                    p.round += 1
                }
                return p
            })
        )
    }
    // ----------------------------------------------------
    // divide into ready and acted
    const ready = ordered.filter( 
        (p) => (!p.round || p.round < round)
    ).map( (p, index) => {
        return (
            <EncounterParticipant 
                hasActed={()=> hasActed(p) }
                mode={index === 0 ? 'up' : 'ready'}
                participant={p}
                key={index}
            />
        )
    })
    if (ordered.length > 0 && ready.length < 1) {
        setRound(round + 1)
    }
    console.log(ready)
    // ----------------------------------------------------
    // divide into ready and acted
    const acted = ordered.filter( 
        (p) => (p.round && p.round >= round)
    ).map( (p, index) => {
        return (
            <EncounterParticipant 
                hasActed={()=> hasActed(p) }
                state='acted'
                participant={p} 
                key={index}
            />
        )
    })
    // ----------------------------------------------------
    return (
        <EncounterContext.Provider value={encounter}>
            <div className={styles.encounter}>
                <h1>{encounter.name} <small>{encounter.encounterId}</small></h1>
                <RoundMarker current round={round} />
                <div className={styles.participantsList}>
                    {ready}
                </div>
                { acted.length > 0 ?
                    <>
                        <RoundMarker future round={round + 1} />
                        <div className={styles.participantsList}>
                            {acted}
                        </div>
                    </>
                : null }
            </div>
        </EncounterContext.Provider>
    )
}
// ========================================================
function RoundMarker({current, future, round}) {
    return (
        <div className={styles.RoundMarker + (future ? ' ' + styles.future : '')}>
            {round}
        </div>
    )
}
