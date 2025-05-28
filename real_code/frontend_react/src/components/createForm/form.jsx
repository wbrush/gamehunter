import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { postCreateEventRequest } from '../../utils/functions'

const Form = ({ form }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [startHour, setStartHour] = useState('01')
    const [startMinute, setStartMinute] = useState('00')
    const [startCycle, setStartCycle] = useState('AM')
    const [endHour, setEndHour] = useState('01')
    const [endMinute, setEndMinute] = useState('00')
    const [endCycle, setEndCycle] = useState('AM')

    useEffect(() => {
        startDate.setHours(startHour)
        startDate.setMinutes(startMinute)
        startDate.setSeconds(0)
        endDate.setHours(endHour)
        endDate.setMinutes(endMinute)
        endDate.setSeconds(0)
    }, [])

    const handleChange = (method, targetKey, input) => {
        // Update start time
        if (method === 'start') {
        // Cycles hour
        if (targetKey === 'dayNight') {
            if (input === 'PM') {
            let hour = startDate.getHours() + 12
            startDate.setHours(hour)
            startDate.setMinutes(startMinute)
            startDate.setSeconds(0)

            setStartHour(hour)
            setStartCycle('PM')
            } else {
            let hour = startDate.getHours() - 12
            startDate.setHours(hour)
            
            setStartHour(hour)
            setStartCycle('AM')
            }
        }

        // Update hour
        if (targetKey === 'hour') {
            // Cycle hour if PM is selected
            if (startCycle === 'PM') {
            input = Number(input) + 12
            }
            
            startDate.setHours(input)
            startDate.setMinutes(startMinute)
            startDate.setSeconds(0)

            setStartHour(input.toString())
            // Update minute
        } else if (targetKey === 'min') {
            startDate.setMinutes(input)
            startDate.setHours(startHour)
            startDate.setSeconds(0)

            setStartMinute(input.toString())
        }

        // console.log(startDate)
        
        // Update end time
        } else if (method === 'end') {
        // Cycles hour
        if (targetKey === 'dayNight') {
            if (input === 'PM') {
            let hour = endDate.getHours() + 12
            endDate.setHours(hour)
            endDate.setMinutes(endMinute)
            endDate.setSeconds(0)

            setEndHour(hour)
            setEndCycle('PM')
            } else {
            let hour = endDate.getHours() - 12
            endDate.setHours(hour)
            
            setEndHour(hour)
            setEndCycle('AM')
            }
        }

        // Update hour
        if (targetKey === 'hour') {
            // Cycle hour if PM is selected
            if (endCycle === 'PM') {
            input = Number(input) + 12
            }

            endDate.setHours(input)
            endDate.setMinutes(endMinute)
            endDate.setSeconds(0)

            setEndHour(input.toString())
            // Update minute
        } else if (targetKey === 'min') {
            endDate.setMinutes(input)
            endDate.setHours(endHour)
            endDate.setSeconds(0)

            setEndMinute(input.toString())
        }

        // console.log(endDate)
        }
    }

    const createEvent = () => {
        const url = `https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/event/`
        const eventDetails = {
        event_type: form,
        start_date: startDate,
        end_date: endDate,
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
                    <DatePicker selected={startDate} onChange={(startDate) => setStartDate(startDate)} />
                </div>
                
                <div className='section'>
                    <label>Start Time</label>
                    <div className="time-selector">
                    <select onChange={(option) => handleChange('start', 'hour', option.target.selectedOptions[0].innerHTML)}>
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
    
                    <select onChange={(option) => handleChange('start', 'min', option.target.selectedOptions[0].innerHTML)}>
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                    </select>
    
                    <select onChange={(option) => handleChange('start', 'dayNight', option.target.selectedOptions[0].innerHTML)}>
                        <option>AM</option>
                        <option>PM</option>
                    </select>
                    </div>
                </div>
                
                <div className='section'>
                    <label>End Time</label>
                    <div className="time-selector">
                    <select onChange={(option) => handleChange('end', 'hour', option.target.selectedOptions[0].innerHTML)}>
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
    
                    <select onChange={(option) => handleChange('end', 'min', option.target.selectedOptions[0].innerHTML)}>
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                    </select>
    
                    <select onChange={(option) => handleChange('end', 'dayNight', option.target.selectedOptions[0].innerHTML)}>
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
