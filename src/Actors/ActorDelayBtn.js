
import React, {useContext} from 'react'
import EncounterContext from '../Encounters/EncounterContext'
import styles from '../Encounters/Encounter.module.scss'

export default function ActorDelayButton({a}) {
    const {dispatch} = useContext(EncounterContext)
    return (
        <button className={styles.ActorDelayBtn} onClick={()=>{
            dispatch({type: 'actorDelayTurn', payload: {actorId: a.actorId}})
        }}>
            <span>Wait</span>
        </button>
    )
}