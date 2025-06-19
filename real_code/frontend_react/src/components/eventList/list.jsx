import SignupBtn from './signupBtn'

import { formatISOTime } from "../../utils/functions"

import './list.css'

const EventList = ({ eventList, length }) => {
    let userEvents = JSON.parse(localStorage.getItem('user_events'))

    const temp = []
    const currentDate = Date.now().valueOf()

    eventList?.map((event) => {
        const eventDate = event.extendedProps.startDate.valueOf()
        
        if (currentDate < eventDate && temp.length < length) {
            temp.push(event)
        }
    })
    
    return (
        <div className='upcoming-events'>
            {temp.map((event, i) => {
                let dateString = new Date(event.start).toDateString().split(' ')
                if (dateString[2][0] === '0') {
                    dateString[2] = dateString[2][1]
                }
                dateString = `${dateString[1]} ${dateString[2]}, ${dateString[3]}`
                
                const startTimeString = formatISOTime(event.extendedProps.startDate.toTimeString())
                const endTimeString = formatISOTime(event.extendedProps.endDate.toTimeString())
                
                return  (
                    <div className="event" key={i}>
                        <h1>{event.title}</h1>

                        <div className="event-details">
                            <p>{dateString}</p>
                            <p>Start Time: {startTimeString}</p>
                            <p>End Time: {endTimeString}</p>
                            <p>Players: {event.extendedProps.players}</p>
                        </div>

                        <div className="signup">
                            <SignupBtn userEvents={userEvents} eventInfo={temp[i]} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default EventList
