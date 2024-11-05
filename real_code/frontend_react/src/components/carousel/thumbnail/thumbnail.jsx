import { useState, useEffect, useRef } from 'react'
import './thumbnail.css'

const Thumbnail = ({ sports, setActiveSport }) => {
    const divRef = useRef(null)
    let temp = sports.slice(0, sports.length)
    const [thumbnailSports, setThumbnailSports] = useState([])

    useEffect(() => {
        temp.push(temp.shift())
        setThumbnailSports(temp)
    }, [])

    const handleChange = (event) => {
        setTime(1000)
        let clickedIndex
        if (event.target.id) {
            clickedIndex = thumbnailSports.indexOf(event.target.id)
            setActiveSport(sports.indexOf(event.target.id))
        } else {
            clickedIndex = 0
            setActiveSport(sports.indexOf(thumbnailSports[0]))
        }

        thumbnailSports.push(thumbnailSports.splice(clickedIndex, 1)[0])
        setThumbnailSports(thumbnailSports)
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
            {thumbnailSports.map((sport, i) => {
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
