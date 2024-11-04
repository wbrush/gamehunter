import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Header from '../components/header/header'
import Modal from '../components/modal/modal'
import Hero from '../components/hero/hero'
import Select from '../components/select/select'
import { filterData } from '../utils/functions';
import '../pagescss/search.css'

const Search = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');
  
  let response = useOutletContext()
  const [query, setQuery] = useState('')
  const [dataLoaded, setDataLoaded] = useState([])

  const [sport, setSport] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState(new Date())
  const [sportArray, setSportArray] = useState([])
  const [locationArray, setLocationArray] = useState([])

  useEffect(() => {
    if (response.length > 0) {
      loadSearchFilters(response, null)
    } else if (response.length == 0 && dataLoaded.length == 0) {
      fetchRequest()
      loadSearchFilters(null, dataLoaded)
    } else {
      loadSearchFilters(null, dataLoaded)
    }
  }, [dataLoaded])

  const fetchRequest = async () => {
    const api = await fetch ('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/sport' + query, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    const apijson = await api.json()
    
    const filtered = filterData(apijson)
    setDataLoaded(filtered)
  }

  const loadSearchFilters = (response, dataLoaded) => {
    if (response) {
      response.forEach((element) => {
        if (!sportArray.includes(element.sport)) {
          sportArray.push(element.sport)
        }
  
        if (!locationArray.includes(element.location)) {
          locationArray.push(element.location)
        }
      })
    } else {
      dataLoaded.forEach((element) => {
        if (!sportArray.includes(element.title)) {
          sportArray.push(element.title)
        }
  
        if (element.events.length > 0) {
          for (let i = 0; i < element.events.length; i++) {
            if (!locationArray.includes(element.events[i].location)) {
              locationArray.push(element.events[i].location)
            }
          }
        }
      })
    }


    setSport(sportArray[0])
    setLocation(locationArray[0])
    setSportArray(sportArray)
    setLocationArray(locationArray)
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
          <select onChange={(option) => setSport(option.target.selectedOptions[1].innerHTML)}>
            <option>Select</option>
            <Select array={sportArray}/>
          </select>
        </div>

        <div>
          <p>Location:</p>
          <select onChange={(option) => setLocation(option.target.selectedOptions[1].innerHTML)}>
            <option>Select</option>
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
