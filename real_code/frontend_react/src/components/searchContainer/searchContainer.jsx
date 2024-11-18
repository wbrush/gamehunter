const SearchContainer = ({ response, updatedResponse }) => {
    if (updatedResponse?.length > 0) {
        return updatedResponse?.map((event) => {
            let tempDate = event.date.split('/')
            tempDate = tempDate[0] + '/' + tempDate[1]

            return (
                <div className="event" key={event.id}>
                    <h1>{tempDate}</h1>
                    <p>Sport: {event.sport}</p>
                    <p>Time: {event.time}</p>
                    <p>Facility: {event.location}</p>
                    <p>Location: {event.city}, {event.state}</p>
                </div>
            )
        })
    } else {
        return response?.map((event) => {
            let tempDate = event.date.split('/')
            tempDate = tempDate[0] + '/' + tempDate[1]

            return (
                <div className="event" key={event.id}>
                    <h1>{tempDate}</h1>
                    <p>Sport: {event.sport}</p>
                    <p>Time: {event.time}</p>
                    <p>Facility: {event.location}</p>
                    <p id='last'>Location: {event.city}, {event.state}</p>
                </div>
            )
        })
    }
}

export default SearchContainer
