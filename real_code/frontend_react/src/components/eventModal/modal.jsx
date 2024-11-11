import './modal.css';

const EventModal = ({ modalVisibility, setModalVisibility, eventDetails}) => {
    const toggleModal = (event) => {
        if (event.target.className === 'event-modal' || event.target.className === 'close-modal') {
            setModalVisibility(!modalVisibility)
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
                </div>
            </div>
        ) : null
}

export default EventModal
