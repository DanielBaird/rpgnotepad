import React, {useContext} from 'react'
import EncounterContext from '../Encounters/EncounterContext'
import styles from '../Encounters/Encounter.module.scss'

export default function ActorDoneBtn({a}) {
    const {dispatch} = useContext(EncounterContext)
    return (
        <button className={styles.ActorDoneBtn} onClick={()=>{
            dispatch({type: 'actorCompleteTurn', payload: {actorId: a.actorId}})
        }}>
            <span>Done</span>
        </button>
    )
}