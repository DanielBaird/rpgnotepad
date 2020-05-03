
// --------------------------------------------------------

import { findAllByTitle } from "@testing-library/react"

// --------------------------------------------------------
function faction(encounter, factionId) {
    let f = null
    if (encounter && encounter.factions) {
        f = encounter.factions.find( (f)=> f.factionId === factionId )
    }
    return f
}
// --------------------------------------------------------
function initials(encounter, participant) {

    function caps(name, howMany=3) {
        const caps = [...name.matchAll(/[A-Z]/g)]
        if (caps.length < 1) {
            return name[0].toUpperCase()
        } else {
            return caps.slice(0, howMany)
        }
    }

    function simpleInitials(p) {
        if (p.type === 'player' || p.type === 'npc') {
            return caps(p.character.name)
        } else if (p.type === 'environment') {
            return caps(p.feature.name)
        } else {
            return '--'
        }
    }

    // generate naïve initials for this ppt
    let answer = simpleInitials(participant)
    let answerPosition = 0
    let total = 0

    encounter.participants.forEach( (p)=> {
        const inits = simpleInitials(p)
        if (inits === answer) {
            total += 1
        }
        if (p === participant) {
            answerPosition = total
        }
    })

    console.log(answerPosition, total)

    if (total > 1) {
        answer += '' + answerPosition
    }
    return answer
}
// --------------------------------------------------------
export default ({
    faction,
    initials
})