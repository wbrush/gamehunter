import Auth from '../../utils/auth'
import { postEventRequest } from '../../utils/functions'

import './modal.css';

const EventModal = ({ modalVisibility, setModalVisibility, eventDetails}) => {
    const toggleModal = (event) => {
        if (event.target.className === 'event-modal' || event.target.className === 'close-modal') {
            setModalVisibility(!modalVisibility)
        }
    }

    const eventSignup = async (e) => {
        const userData = Auth.getUser()
        const ids = {
            user: userData.user.id,
            event: Number(e.target.dataset.key)
        }

        const response = await postEventRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/add/', ids)
        if (response) {
            setModalVisibility(false)
        }
    }

    return modalVisibility ? 
        (
            <div className="event-modal" onClick={toggleModal}>
                <div className='modal-form'>
                    <h2>{eventDetails.sport}</h2><span className='close-modal' onClick={toggleModal}>X</span>
                    <p>Date: {eventDetails.date}</p>
                    <p>Time: {eventDetails.time}</p>
                    <p>Location: {eventDetails.city}, {eventDetails.state}</p>
                    <p>Facility: {eventDetails.location}</p>

                    <button data-key={eventDetails.id} onClick={eventSignup}>Add</button>
                </div>

            </div>
        ) : null
}

export default EventModal
