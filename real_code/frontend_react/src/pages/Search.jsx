import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Header from '../components/header/header'
import Modal from '../components/modal/modal'
import Hero from '../components/hero/hero'
import '../pagescss/search.css'

const Search = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');
  const [filteredEvents, setFilteredEvents] = useState([])
  const initialMount = useRef(true)

  const [query, setQuery] = useState('')
  const [sport, setSport] = useState('Volleyball')
  const [location, setLocation] = useState('Clay Madsen')
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    if (initialMount.current || query != '') {
      try {
        fetch ('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/sport' + query, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then((res) => res.json())
        .then((data) => {
          filterData(data)
        })
      } catch (error) {
        console.error(error)
      }

      initialMount.current = false
    }
  }, [query])
    
  const filterData = (data) => {
    const currentTimestamp = new Date(Date.now()).valueOf()
    const tempArr = []

    data.forEach(element => {
      const elementDate = new Date(element.date).valueOf()
      element.date = element.date.split('T')

      
      if (currentTimestamp < elementDate) {
        element.sport = element.sport.charAt(0).toUpperCase() + element.sport.slice(1)
        element.time = formatTime(element.date[1])
        element.date = formatDate(element.date[0])
        tempArr.push(element)
      } //else {deleteQuery()} deletes past events
    })
    setFilteredEvents(tempArr)
  }

  const formatTime = (time) => {
    time = time.split(':')
    time.pop()

    if (time[0] > 12) {
      time[0] = Number(time[0]) - 12
      time[1] += ' PM'
    }else if (time[0] == 12 && time[1] > 0) {
      time[1] += ' PM'
    } else {
      time [1] += ' AM'
    }
    
    return time.join(':')
  }
  
  const formatDate = (date) => {
    date = date.split('-')
    date = date[1] + '/' + date[2]
    return date
  }

  return (
    <>
    <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
    <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />
    
    <div className='search-page'>
      <Hero />

      <div className="search-bar">
        <div>
          <p>Sport:</p>
          <select onChange={(option) => setSport(option.target.selectedOptions[0].innerHTML)}>
            <option>Volleyball</option>
            <option>Basketball</option>
            <option>Pickleball</option>
            <option>Tennis</option>
          </select>
        </div>

        <div>
          <p>Location:</p>
          <select onChange={(option) => setLocation(option.target.selectedOptions[0].innerHTML)}>
            <option>Clay Madsen</option>
            <option>Wells Branch</option>
          </select>
        </div>

        <div>
          <p>Date:</p>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </div>

        <button onClick={() => setQuery('?')}>Search</button>
      </div>

    </div>

    <div className='search-container'>
      {filteredEvents.length > 0 ? filteredEvents.map((event, i) => {
        return (
          <div className="event" key={event.id}>
            <h1>{event.date}</h1>
            <p>Sport: {event.sport}</p>
            <p>Location: {event.location}</p>
            <p>Time: {event.time}</p>
          </div>
        )
      }) : <></>}
    </div>
    </>
  )
}

export default Search
