import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { postCreateEventRequest } from '../../utils/functions'

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

    useEffect(() => {
        date.setHours(startHour, startMinute, 0, 0)
    }, [])

    const createEvent = () => {
        if (startCycle === 'PM') {
            date.setHours(Number(startHour) + 12, Number(startMinute))
        } else {
            date.setHours(Number(startHour), Number(startMinute))
        }
        const tempStart = `${date}`
        setStartDate(`${date}`)
        
        if (endCycle === 'PM') {
            date.setHours(Number(endHour) + 12, Number(endMinute))
        } else {
            date.setHours(Number(endHour), Number(endMinute))
        }
        const tempEnd = `${date}`
        setEndDate(`${date}`)
        
        const url = `https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/event/`
        const eventDetails = {
        event_type: form,
        start_date: tempStart,
        end_date: tempEnd,
        players: 1
        }
        
        console.log('submitted form', eventDetails)
        postCreateEventRequest(url, eventDetails)
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
            </form>
        </div>
    )
}

export default Form
