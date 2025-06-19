import { useState } from 'react';

import Auth from '../../../utils/auth';
import { postEventRequest, postPlayerCountRequest, formatISOTime } from '../../../utils/functions';

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
            user: userData?.user.id,
            event: info.id
        }
        userEvents = JSON.parse(localStorage.getItem('user_events'))

        if (!Auth.loggedIn()) {
            setErrorMsg(errorStyling)
        } else {
            const response = await postEventRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/add/', data)
            if (response) {
                if (userEvents) {
                    localStorage.setItem('user_events', JSON.stringify([...userEvents, info]))
                } else {
                    localStorage.setItem('user_events', JSON.stringify([info]))
                }

                // increment player count
                const url = `https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/inc/`
                await postPlayerCountRequest(url, info.id)

                location.reload()
            }
        }
    }
    
    const eventWithdraw = async () => {
        const userData = Auth.getUser()
        const data = {
            user: userData?.user.id,
            event: info.id
        }

        userEvents = JSON.parse(localStorage.getItem('user_events'))

        if (!Auth.loggedIn()) {
            setErrorMsg(errorStyling)
        } else {
            const response = await postEventRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/remove/', data)
            if (response) {
                localStorage.setItem('user_events', JSON.stringify(userEvents.filter(event => event.id !== info.id)))

                // decrement player count
                const url = `https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/dec/`
                await postPlayerCountRequest(url, info.id)

                location.reload()
            }
        }
    }

    if (info.start_date) {
        dateString = new Date(info.start_date).toDateString().split(' ')
        if (dateString[2][0] === '0') {
            dateString[2] = dateString[2][1]
        }
        dateString = `${dateString[1]} ${dateString[2]}`
        
        startTimeString = formatISOTime(info.start_date.toTimeString())
        endTimeString = formatISOTime(info.end_date.toTimeString())
    }

    const eventSearch = (event) => {
        return event.id === info.id
    }
    
    return modalVisibility ? 
        (
            <div className="calendar-modal" onClick={toggleModal}>
                <div className="content">
                    {info.event_type === 'open' ? <h1>Open Gym</h1> : <h1>Reserved Court</h1>}
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
