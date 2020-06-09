
// --------------------------------------------------------
// --------------------------------------------------------
export function faction(encounter, factionId) {
    let f = null
    if (encounter && encounter.factions && encounter.factions[factionId]) {
        return encounter.factions[factionId]
    } else { return null }
}
// --------------------------------------------------------
export function person(game, personId) {
    if (game && game.people && game.people[personId]) {
        return game.people[personId]
    } else { return null }
}
// --------------------------------------------------------
export function character(game, charId) {
    if (game && game.characters && game.characters[charId]) {
        return game.characters[charId]
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
export function initials(game, encounter, participant) {

    function caps(name, howMany=3) {
        const caps = [...name.matchAll(/[A-Z]/g)]
        if (caps.length < 1) {
            return name[0].toUpperCase()
        } else {
            return caps.slice(0, howMany).join('')
        }
    }

    function simpleInitials(p) {
        if (p.type === 'player' || p.type === 'npc') {
            const {core: name} = nameParts(character(game, p.characterId).name)
            return caps(name)
        } else if (p.type === 'environment') {
            return caps(p.feature.name)
        } else {
            return '--'
        }
    }

    // generate naïve initials for this actor
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

    if (total > 1) {
        answer += '' + answerPosition
    }
    return answer
}
// --------------------------------------------------------
