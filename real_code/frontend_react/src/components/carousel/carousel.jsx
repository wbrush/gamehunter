import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import Thumbnail from "./thumbnail/thumbnail"
import './carousel.css'

const Carousel = ({ events }) => {
    const [activeSport, setActiveSport] = useState(0)
    const [sportsArray, setSportsArray] = useState(['Volleyball', 'Basketball', 'Pickleball', 'Tennis'])
    const [originalEvents, setOriginalEvents] = useState(null)
    
    useEffect(() => {
        if (events) {
            setOriginalEvents(events)
        }
    }, [events])

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
                                    {events?.map((event) => {
                                        return (
                                            <div className="event" key={event.id}>
                                                <h1>{event.date}</h1>
                                                <p>Time: {event.time}</p>
                                                <p>Location: {event.city}, {event.state}</p>
                                                <p>Facility: {event.location}</p>
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
        </div>
    )
}

export default Carousel
