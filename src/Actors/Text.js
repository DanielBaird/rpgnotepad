
import React from 'react'
import Stack from './Stack'

export default function Text({children, ...props}) {
    return (
        <Stack middle {...props}>
            {children}
        </Stack>
    )
}