import { AppBar, Toolbar, styled } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Component = styled(AppBar)`
    background:rgb(255, 255, 255);
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
        transition: background-color 0.3s, color 0.3s; /* Smooth transition */
    }

    & > a:hover {
        background-color:rgba(206, 194, 194, 0.9); /* Change this to your desired hover background color */
        color: #000; /* Change this to your desired hover text color */
    }
`;

const Header = () => {
    const navigate = useNavigate();

    const logout = async () => navigate('/account');
        
    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/account' onClick={logout}>LOGOUT</Link>
            </Container>
        </Component>
    );
}

export default Header;