
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
    const [factions, setFactions] = useState({})
    // ----------------------------------------------------
    // load the encounter
    useEffect( ()=> {
        const enc = game.encounters.find(
            (e) => e.encounterId === encounterId
        )
        setEncounter(enc || emptyEncounter)
    }, [game, encounterId])

    // load factions
    useEffect( ()=> {
        let facs = {}
        encounter.factions.forEach( (f)=> {
            facs[f.name] = f
        })
        setFactions(facs)
    }, [encounter])
    // ----------------------------------------------------
    const participants = encounter.participants.map( (p, index) => {
        return (
            <EncounterParticipant 
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
                <div className={styles.participantsList}>
                    {participants}
                </div>
                <pre>
                    { JSON.stringify(encounter, null, 4) }
                </pre>
            </div>
        </EncounterContext.Provider>
    )
}

