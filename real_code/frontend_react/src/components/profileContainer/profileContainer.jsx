import { formatISOTime, postEventRequest, postPlayerCountRequest } from '../../utils/functions'
import Auth from '../../utils/auth'

import './profileContainer.css'

const ProfileContainer = ({ eventList, length, past }) => {
    const userData = Auth.getUser()
    const ids = {
        user: userData.user.id,
        event: null
    }

    const temp = []
    eventList?.map((event) => {
        if (temp.length < length) {
            temp.push(event)
        }
    })
    
    temp.sort(function(a,b){
        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
    })
    
    const removeEvent = async (e) => {
        ids.event = Number(e.target.dataset.key)
        const response = await postEventRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/remove/', ids)
        if (response) {
            let temp = [...eventList]
            let index = temp.map(element => element.id).indexOf(ids.event)
            temp.splice(index, 1)

            localStorage.setItem('user_events', JSON.stringify([...temp]))

            // decrement player count
            const url = `https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/dec/`
            await postPlayerCountRequest(url, ids.event)
            
            location.reload()
        }
    }

    return temp?.map((event, i) => {
        let date = event.start_date.split('T')[0].split('-')
        if (date[1][0] === '0') {
            date[1] = date[1][1]
        }
        date = date[1] + '/' + date[2]
        
        const startTimeString = formatISOTime(new Date(event.start_date).toTimeString())
        const endTimeString = formatISOTime(new Date(event.end_date).toTimeString())
        
        return (
            <div className="event" key={event.id}>
                <h1>{date}</h1>
                <p>Start Time: {startTimeString}</p>
                <p id='last'>End Time: {endTimeString}</p>

                {!past ? <button data-key={event.id} onClick={removeEvent}>Withdraw</button> : null}
            </div>
        )
    })
}

export default ProfileContainer
