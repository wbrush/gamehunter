import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

import Header from '../components/header/header'
import Modal from '../components/userModal/modal'
import EventList from '../components/eventList/list'
import SearchContainer from '../components/searchContainer/searchContainer';

import Auth from '../utils/auth'
import { filterData } from '../utils/functions';

import '../pagescss/profile.css'

const Profile = () => {
    const [modalVisibility, setModalVisibility ] = useState(true);
    const [modalDisplay, setModalDisplay] = useState('Login');

    let response = useOutletContext()
    const [filteredResponse, setFilteredResponse] = useState([])

    useEffect(() => {
        if (response.length > 0) {
            setFilteredResponse(response)
        } else {
            fetchRequest()
        }
    }, [])

    const fetchRequest = async () => {
        const api = await fetch ('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/sport', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        const apijson = await api.json()
    
        const filtered = filterData(apijson)
        setFilteredResponse(filtered)
    }

    // const userData = Auth.getUser()

    return (
        <>
            <Header />

            <div className='profile-page'>
                {Auth.loggedIn() ? (
                    <>

                        <div className='user'>
                            <div className="user-content">
                                <h1>David Brush</h1>

                                <div className="user-info">
                                    <div>
                                        <h5>Email</h5>
                                        <p>test@test.com</p>
                                        <button>Update</button>
                                    </div>

                                    <div>
                                        <h5>Password</h5>
                                        <p>**********</p>
                                        <button>Change</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="upcoming-events">
                            <h2>Upcoming Events</h2>
                            <div className="upcoming-slider">
                                <div className="list">
                                    <SearchContainer response={filteredResponse} updatedResponse={[]} />
                                </div>
                            </div>
                        </div>

                        <div className="previous-events">
                            <h2>Previous Events</h2>
                            <div className="previous-slider">
                                <div className="list">
                                    <EventList array={filteredResponse} reduced={true} />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Header />
                        <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />
                    </>
                )}
            </div>
        </>
    )
}

export default Profile
