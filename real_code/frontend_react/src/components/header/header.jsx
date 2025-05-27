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
                <div className="links">
                    <Link to="/" id="header-title">Home</Link>

                    <Link to="/create">Create</Link>
                </div>

                <div className="user">
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
