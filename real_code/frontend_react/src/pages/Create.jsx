import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Header from '../components/header/header'
import Modal from '../components/userModal/modal'

import '../pagescss/create.css'

const Create = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');

  const [date, setDate] = useState(new Date())
  const [sport, setSport] = useState('')
  const [location, setLocation] = useState('')
  const [facility, setFacility] = useState('')

  const createEvent = (e) => {
    e.preventDefault()

    console.log(sport)
    console.log(date)
    console.log(location)
    console.log(facility)
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
              <input placeholder='ex. Clay Madsen Rec Center' onChange={(input) => setFacility(input.target.value)} />
            </div>

            <div>
              <label>Location</label>
              <input placeholder='ex. Round Rock, TX' onChange={(input) => setLocation(input.target.value)} />
            </div>

            <button onClick={createEvent}>Create</button>
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
              <input placeholder='ex. Clay Madsen Rec Center' onChange={(input) => setFacility(input.target.value)} />
            </div>

            <div>
              <label>Location:</label>
              <input placeholder='ex. Round Rock, TX' onChange={(input) => setLocation(input.target.value)} />
            </div>

            <button onClick={createEvent}>Create</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Create
