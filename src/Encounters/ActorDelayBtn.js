
import React, {useState, useContext, useEffect} from 'react'
import EncounterContext from './EncounterContext'
import styles from './Encounter.module.scss'

export default function ActorDelayButton({a}) {
    const {enc, dispatch} = useContext(EncounterContext)
    return (
        <button className={styles.PptDelayBtn} onClick={()=>{
            dispatch({action: 'ActorCompleteTurn', payload: {actorId: a.actorId}})
        }}>
            <span>Wait</span>
        </button>
    )
}