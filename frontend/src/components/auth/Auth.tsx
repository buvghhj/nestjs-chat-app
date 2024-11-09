import { Button, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetMe } from '../../hooks/useGetMe'
import { useNavigate } from 'react-router-dom'

interface AuthProps {
    submitLabel: string
    onSubmit: (credentials: { email: string, password: string }) => Promise<void>
    children: React.ReactNode
    extraFields?: React.ReactNode[]
    error?: string
}

const Auth = ({ submitLabel, onSubmit, children, error, extraFields }: AuthProps) => {

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const { data } = useGetMe()

    const navigate = useNavigate()

    useEffect(() => {

        if (data) {

            navigate('/')

        }

    }, [data, navigate])

    return (

        <Stack spacing={3} sx={{ height: '80vh', maxWidth: 360, margin: 'auto', justifyContent: 'center' }}>

            <TextField
                type='email'
                label='Email'
                variant='outlined'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error}
            />

            {extraFields}

            <TextField
                type='password'
                label='Password'
                variant='outlined'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error}
                helperText={error}
            />

            <Button variant='contained' onClick={() => onSubmit({ email, password })}>{submitLabel}</Button>

            {children}

        </Stack>

    )

}

export default Auth