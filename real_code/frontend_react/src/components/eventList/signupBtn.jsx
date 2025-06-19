import { useState } from "react"

import { postEventRequest, postPlayerCountRequest } from "../../utils/functions"
import Auth from "../../utils/auth"

const SignupBtn = ({userEvents, eventInfo}) => {
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

    const eventSignup = async () => {
                    const userData = Auth.getUser()
                    const data = {
                        user: userData?.user.id,
                        event: eventInfo.extendedProps.id
                    }
                    userEvents = JSON.parse(localStorage.getItem('user_events'))

                    if (!Auth.loggedIn()) {
                        setErrorMsg(errorStyling)
                    } else {
                        const response = await postEventRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/add/', data)
                        if (response) {
                            if (userEvents) {
                                localStorage.setItem('user_events', JSON.stringify([...userEvents, eventInfo.extendedProps]))
                            } else {
                                localStorage.setItem('user_events', JSON.stringify([eventInfo.extendedProps]))
                            }

                            // increment player count
                            const url = `https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/inc/`
                            await postPlayerCountRequest(url, eventInfo.extendedProps.id)

                            location.reload()
                        }
                    }
                }

    const eventWithdraw = async () => {
        const userData = Auth.getUser()
        const data = {
            user: userData?.user.id,
            event: eventInfo.extendedProps.id
        }

        userEvents = JSON.parse(localStorage.getItem('user_events'))

        if (Auth.loggedIn()) {
            const response = await postEventRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/remove/', data)
            if (response.result) {
                localStorage.setItem('user_events', JSON.stringify(userEvents.filter(clickedEvent => clickedEvent.id !== eventInfo.extendedProps.id)))

                // decrement player count
                const url = `https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/dec/`
                await postPlayerCountRequest(url, eventInfo.extendedProps.id)

                location.reload()
            }
        } else {
            setErrorMsg(errorStyling)
        }
    }

    const eventSearch = (clickedEvent) => {
        return clickedEvent.id === eventInfo.extendedProps.id
    }

    return (
        <>
            <p style={errorMsg}>Please login to signup for events</p>
            {userEvents?.find(eventSearch) ? <button onClick={eventWithdraw} id='event-button'>Withdraw</button> : <button onClick={eventSignup} id='event-button'>Signup</button>}
        </>
    )
}

export default SignupBtn
