import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Thumbnail from "./thumbnail/thumbnail"
import EventModal from '../eventModal/modal'
import './carousel.css'

const Carousel = ({ events }) => {
    const [activeSport, setActiveSport] = useState(0)
    const [sportsArray, setSportsArray] = useState(['Volleyball', 'Basketball', 'Pickleball', 'Tennis'])
    const [currentEvents, setCurrentEvents] = useState(null)

    const [eventModalVisibility, setEventModalVisibility] = useState(false)
    const [clickedEvent, setClickedEvent] = useState(null)

    useEffect(() => {
        if (events) {
            const temp = events.filter((event) => event.sport === sportsArray[activeSport] || event.sport === sportsArray[activeSport].toLowerCase())
            setCurrentEvents(temp)
        }
    }, [events, activeSport])

    const changeEventModal = (e) => {
        const temp = events.filter((event) => event.id == e.target.dataset.key)
        setClickedEvent(temp[0])
        setEventModalVisibility(!eventModalVisibility)
    }

    return (
        <div className="carousel">
            <div className="list">
                <div className="item">
                    <img src={`./images/${sportsArray[activeSport].toLowerCase()}.jpg`}/>

                    <div className="content">
                        <div className="title">{sportsArray[activeSport]}</div>

                        <div className="upcoming-title">Upcoming Events</div>

                        <div className="upcoming-events volleyball">
                            <div className="slider">
                                <div className="list">
                                    {currentEvents?.map((event) => {
                                        let temp = event.date.split('/')
                                        temp = temp[0] + '/' + temp[1]
                                        return (
                                            <div className="event" key={event.id}>
                                                <h1>{temp}</h1>
                                                <p>Time: {event.time}</p>
                                                <p>Location: {event.city}, {event.state}</p>
                                                <p id="last">Facility: {event.location}</p>

                                                <button data-key={event.id} onClick={changeEventModal}>See more</button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="buttons">
                            <Link className="searchAll" to='/search'>Search All</Link>
                        </div>
                    </div>
                </div>
            </div>

            <Thumbnail sports={sportsArray} setActiveSport={setActiveSport} />
            <EventModal modalVisibility={eventModalVisibility} setModalVisibility={setEventModalVisibility} eventDetails={clickedEvent} />
        </div>
    )
}

export default Carousel
