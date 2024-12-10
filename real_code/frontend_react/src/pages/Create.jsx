import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Header from '../components/header/header'
import Modal from '../components/userModal/modal'

import '../pagescss/create.css'

const Create = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');
  
  const [eventErrorMessage, setEventErrorMessage ] = useState(false);
  const [tourneyErrorMessage, setTourneyErrorMessage ] = useState(false);

  const [date, setDate] = useState(new Date())
  const [sport, setSport] = useState('')
  const [location, setLocation] = useState('')
  const [facility, setFacility] = useState('')

  const createEvent = (method) => {
    if (method === 'event') {
      if (sport === '' || facility === '' || location === '') {
        setEventErrorMessage(true)
      }
    } else if (method === 'tourney') {
      if (sport === '' || facility === '' || location === '') {
        setTourneyErrorMessage(true)
      }
    }
  }

  return (
    <>
      <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />

      <div className='create-page'>
        <div className="create-page-content">
          <form>
            <h2>Create an Event</h2>

            <div>
              <label>Date</label>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </div>

            <div>
              <label>Sport</label>
              <select onChange={(option) => setSport(option.target.selectedOptions[0].innerHTML)}>
                <option>Select</option>
                <option>Volleyball</option>
                <option>Basketball</option>
                <option>Pickleball</option>
                <option>Tennis</option>
              </select>
            </div>

            <div>
              <label>Facility</label>
              <input placeholder='ex. Clay Madsen Rec'
              name='facility'
              value={facility}
              onChange={(input) => setFacility(input.target.value)} />
            </div>

            <div>
              <label>Location</label>
              <input placeholder='ex. Round Rock, TX'
              name='location'
              value={location}
              onChange={(input) => setLocation(input.target.value)} />
            </div>

            {eventErrorMessage ? (<p className="form-error">Please fill out the empty field(s)</p>) : null}

            <p id='form-submit' onClick={() => createEvent('event')}>Create</p>
          </form>
          
          <div className='divider'>
            <div id='divider'></div>
            <h1>OR</h1>
          </div>
          
          <form>
            <h2>Create a Tourney</h2>

            <div>
              <label>Date:</label>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </div>

            <div>
              <label>Sport:</label>
              <select onChange={(option) => setSport(option.target.selectedOptions[0].innerHTML)}>
                <option>Select</option>
                <option>Volleyball</option>
                <option>Basketball</option>
                <option>Pickleball</option>
                <option>Tennis</option>
              </select>
            </div>

            <div>
              <label>Facility:</label>
              <input placeholder='ex. Clay Madsen Rec'
              name='facility'
              value={facility}
              onChange={(input) => setFacility(input.target.value)} />
            </div>

            <div>
              <label>Location:</label>
              <input placeholder='ex. Round Rock, TX'
              name='location'
              value={location}
              onChange={(input) => setLocation(input.target.value)} />
            </div>

            {tourneyErrorMessage ? (<p className="form-error">Please fill out the empty field(s)</p>) : null}

            <p id='form-submit' onClick={() => createEvent('tourney')}>Create</p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Create
