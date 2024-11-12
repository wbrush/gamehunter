const EventList = ({ array, dateFormat, reduced }) => {
    return array?.map((event) => {
        let temp = event.date.split('/')
        temp = temp[0] + '/' + temp[1]
        
        return (
            <div className="event" key={event.id}>
                {!reduced ? (
                    <>
                        <h1>{temp}</h1>
                        <p>Time: {event.time}</p>
                    </>
                ) : (
                    <>
                        <p>Date: {temp}</p>
                        <p>Sport: {event.sport}</p>
                    </>
                )}

                <p>Location: {event.city}, {event.state}</p>
                <p id="last">Facility: {event.location}</p>
                
                {dateFormat ? (
                    <button data-key={event.id} onClick={dateFormat}>See more</button>
                ) : (<></>)}
            </div>
        )
    })
}

export default EventList
