import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Header from '../components/header/header'
import Modal from '../components/userModal/modal'

import { postCreateEventRequest } from '../utils/functions'
import Auth from '../utils/auth'

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
  const [notes, setNotes] = useState('')

  let [loggedIn, setLoggedIn] = useState(Auth.loggedIn())

  useEffect(() => {
    setLoggedIn(Auth.loggedIn())
  }, [modalVisibility])

  const createEvent = (method) => {
    const url = `https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/${method}/`
    const eventDetails = {
      date: date,
      sport: sport,
      location: location,
      facility: facility,
      notes: notes
    }

    if (method === 'event') {
      if (sport === '' || facility === '' || location === '') {
        setEventErrorMessage(true)
      } else {
        console.log('submit event form')
        postCreateEventRequest(url, eventDetails)
      }
    } else if (method === 'tourney') {
      if (sport === '' || facility === '' || location === '') {
        setTourneyErrorMessage(true)
      } else {
        console.log('submit tourney form')
        postCreateEventRequest(url, eventDetails)
      }
    }
  }

  return (
    <>
      <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />

      <div className='create-page'>
        {loggedIn ? null : <h4 id='login-text'>Please login to post an event.</h4>}

        <div className="create-page-content">
          <div className='form'>
            {loggedIn ? 
              <form>
                <h2>Create an Event</h2>

                <div className='section'>
                  <label>Date</label>
                  <DatePicker selected={date} onChange={(date) => setDate(date)} />
                </div>

                <div className='section'>
                  <label>Sport</label>
                  <select onChange={(option) => setSport(option.target.selectedOptions[0].innerHTML)}>
                    <option>Select</option>
                    <option>Volleyball</option>
                    <option>Basketball</option>
                    <option>Pickleball</option>
                    <option>Tennis</option>
                  </select>
                </div>

                <div className='section'>
                  <label>Facility</label>
                  <input placeholder='ex. Clay Madsen Rec'
                  name='facility'
                  value={facility}
                  onChange={(input) => setFacility(input.target.value)} />
                </div>

                <div className='section'>
                  <label>Location</label>
                  <input placeholder='ex. Round Rock, TX'
                  name='location'
                  value={location}
                  onChange={(input) => setLocation(input.target.value)} />
                </div>

                <div className='section'>
                  <label>Notes</label>
                  <textarea placeholder='ex. Entry fees, age restriction, level of play, etc.'
                  name='notes'
                  value={notes}
                  onChange={(input) => setNotes(input.target.value)}></textarea>
                </div>

                {eventErrorMessage ? (<p className="form-error">Please fill out the empty field(s)</p>) : null}

                <p id='form-submit' onClick={() => createEvent('event')}>Create</p>
              </form>
            : 
              <form inert='true'>
                <h2>Create an Event</h2>

                <div className='section'>
                  <label>Date</label>
                  <DatePicker selected={date} onChange={(date) => setDate(date)} />
                </div>

                <div className='section'>
                  <label>Sport</label>
                  <select onChange={(option) => setSport(option.target.selectedOptions[0].innerHTML)}>
                    <option>Select</option>
                    <option>Volleyball</option>
                    <option>Basketball</option>
                    <option>Pickleball</option>
                    <option>Tennis</option>
                  </select>
                </div>

                <div className='section'>
                  <label>Facility</label>
                  <input placeholder='ex. Clay Madsen Rec'
                  name='facility'
                  value={facility}
                  onChange={(input) => setFacility(input.target.value)} />
                </div>

                <div className='section'>
                  <label>Location</label>
                  <input placeholder='ex. Round Rock, TX'
                  name='location'
                  value={location}
                  onChange={(input) => setLocation(input.target.value)} />
                </div>

                <div className='section'>
                  <label>Notes</label>
                  <textarea placeholder='ex. Entry fees, age restriction, level of play, etc.'
                  name='notes'
                  value={notes}
                  onChange={(input) => setNotes(input.target.value)}></textarea>
                </div>

                {eventErrorMessage ? (<p className="form-error">Please fill out the empty field(s)</p>) : null}

                <p id='form-submit' onClick={() => createEvent('event')}>Create</p>
              </form>
            }
          </div>

          <div className='divider'>
            <div id='divider'></div>
            <h1>OR</h1>
          </div>

          <div className='form' inert='true'>
            <h1 id='disabled-text'>Upcoming Feature</h1>

            <form id='disabled'>
              <h2>Create a Tourney</h2>

              <div className='section'>
                <label>Date:</label>
                <DatePicker selected={date} onChange={(date) => setDate(date)} />
              </div>

              <div className='section'>
                <label>Sport:</label>
                <select onChange={(option) => setSport(option.target.selectedOptions[0].innerHTML)}>
                  <option>Select</option>
                  <option>Volleyball</option>
                  <option>Basketball</option>
                  <option>Pickleball</option>
                  <option>Tennis</option>
                </select>
              </div>

              <div className='section'>
                <label>Facility:</label>
                <input placeholder='ex. Clay Madsen Rec'
                name='facility'
                value={facility}
                onChange={(input) => setFacility(input.target.value)} />
              </div>

              <div className='section'>
                <label>Location:</label>
                <input placeholder='ex. Round Rock, TX'
                name='location'
                value={location}
                onChange={(input) => setLocation(input.target.value)} />
              </div>

              <div className='section'>
                <label>Notes</label>
                <textarea placeholder='ex. Entry fees, age restriction, level of play, etc.'
                name='notes'
                value={notes}
                onChange={(input) => setNotes(input.target.value)}></textarea>
              </div>

              {tourneyErrorMessage ? (<p className="form-error">Please fill out the empty field(s)</p>) : null}

              <p id='form-submit' onClick={() => createEvent('tourney')}>Create</p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Create
