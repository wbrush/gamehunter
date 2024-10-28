import { useState } from 'react';
import { Outlet } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Header from '../components/header/header'
import Modal from '../components/modal/modal'
import Hero from '../components/hero/hero'
import '../pagescss/search.css'

const Search = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  try {
    fetch ('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/sport', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        filterData(data)
    })
  } catch (error) {
    console.error(error)
  }

  const filterData = (data) => {
    const currentTimestamp = new Date(Date.now()).valueOf()
    const filteredEvents = []

    data.forEach(element => {
        const elementDate = new Date(element.date).valueOf()

        if (currentTimestamp < elementDate) {
          filteredEvents.push(element)
        } //else {deleteQuery()} deletes past events
    })

    console.log(filteredEvents)
  }

  return (
    <div className='search-page'>
      <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />

      <Hero />

      <div className="search-bar">
        <div>
          <p>Sport:</p>
          <select>
            <option>Volleyball</option>
            <option>Basketball</option>
            <option>Pickleball</option>
            <option>Tennis</option>
          </select>
        </div>

        <div>
          <p>Location:</p>
          <select>
            <option>Clay Madsen</option>
            <option>Wells Branch</option>
          </select>
        </div>

        <div>
          <p>Start Date:</p>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>

        <div>
          <p>End Date:</p>
          <DatePicker onChange={(date) => setEndDate(date)} />
        </div>

        <button>Search</button>
      </div>

      <div className='search-container'>
        <Outlet />
      </div>
    </div>
  )
}

export default Search
