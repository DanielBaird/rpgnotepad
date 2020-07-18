
import React, {useContext} from 'react'

import EncounterContext from '../Encounters/EncounterContext'
import ActorAvatar from './ActorAvatar'
import * as get from '../Encounters/EncounterState'
import styles from '../Encounters/Encounter.module.scss'
import Stack from './Stack'
import Text from './Text'
import ActorName from './ActorName'
import ActorDoneBtn from './ActorDoneBtn'
import ActorDelayBtn from './ActorDelayBtn'

import Bar from '../layout/Bar'

export default function Actor(props) {
    const {actor} = props
	// ----------------------------------------------------
	if (actor.type === 'player') {
		return (<ActorPC {...props} />)
	} else if (actor.type === 'npc') {
		return (<ActorNPC {...props} />)
	} else if (actor.type === 'environment') {
		return (<ActorEnv {...props} />)
	} else {
			return (
			<ActorGeneric {...props}>
				<Text>
					I don't know how to draw a participant of type {actor.type}.
				</Text>
			</ActorGeneric>
		)
	}
}
// ---------------------------------------------------------
function ActorGeneric(props) {
	const {actor, mode, children} = props
	const {enc} = useContext(EncounterContext)
	const className = [styles.actor]
	const f = get.faction(enc, actor.factionId)
	if (f) {
		className.push(styles[f.colorScheme])
	}

	let left = [
		<ActorAvatar a={actor} />
	]
	let right = [
		<Stack className={[styles.Stack, styles.right].join(' ')}>
			<ActorDoneBtn a={actor} />
			<ActorDelayBtn a={actor} />
		</Stack>
	]

	return (
	<>
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

		<Bar left={'asd'} right={right}>
		{children}
		</Bar>
	</>
	)
}
// ---------------------------------------------------------
function ActorPC(props) {
    const {actor} = props
    const {enc} = useContext(EncounterContext)
	const char = get.character(enc, actor.characterId)
    const player = get.person(enc, actor.playerId)
	return (
		<ActorGeneric {...props}>
			<ActorName name={char.name} />
			<Text>
				played by {player.name}
			</Text>
		</ActorGeneric>
	)
}
// ---------------------------------------------------------
function ActorNPC(props) {
	const {actor} = props
    const {enc} = useContext(EncounterContext)
	const char = get.character(enc, actor.characterId)
	return (
		<ActorGeneric {...props}>
			<ActorName name={char.name} />
			<Text>
				an NPC
			</Text>
		</ActorGeneric>
	)
}
// ---------------------------------------------------------
function ActorEnv(props) {
	const {actor} = props
	return (
		<ActorGeneric {...props}>
			<ActorName name={actor.feature.name} />
		</ActorGeneric>
	)
}

