
import React, {useContext} from 'react'
import EncounterContext from './EncounterContext'
import styles from './Encounter.module.scss'

export default function ActorDelayButton({a}) {
    const {dispatch} = useContext(EncounterContext)
    return (
        <button className={styles.PptDelayBtn} onClick={()=>{
            dispatch({action: 'actorCompleteTurn', payload: {actorId: a.actorId}})
        }}>
            <span>Wait</span>
        </button>
    )
}