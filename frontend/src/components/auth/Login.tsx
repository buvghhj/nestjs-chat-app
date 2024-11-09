import Auth from './Auth'
import { Link } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material'
import { useLoginUser } from '../../hooks/useLoginUser'

const Login = () => {

    const { login, error } = useLoginUser()

    return (

        <>

            <Auth submitLabel='Login' onSubmit={(req) => login(req)} error={error} >

                <Link to={'/signup'} style={{ alignSelf: 'center' }}>

                    <MuiLink>

                        Signup

                    </MuiLink>

                </Link>

            </Auth>

        </>

    )

}

export default Login