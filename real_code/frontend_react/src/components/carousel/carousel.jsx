import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import Thumbnail from "./thumbnail/thumbnail"
import './carousel.css'

const Carousel = () => {
    const [activeSport, setActiveSport] = useState(0)
    const [sportsArray, setSportsArray] = useState(['Basketball', 'Pickleball', 'Tennis', 'Volleyball'])
    const [sports, setSports] = useState([
        {
            id: 'volleyball',
            title: 'Volleyball',
            events: [
                {
                    id: 0,
                    date: '04/23',
                    location: 'Clay Madsen Rec Center',
                    time: '6:00 PM'
                },
                {
                    id: 1,
                    date: '04/23',
                    location: 'Clay Madsen Recreactional Center',
                    time: '6:00 PM'
                },
            ]
        },
        {
            id: 'basketball',
            title: 'Basketball',
            events: []
        },
        {
            id: 'pickleball',
            title: 'Pickleball',
            events: []
        },
        {
            id: 'tennis',
            title: 'Tennis',
            events: []
        },
    ])
    const initialMount = useRef(true)

    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false
        } else {
            let index = sports.findIndex(sport => sport.title === sportsArray[sportsArray.length - 1])
            setActiveSport(index)
        }
    }, [sportsArray])

    return (
        <div className="carousel">
            <div className="list">
                <div className="item">
                    <img src={`./images/${sports[activeSport].id}.jpg`}/>

                    <div className="content">
                        <div className="title">{sports[activeSport].title}</div>

                        <div className="upcoming-title">Upcoming Events</div>

                        <div className="upcoming-events volleyball">
                            <div className="slider">
                                <div className="list">
                                    {sports[activeSport].events.map((event) => {
                                        return (
                                            <div className="event" key={event.id}>
                                                <h1>{event.date}</h1>
                                                <p>Location: {event.location}</p>
                                                <p>Time: {event.time}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="buttons">
                            <Link to={`/search/${sports[0].title}`}>Search</Link>
                            <Link to='/search'>Search All</Link>
                        </div>
                    </div>
                </div>
            </div>

            <Thumbnail sports={sportsArray} setSports={setSportsArray} />
        </div>
    )
}

export default Carousel
