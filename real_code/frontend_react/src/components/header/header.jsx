import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'
import './header.css';

const Header = ({ modalVisibility, setModalVisibility, setModalDisplay }) => {
    const displayModal = (event) => {
        if (!modalVisibility) {
            setModalVisibility(!modalVisibility)
            setModalDisplay(event.target.innerHTML)
        }
    }

    const logout = () => {
        Auth.logout()
    }

    return (
        <header>
            <nav>
                <Link to="/" id="header-title">GameHunter</Link>
                {Auth.loggedIn() ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={displayModal}>Login</button>
                        <button onClick={displayModal}>Signup</button>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header
