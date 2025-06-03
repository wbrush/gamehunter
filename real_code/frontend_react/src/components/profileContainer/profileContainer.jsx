import RemoveButton from '../removeButton/removeButton'

const ProfileContainer = ({ response, setUpcomingEvents }) => {
    return response?.map((event) => {
        let date = event.start_date.split('T')[0].split('-')
        date = date[1] + '/' + date[2]

        let time = new Date(event.start_date)
        let hour = time.getHours()
        let min = time.getMinutes()
        let cycle = 'AM'

        if (hour > 12) {
            hour = hour - 12
            cycle = 'PM'
        }

        if (min == 0) {
            min = '00'
        }

        return (
            <div className="event" key={event.id}>
                <h1>{date}</h1>
                <p id='last'>Time: {hour}:{min} {cycle}</p>

                <RemoveButton events={response} update={setUpcomingEvents} id={event.id} />
            </div>
        )
    })
}

export default ProfileContainer
