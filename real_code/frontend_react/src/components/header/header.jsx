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
                    <Link to="/" id="header-title">GameHunter</Link>

                    <div className="dropdown">
                        <div className='dropdown-header'>
                            <span id='normal'>Create+</span>
                            <span id='hover'>Create-</span>
                        </div>

                        <div className="dropdown-content">
                            <Link>Event</Link>
                            <div className="divider"></div>
                            <Link>Tourney</Link>
                        </div>
                    </div>
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
