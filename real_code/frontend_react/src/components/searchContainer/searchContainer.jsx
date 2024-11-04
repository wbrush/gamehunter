const SearchContainer = ({ response }) => {
    return response.map((event) => {
        return (
            <div className="event" key={event.id}>
                <h1>{event.date}</h1>
                <p>Sport: {event.sport}</p>
                <p>Location: {event.location}</p>
                <p>Time: {event.time}</p>
            </div>
        )
    })
}

export default SearchContainer
