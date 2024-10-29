import { Link } from 'react-router-dom';
import './header.css';

const Header = ({ modalVisibility, setModalVisibility, setModalDisplay }) => {
    const displayModal = (event) => {
        if (!modalVisibility) {
            setModalVisibility(!modalVisibility)
            setModalDisplay(event.target.innerHTML)
        }
    }

    return (
        <header>
            <nav>
                <Link to="/" id="header-title">GameHunter</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={displayModal}>Login</button>
                <button onClick={displayModal}>Signup</button>
            </nav>
        </header>
    )
}

export default Header
