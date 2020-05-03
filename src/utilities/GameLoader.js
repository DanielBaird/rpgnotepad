
import axios from 'axios'
import deepmerge from 'deepmerge'

// ----------------------------------------------------
function getBlankGame(overrides = {}) {
    const blankGame = {
        "gameId": "g0000",
        "owner": { "personId": "p0000", "name": "Game Owner" },
        "encounters": []
        }
    return deepmerge(blankGame, overrides)
}
// ----------------------------------------------------
async function getGame(id) {

    // fake delay
    await new Promise( (r)=> setTimeout(()=> r(), 2000) )

    const game = await axios.get('/game-' + id + '.json')
        .then( (r) => r.data )

    return game
}
// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------
export default {
    getBlankGame,
    getGame
}
