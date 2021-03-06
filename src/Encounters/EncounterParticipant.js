
import React, {useContext} from 'react'

import GameContext from '../Games/GameContext'
import EncounterContext from './EncounterContext'
import PptAvatar from './PptAvatar'
import * as get from '../utilities/get'
import styles from './Encounter.module.scss'
import Stack from './Stack'
import PptName from './PptName'
import PptDoneBtn from './PptDoneBtn'
import PptDelayBtn from './PptDelayBtn'

export default function EncounterParticipant(props) {

	const {participant, mode, hasActed} = props
	const game = useContext(GameContext)
	const enc = useContext(EncounterContext)
	const faction = get.faction(enc, props.participant.factionId)

	// ----------------------------------------------------
	if (participant.type === 'player') {
		return (<PlayerCharacter g={game} f={faction} {...props} />)
	} else if (participant.type === 'npc') {
		return (<NonPlayerCharacter g={game} f={faction} {...props} />)
	} else if (participant.type === 'environment') {
		return (<EnvCharacter g={game} f={faction} {...props} />)
	} else {
			return (
			<GenericParticipant g={game} f={faction} {...props}>
				I don't know how to draw a participant of type {participant.type}.
			</GenericParticipant>
		)
	}
}
// ---------------------------------------------------------
// function GenericParticipant({g, p, f, hasActed, children}) {
//     console.log(hasActed)
function GenericParticipant(props) {
	const {participant, f, mode, hasActed, hasDelayed, children} = props
	const className = [styles.participant]
	if (f) {
		className.push(styles[f.colorScheme])
	}
	return (
		<div className={className.join(' ')}>
			<PptAvatar p={participant} />
			{children}
			{mode === 'up' ?
				<Stack className={[styles.Stack, styles.right].join(' ')}>
					<PptDoneBtn onClick={()=> hasActed()}/>
					<PptDelayBtn onClick={()=> hasDelayed()}/>
				</Stack>
			: null }
		</div>
	)
}
// ---------------------------------------------------------
function PlayerCharacter(props) {
	const {g, participant} = props
	const char = get.character(g, participant.characterId)
	const player = get.person(g, participant.playerId)
	return (
		<GenericParticipant {...props}>
			<PptName name={char.name} />
			played by {player.name}
		</GenericParticipant>
	)
}
// ---------------------------------------------------------
function NonPlayerCharacter(props) {
	const {g, participant} = props
	const char = get.character(g, participant.characterId)
	return (
		<GenericParticipant {...props}>
			<PptName name={char.name} />
			an NPC
		</GenericParticipant>
	)
}
// ---------------------------------------------------------
function EnvCharacter(props) {
	const {g, participant} = props
	return (
		<GenericParticipant {...props}>
			<PptName name={participant.feature.name} />
		</GenericParticipant>
	)
}

