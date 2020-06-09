
import cloneDeep from 'lodash/cloneDeep'
import { useReducer } from 'react'
import { produce } from 'immer'

// --------------------------------------------------------
const cpgn = {
    "gameId": "g1234",
    "name": "Super Cool Game",
    "ownerId": "p2345",
    "people": {
        "p2345": { "name": "Daniel Baird" },
        "p3456": { "name": "Elora Baird" }
    },
    "characters": {
        "c5678": {
            "name": ["Lady", "Elorabelle", "the Graceful"],
            "playerId": "p3456",
            "HP": 20
        },
        "c6789": {
            "name": ["Speedy Sam"],
            "playerId": "p3456",
            "HP": 15
        },
        "c7766": {
            "name": ["Krosmonoff", "the Black"],
            "playerId": "p2345",
            "HP": 40
        }
    },
    "encounters": {
        "e9876": {
            "encounterId": "e9876",
            "name": "Test Encounter",
            "factions": {
                "f123": {
                    "name": "The Erstwhile Players",
                    "colorScheme": "green"
                },
                "f234": {
                    "name": "Roaming Killers of Dusk",
                    "colorScheme": "red"
                },
                "f345": {
                    "name": "Environment",
                    "colorScheme": "brown"
                }
            },
            "actors": {
                "a4321": {
                    "actorId": "a4321",
                    "type": "player",
                    "playerId": "p3456",
                    "characterId": "c5678",
                    "factionId": "f123",
                    "actRank": 8,
                    "readyRound": 1
                },
                "a3214": {
                    "actorId": "a3214",
                    "type": "player",
                    "playerId": "p3456",
                    "characterId": "c6789",
                    "factionId": "f123",
                    "actRank": 3,
                    "readyRound": 1
                },
                "a2143": {
                    "actorId": "a2143",
                    "type": "npc",
                    "characterId": "c7766",
                    "factionId": "f234",
                    "actRank": 3,
                    "readyRound": 1
                },
                "a1432": {
                    "actorId": "a1432",
                    "type": "environment",
                    "feature": {
                        "name": "Earthquake"
                    },
                    "factionId": "f345",
                    "actRank": 3,
                    "readyRound": 1
                }
            }
        }
    }
}
// --------------------------------------------------------
function encReducer(state, action) {
    const {type, payload} = action
    switch (type) {
        // - - - - - - - - - - - - - - - - - - - - - - - -
        case 'endRound': return produce(state, (enc)=> {
            enc.round += 1
        })
        // - - - - - - - - - - - - - - - - - - - - - - - -
        case 'actorCompleteTurn': return produce(state, (enc)=> {
            const {actorId} = payload
            let actor = enc.actors[actorId]
            if (!actor.readyRound) {
                actor.readyRound = 1
            }
            actor.readyRound += 1
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
function prepEncounter(encId) {
    // initialising encounter from cpgn, given encId
    // start with a copy of the encounter
    let enc = cloneDeep(cpgn.encounters[encId])
    // copy in the campaign's character list
    enc.characters = cloneDeep(cpgn.characters)
    // copy in the campaign's player list
    enc.people = cloneDeep(cpgn.people)
    // set the current round
    enc.round = 1
    return (enc)
}
// --------------------------------------------------------
// this custom hook gets an encounter interaction point 
// ready, with initial state and reducer all set up.
export default function useEncounter(encounterId) {
    return useReducer(encReducer, encounterId, prepEncounter)
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
