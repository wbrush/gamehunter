import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Header from '../components/header/header'
import Modal from '../components/modal/modal'
import Hero from '../components/hero/hero'
import Select from '../components/select/select'
import '../pagescss/search.css'

const Search = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');
  const response = useOutletContext()

  const [query, setQuery] = useState('')
  const [sport, setSport] = useState('Volleyball')
  const [location, setLocation] = useState('Clay Madsen Rec Center')
  const [date, setDate] = useState(new Date())
  const [sportArray, setSportArray] = useState([])
  const [locationArray, setLocationArray] = useState([])
  const [pageLoad, setPageLoad] = useState(null)

  useEffect(() => {
    if (response.length > 0) {
      loadSearchFilters(response)
    }
  }, [pageLoad])
  
  const loadSearchFilters = (response) => {
    response.forEach((element) => {
      if (!sportArray.includes(element.sport)) {
        sportArray.push(element.sport)
      }
      
      if (!locationArray.includes(element.location)) {
        locationArray.push(element.location)
      }
      
      setSport(sportArray[0])
      setLocation(locationArray[0])
      setSportArray(sportArray)
      setLocationArray(locationArray)
      setPageLoad(true)
    })
  }

  const updateQuery = () => {
    setQuery('?sport=' + sport + '&location=' + location.split(' ').join('+') + '&date=' + date.toString().split(' ').join('+'))
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
            <Select array={sportArray}/>
          </select>
        </div>

        <div>
          <p>Location:</p>
          <select onChange={(option) => setLocation(option.target.selectedOptions[0].innerHTML)}>
            <Select array={locationArray}/>
          </select>
        </div>

        <div>
          <p>Date:</p>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </div>

        <button onClick={updateQuery}>Search</button>
      </div>

    </div>

    <div className='search-container'>
      {response.length > 0 ? response.map((event, i) => {
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
