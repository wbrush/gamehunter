import RemoveButton from '../removeButton/removeButton'

const ProfileContainer = ({ response, setUpcomingEvents }) => {
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

                <RemoveButton events={response} update={setUpcomingEvents} id={event.id} />
            </div>
        )
    })
}

export default ProfileContainer
