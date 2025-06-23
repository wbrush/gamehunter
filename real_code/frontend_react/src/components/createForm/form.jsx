import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Auth from '../../utils/auth'
import { postCreateEventRequest, postEventRequest, postPlayerCountRequest } from '../../utils/functions'

import './form.css'

const Form = ({ form }) => {
    const [date, setDate] = useState(new Date())
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startHour, setStartHour] = useState(1)
    const [startMinute, setStartMinute] = useState(0)
    const [startCycle, setStartCycle] = useState('AM')
    const [endHour, setEndHour] = useState(1)
    const [endMinute, setEndMinute] = useState(0)
    const [endCycle, setEndCycle] = useState('AM')
    const [creationFailure, setCreationFailure] = useState(false)
    const [signupFailure, setSignupFailure] = useState(false)
    const [signupModal, setSignupModal] = useState(false)
    const [eventInfo, setEventInfo] = useState({
        id: 0,
        endDate: '',
        startDate: '',
        title: '',
        players: 0
    })

    useEffect(() => {
        date.setHours(startHour, startMinute, 0, 0)
    }, [])

    const createEvent = async () => {
        if (startCycle === 'PM') {
            date.setHours(Number(startHour) + 12, Number(startMinute))
        } else {
            date.setHours(Number(startHour), Number(startMinute))
        }

        const tempStart = `${date.toUTCString()}`
        setStartDate(tempStart)
        
        if (endCycle === 'PM') {
            date.setHours(Number(endHour) + 12, Number(endMinute))
        } else {
            date.setHours(Number(endHour), Number(endMinute))
        }

        const tempEnd = `${date.toUTCString()}`
        setEndDate(tempEnd)
        
        const url = `https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/event/`
        const eventDetails = {
        event_type: form,
        start_date: tempStart,
        end_date: tempEnd,
        players: 0
        }
        
        const result = await postCreateEventRequest(url, eventDetails)
        if (result.result) {
            setCreationFailure(false)
            setSignupModal(true)
            
            let eventTitle
            if (form === 'open') {
                eventTitle = 'Open Gym'
            } else {
                eventTitle = 'Reserved Court'
            }

            setEventInfo({
                id: result.response.rows[0].id,
                startDate: tempStart,
                endDate: tempEnd,
                title: eventTitle,
                players: 0
            })
        } else {
            setCreationFailure(true)
        }
    }
    
    const eventSignup = async () => {
        const userData = Auth.getUser()
        const data = {
            user: userData?.user.id,
            event: eventInfo.id
        }
        const userEvents = JSON.parse(localStorage.getItem('user_events'))

        if (Auth.loggedIn()) {
            const response = await postEventRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/add/', data)
            if (response) {
                if (userEvents) {
                    localStorage.setItem('user_events', JSON.stringify([...userEvents, eventInfo]))
                } else {
                    localStorage.setItem('user_events', JSON.stringify([eventInfo]))
                }

                setSignupModal(false)

                // increment player count
                const url = `https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/inc/`
                await postPlayerCountRequest(url, eventInfo.id)
            }
        } else {
            setSignupFailure(!signupFailure)
        }
    }

    return (
        <div className='event-form'>
            <form>
                {form === 'open' ? <h2>Create Open Gym</h2> : <h2>Reserve a Court</h2>}
    
                <div className='section'>
                    <label>Date</label>
                    <DatePicker selected={date} onChange={(date) => {
                        setDate(date)
                    }} />
                </div>
                
                <div className='section'>
                    <label>Start Time</label>
                    <div className="time-selector">
                    <select onChange={(option) => setStartHour(Number(option.target.selectedOptions[0].innerHTML))}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
    
                    <select onChange={(option) => setStartMinute(Number(option.target.selectedOptions[0].innerHTML))}>
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                    </select>
    
                    <select onChange={(option) => setStartCycle(option.target.selectedOptions[0].innerHTML)}>
                        <option>AM</option>
                        <option>PM</option>
                    </select>
                    </div>
                </div>
                
                <div className='section'>
                    <label>End Time</label>
                    <div className="time-selector">
                    <select onChange={(option) => setEndHour(Number(option.target.selectedOptions[0].innerHTML))}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
    
                    <select onChange={(option) => setEndMinute(Number(option.target.selectedOptions[0].innerHTML))}>
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                    </select>
    
                    <select onChange={(option) => setEndCycle(option.target.selectedOptions[0].innerHTML)}>
                        <option>AM</option>
                        <option>PM</option>
                    </select>
                    </div>
                </div>
    
                <p id='form-submit' onClick={() => createEvent()}>Create</p>
                {signupModal ? (
                    <div className='create-modal'>
                        <h2>Event Created</h2>
                        <h4>Signup?</h4>

                        <div className="modal-buttons">
                            <p onClick={eventSignup}>Yes</p>
                            <p onClick={() => setSignupModal(false)}>No</p>
                        </div>
                        
                        {signupFailure ? <p id='error'>Please login to signup for event</p> : null}
                    </div>
                ) : null}
            </form>

            {creationFailure ? <p id='error'>Failed to create event</p> : null}
        </div>
    )
}

export default Form
