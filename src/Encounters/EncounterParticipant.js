
import React, {useContext} from 'react'

import EncounterContext from './EncounterContext'
import PptAvatar from './PptAvatar'
import get from '../utilities/get'
import styles from './Encounter.module.scss'

export default function EncounterParticipant({participant}) {

    const enc = useContext(EncounterContext)
    const faction = get.faction(enc, participant.factionId)

    // ----------------------------------------------------
    if (participant.type === 'player') {
        return (<PlayerCharacter p={participant} f={faction} />)
    } else if (participant.type === 'npc') {
        return (<NonPlayerCharacter p={participant} f={faction} />)
    } else if (participant.type === 'environment') {
        return (<EnvCharacter p={participant} f={faction} />)
    } else {
        return (
            <GenericParticipant p={participant} f={faction}>
                I don't know how to draw a participant of type {participant.type}.
            </GenericParticipant>
        )
    }
}
// ---------------------------------------------------------
function GenericParticipant({p, f, children}) {
    const className = [styles.participant]
    if (f) {
        className.push(styles[f.colorScheme])
    }
    return (
        <div className={className.join(' ')}>
            <PptAvatar p={p} />
            {children}
        </div>
    )
}
// ---------------------------------------------------------
function PlayerCharacter({p, f}) {
    return (
        <GenericParticipant p={p} f={f}>
            {p.character.name} played by {p.player.name}
        </GenericParticipant>
    )
}
// ---------------------------------------------------------
function NonPlayerCharacter({p, f}) {
    return (
        <GenericParticipant p={p} f={f}>
            {p.character.name}, an NPC
        </GenericParticipant>
    )
}
// ---------------------------------------------------------
function EnvCharacter({p, f}) {
    return (
        <GenericParticipant p={p} f={f}>
            {p.feature.name}
        </GenericParticipant>
    )
}

