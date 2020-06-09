
import React, {useContext} from 'react'

import GameContext from '../Games/GameContext'
import EncounterContext from './EncounterContext'
import ActorAvatar from './ActorAvatar'
import * as get from './EncounterState'
import styles from './Encounter.module.scss'
import Stack from './Stack'
import ActorName from './ActorName'
import ActorDoneBtn from './ActorDoneBtn'
import ActorDelayBtn from './ActorDelayBtn'

export default function EncActor(props) {
    const {actor} = props
	const {enc, dispatch} = useContext(EncounterContext)
	// ----------------------------------------------------
	if (actor.type === 'player') {
		return (<ActorPC {...props} />)
	} else if (actor.type === 'npc') {
		return (<NonPlayerCharacter {...props} />)
	} else if (actor.type === 'environment') {
		return (<EnvCharacter {...props} />)
	} else {
			return (
			<ActorGeneric {...props}>
				I don't know how to draw a participant of type {actor.type}.
			</ActorGeneric>
		)
	}
}
// ---------------------------------------------------------
function ActorGeneric(props) {
	const {actor, f, mode, hasActed, hasDelayed, children} = props
	const className = [styles.participant]
	if (f) {
		className.push(styles[f.colorScheme])
	}
	return (
		<div className={className.join(' ')}>
			<ActorAvatar a={actor} />
			{children}
			{mode === 'up' ?
				<Stack className={[styles.Stack, styles.right].join(' ')}>
					<ActorDoneBtn a={actor} />
					<ActorDelayBtn a={actor} />
				</Stack>
			: null }
		</div>
	)
}
// ---------------------------------------------------------
function ActorPC(props) {
    const {actor} = props
    const {enc, dispatch} = useContext(EncounterContext)
	const char = get.character(enc, actor.characterId)
    const player = get.person(enc, actor.playerId)
	return (
		<ActorGeneric {...props}>
			<ActorName name={char.name} />
			played by {player.name}
		</ActorGeneric>
	)
}
// ---------------------------------------------------------
function NonPlayerCharacter(props) {
	const {actor} = props
    const {enc, dispatch} = useContext(EncounterContext)
	const char = get.character(enc, actor.characterId)
	return (
		<ActorGeneric {...props}>
			<ActorName name={char.name} />
			an NPC
		</ActorGeneric>
	)
}
// ---------------------------------------------------------
function EnvCharacter(props) {
	const {actor} = props
	return (
		<ActorGeneric {...props}>
			<ActorName name={actor.feature.name} />
		</ActorGeneric>
	)
}

