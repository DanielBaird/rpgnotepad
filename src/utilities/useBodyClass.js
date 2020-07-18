
import React, { useEffect } from 'react'

export default function useBodyClass(bodyClass, addRemove=true) {
    useEffect(()=> {
        if (bodyClass) {
            if (addRemove) {
                window.document.body.classList.add(bodyClass)
            } else {
                window.document.body.classList.remove(bodyClass)
            }
        }
    }, [bodyClass, addRemove])
}