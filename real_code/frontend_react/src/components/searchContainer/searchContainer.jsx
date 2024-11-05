const SearchContainer = ({ response }) => {
    return response?.map((event) => {
        return (
            <div className="event" key={event.id}>
                <h1>{event.date}</h1>
                <p>Sport: {event.sport}</p>
                <p>Time: {event.time}</p>
                <p>Facility: {event.location}</p>
                <p>Location: {event.city}, {event.state}</p>
            </div>
        )
    })
}

export default SearchContainer
