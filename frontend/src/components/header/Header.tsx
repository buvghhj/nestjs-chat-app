import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Branding from './Branding';
import MobileNavigation from './mobile/MobileNavigation';
import MobileBranding from './mobile/MobileBranding';
import Navigation from './Navigation';
import Setting from './Setting';
import { useReactiveVar } from '@apollo/client';
import { authenticatedVar } from '../../constants/authenticated';
import { IPage } from '../../interfaces/pages.interface';

const pages: IPage[] = [
    {
        title: 'Home',
        path: '/'
    }
]

const unauthenticatedPages: IPage[] = [

    {
        title: 'Login',
        path: '/login'
    },
    {
        title: 'Signup',
        path: '/signup'
    }

]

const Header = () => {

    const authenticated = useReactiveVar(authenticatedVar)

    return (

        <AppBar position="static">

            <Container maxWidth="xl">

                <Toolbar disableGutters>

                    <Branding />

                    <MobileNavigation pages={authenticated ? pages : unauthenticatedPages} />

                    <MobileBranding />

                    <Navigation pages={authenticated ? pages : unauthenticatedPages} />

                    {authenticated && <Setting />}

                </Toolbar>

            </Container>

        </AppBar>
    );
}
export default Header;
