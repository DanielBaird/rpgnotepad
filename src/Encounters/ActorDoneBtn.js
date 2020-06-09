import React, {useState, useContext, useEffect} from 'react'
import EncounterContext from './EncounterContext'
import styles from './Encounter.module.scss'

export default function PptDoneBtn({a}) {
    console.log(useContext(EncounterContext))
    const {enc, dispatch} = useContext(EncounterContext)
    return (
        <button className={styles.PptDoneBtn} onClick={()=>{
            dispatch({type: 'actorCompleteTurn', payload: {actorId: a.actorId}})
        }}>
            <span>Done</span>
        </button>
    )
}