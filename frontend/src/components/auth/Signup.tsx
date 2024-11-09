import Auth from './Auth'
import { Link } from 'react-router-dom'
import { Link as MuiLink, TextField } from '@mui/material'
import { useRegisterUser } from '../../hooks/useRegisterUser'
import { useState } from 'react'
import { extractErrorMessage } from '../../utils/errors'
import { useLoginUser } from '../../hooks/useLoginUser'
import { UNKNOWN_ERROR_MESSAGE } from '../../constants/errors'

const Signup = () => {

    const [registerUser] = useRegisterUser()

    const [username, setUsername] = useState("")

    const [error, setError] = useState("")

    const { login } = useLoginUser()

    const handleSignup = async ({ email, password }: { email: string, password: string }) => {

        try {

            const user = await registerUser({

                variables: {

                    registerInput: {

                        email,

                        username,

                        password

                    }

                }

            })

            await login(({ email, password }))

            setError("")

        } catch (err) {

            const errorMessage = extractErrorMessage(err)

            console.log('errorMessageCPN', err);

            if (errorMessage) {

                setError(errorMessage)

                return

            }

            setError(UNKNOWN_ERROR_MESSAGE)

        }

    }

    return (

        <>

            <Auth
                submitLabel='Signup'
                onSubmit={(formData) => handleSignup(formData)}
                error={error}
                extraFields={[
                    <TextField
                        type='text'
                        label='Username'
                        variant='outlined'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={!!error}
                        helperText={error}
                    />
                ]}
            >

                <Link to={'/login'} style={{ alignSelf: 'center' }}>

                    <MuiLink>

                        Login

                    </MuiLink>

                </Link>

            </Auth>

        </>

    )

}

export default Signup