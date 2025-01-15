import { useState, useEffect } from 'react'

import Header from '../components/header/header'
import Modal from '../components/userModal/modal'
import EventList from '../components/eventList/list'
import ProfileContainer from '../components/profileContainer/profileContainer';

import Auth from '../utils/auth'
import { filterUserEvents, getFetchRequest } from '../utils/functions';

import '../pagescss/profile.css'

const Profile = () => {
    const [modalVisibility, setModalVisibility ] = useState(true);
    const [modalDisplay, setModalDisplay] = useState('Login');

    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [pastEvents, setPastEvents] = useState([])

    const [userData, setUserData] = useState()
    const [disableEmail, setDisableEmail] = useState('disabled')
    const [tempEmail, setTempEmail] = useState('')
    const [tempPassword, setTempPassword] = useState('')

    useEffect(() => {
        const user = Auth.getUser()?.user

        fetchRequest(user)

        setUserData(user)
        setTempEmail(user.email)
        setTempPassword(user.password)
    }, [modalVisibility])

    const fetchRequest = async (user) => {
        const url = 'https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/user/' + user.id
        const response = await getFetchRequest(url)

        let filtered
        console.log(user)
        if (response.name != 'error') {
            filtered = filterUserEvents(response)

            setUpcomingEvents(filtered.upcoming)
            setPastEvents(filtered.past)
        }

    }

    const handleChange = (e) => {
        const {name, value} = e.target

        if (name === 'email') {
            setTempEmail(value)
        } else {
            setTempPassword(value)
        }
    }

    const handleSubmit = (e) => {
        if (e.target.id === 'email') {
            //! add query to update email
            setDisableEmail(!disableEmail)
        } else if (e.target.id === 'password'){
            //! add query to update password
            setTempPassword('')
        }
    }

    return (
        <>
            <Header />

            <div className='profile-page'>
                {Auth.loggedIn() && userData ? (
                    <>
                        <div className='user'>
                            <div className="user-content">
                                <h1>{userData.name}'s Profile</h1>

                                <div className="user-info">
                                    <div>
                                        <h5>Email</h5>

                                        <input
                                        name='email'
                                        disabled={disableEmail}
                                        value={tempEmail}
                                        onChange={handleChange} />

                                        {disableEmail ? (
                                            <>
                                                <button onClick={() => setDisableEmail(!disableEmail)}>Change</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={handleSubmit} id='email'>Update</button>
                                            </>
                                        )}
                                    </div>

                                    <div>
                                        <h5>Password</h5>
                                        <input type='password' placeholder='New Password' onChange={handleChange} />
                                        <button onClick={handleSubmit} id='password'>Change</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="upcoming-events">
                            <h2>Upcoming Events</h2>
                            <div className="upcoming-slider">
                                <div className="list">
                                    <ProfileContainer response={upcomingEvents} setUpcomingEvents={setUpcomingEvents} />
                                </div>
                            </div>
                        </div>

                        <div className="previous-events">
                            <h2>Previous Events</h2>
                            <div className="previous-slider">
                                <div className="list">
                                    <EventList array={pastEvents} reduced={true} />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />
                )}
            </div>
        </>
    )
}

export default Profile
