import { useState, useEffect } from 'react';

import Auth from '../../../utils/auth';
import { postEventRequest, formatISOTime } from '../../../utils/functions';

import './modal.css';

const Modal = ({ modalVisibility, setModalVisibility, info }) => {
    let userEvents = JSON.parse(localStorage.getItem('user_events'))
    let dateString
    let startTimeString
    let endTimeString
    const errorStyling = {
        'color': 'red',
        'margin': 0,
        'paddingTop': '5px',
        'paddingBottom': '5px',
        'fontSize': '14px',
        'textAlign': 'center'
    }
    const hiddenStyling = {
        'display': 'none'
    }

    const [errorMsg, setErrorMsg] = useState(hiddenStyling)

    const toggleModal = (event) => {
        if (event.target.className === 'calendar-modal' || event.target.id === 'close') {
            setModalVisibility(!modalVisibility)
            setErrorMsg(hiddenStyling)
        }
    }
    
    const eventSignup = async () => {
        const userData = Auth.getUser()
        const data = {
            user: userData.user.id,
            event: info.id
        }
        userEvents = JSON.parse(localStorage.getItem('user_events'))

        if (!Auth.loggedIn()) {
            setErrorMsg(errorStyling)
        } else {
            const response = await postEventRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/add/', data)
            if (response) {
                console.log(userEvents)
                if (userEvents) {
                    localStorage.setItem('user_events', JSON.stringify([...userEvents, info]))
                } else {
                    localStorage.setItem('user_events', JSON.stringify([info]))
                }
                setModalVisibility(false)
            }
        }
    }
    
    const eventWithdraw = async () => {
        const userData = Auth.getUser()
        const data = {
            user: userData.user.id,
            event: info.id
        }

        userEvents = JSON.parse(localStorage.getItem('user_events'))

        if (!Auth.loggedIn()) {
            setErrorMsg(errorStyling)
        } else {
            const response = await postEventRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/remove/', data)
            if (response) {
                localStorage.setItem('user_events', JSON.stringify(userEvents.filter(event => event.id !== info.id)))
                setModalVisibility(false)
            }
        }
    }

    if (info.startDate) {
        dateString = new Date(info.startDate).toDateString().split(' ')
        dateString = `${dateString[1]} ${dateString[2]}`
        
        startTimeString = formatISOTime(info.startDate.toTimeString())
        endTimeString = formatISOTime(info.endDate.toTimeString())
    }

    const eventSearch = (event) => {
        return event.id === info.id
    }
    
    return modalVisibility ? 
        (
            <div className="calendar-modal" onClick={toggleModal}>
                <div className="content">
                    <h1>{info.title}</h1>
                    <button onClick={toggleModal} id='close'>X</button>

                    <div className="event-info">
                        <p>Date: {dateString}</p>
                        <p>Start Time: {startTimeString}</p>
                        <p>End Time: {endTimeString}</p>
                        <p>Current Players: {info.players.toString()}</p>
                    </div>

                    <p style={errorMsg}>Please login to sign up for events</p>
                    {userEvents?.find(eventSearch) ? <button onClick={eventWithdraw}>Withdraw</button> : <button onClick={eventSignup}>Signup</button>}
                    
                </div>
            </div>
        ) : null
}

export default Modal
