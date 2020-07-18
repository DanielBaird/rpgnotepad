
import cloneDeep from 'lodash/cloneDeep'
import { useReducer } from 'react'
import { produce } from 'immer'

// --------------------------------------------------------
function determineActionOrder(actors) {
    return Object.keys(actors).sort( (a,b) => {
        if (actors[a].delayedBy !== !actors[b].delayedBy) {
            return actors[a].delayedBy - actors[b].delayedBy
        }
        return actors[b].actRank - actors[a].actRank
    })
}
// --------------------------------------------------------
function encReducer(state, action) {
    const {type, payload} = action
    console.log(action)
    switch (type) {
        // - - - - - - - - - - - - - - - - - - - - - - - -
        case 'endRound': return produce(state, (enc)=> {
            enc.round += 1
            enc.actionOrder = determineActionOrder(enc.actors)
        })
        // - - - - - - - - - - - - - - - - - - - - - - - -
        case 'actorCompleteTurn': return produce(state, (enc)=> {
            const {actorId} = payload
            let actor = enc.actors[actorId]
            actor.delayedBy = 0
            actor.readyRound += 1
        })
        // - - - - - - - - - - - - - - - - - - - - - - - -
        case 'actorDelayTurn': return produce(state, (enc)=> {
            enc.actors[payload.actorId].delayedBy += 1
            enc.actionOrder = determineActionOrder(enc.actors)
            console.log(enc.actionOrder)
        })
        // - - - - - - - - - - - - - - - - - - - - - - - -
        // - - - - - - - - - - - - - - - - - - - - - - - -
        default:
            console.log(`Don't know how to ${type}.`)
            return state
        // - - - - - - - - - - - - - - - - - - - - - - - -
    }    
}
// --------------------------------------------------------
function prepEncounter([campaign, encId]) {

    console.log(campaign)

    // initialising encounter from cpgn, given encId
    // start with a copy of the encounter
    let enc = cloneDeep(campaign.encounters[encId])
    // copy in the campaign's character list
    enc.characters = cloneDeep(campaign.characters)
    // copy in the campaign's player list
    enc.people = cloneDeep(campaign.people)
    // set the current round
    enc.round = 1
    // give actors their transient properties
    for (const aId in enc.actors) {
        enc.actors[aId].readyRound = 1
        enc.actors[aId].delayedBy = 0
    }
    // establish the action order
    enc.actionOrder = determineActionOrder(enc.actors)
    return (enc)
}
// --------------------------------------------------------
// this custom hook gets an encounter interaction point 
// ready, with initial state and reducer all set up.
export default function useEncounter(campaign, encounterId) {
    return useReducer(encReducer, [campaign, encounterId], prepEncounter)
}
// --------------------------------------------------------
// --------------------------------------------------------
// some utility funcs for getting specific data out of enc
// --------------------------------------------------------
export function faction(enc, factionId) {
    if (enc && enc.factions && enc.factions[factionId]) {
        return enc.factions[factionId]
    } else { return null }
}
// --------------------------------------------------------
export function person(enc, personId) {
    if (enc && enc.people && enc.people[personId]) {
        return enc.people[personId]
    } else { return null }
}
// --------------------------------------------------------
export function character(enc, charId) {
    if (enc && enc.characters && enc.characters[charId]) {
        return enc.characters[charId]
    } else { return null }
}
// --------------------------------------------------------
export function nameParts(name) {

    let parts = { pre: null, core: null, post: null }

    if (typeof name === 'string') {
        parts.core = name
    } else {
        if (name.length === 1) {
            parts.core = name[0]
        }
        if (name.length === 2) {
            parts.core = name[0]
            parts.post = name[1]
        }
        if (name.length > 2) {
            parts.pre = name[0]
            parts.core = name[1]
            parts.post = name[2]
        }
    }
    return parts
}
// --------------------------------------------------------
export function initials(enc, actor) {

    function caps(name, howMany=3) {
        const caps = [...name.matchAll(/[A-Z]/g)]
        if (caps.length < 1) {
            return name[0].toUpperCase()
        } else {
            return caps.slice(0, howMany).join('')
        }
    }

    function simpleInitials(a) {
        if (a.type === 'player' || a.type === 'npc') {
            const {core: name} = nameParts(character(enc, a.characterId).name)
            return caps(name)
        } else if (a.type === 'environment') {
            return caps(a.feature.name)
        } else {
            return '--'
        }
    }

    // generate naïve initials for this actor
    let answer = simpleInitials(actor)
    let answerPosition = 0
    let total = 0

    for (const aId in enc.actors) { 
        const a = enc.actors[aId]
        const inits = simpleInitials(a)
        if (inits === answer) {
            total += 1
        }
        if (a === actor) {
            answerPosition = total
        }
    }

    if (total > 1) {
        answer += '' + answerPosition
    }
    return answer
}
// --------------------------------------------------------
