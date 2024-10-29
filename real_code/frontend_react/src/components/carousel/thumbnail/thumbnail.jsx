import { useState, useEffect, useRef } from 'react'
import './thumbnail.css'

const Thumbnail = ({ sports, setSports }) => {
    const divRef = useRef(null)

    const handleChange = (event) => {
        setTime(1000)
        let clickedIndex
        if (event.target.id) {
            clickedIndex = sports.indexOf(event.target.id)
        } else {
            clickedIndex = 0
        }
        sports.push(sports[clickedIndex])
        sports = sports.filter((sport, i) => {
            if (i != clickedIndex) {
                return sport
            }
        })
        setSports(sports)
    }

    const [time, setTime] = useState(1000)
    useEffect(() => {
        if (!time) return

        if (time <= 0) {
            setTime(null)
        } else if (time <= 1) {
            divRef.current.children[0].click()
        }

        const intervalId = setInterval(() => {
            setTime(time - 1)
        }, 10)
        
        return () => clearInterval(intervalId)

    }, [time])

    return (
        <div className="thumbnail" ref={divRef}>
            {sports.map((sport, i) => {
                return (
                    <div className="item" key={sport} onClick={handleChange}>
                        <img src={`./images/${sport.toLowerCase()}.jpg`} id={sport} />
                        <div className="content">
                            <p className="title" id={sport}>{sport}</p>
                        </div>
                        {i === 0 ? (<div className='timer' style={{width: `${time/10}%`}}></div>) : (<></>)}
                    </div>
                )
            })}
        </div>
    )
}

export default Thumbnail
