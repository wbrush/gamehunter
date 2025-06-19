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
                <div className="logo">
                    <img src='/icons/volleyball-solid.svg' id='logo' />
                    <h4>GameHunter</h4>
                </div>

                <div className="links">
                    <Link to="/">Home</Link>

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
                </div>
            </nav>
        </header>
    )
}

export default Header
