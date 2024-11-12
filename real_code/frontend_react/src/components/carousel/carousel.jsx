import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Thumbnail from "./thumbnail/thumbnail"
import EventModal from '../eventModal/modal'
import EventList from '../eventList/list'
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
                                    <EventList array={currentEvents} dateFormat={changeEventModal} />
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
