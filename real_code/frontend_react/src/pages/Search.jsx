import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Header from '../components/header/header'
import Modal from '../components/userModal/modal'
import Hero from '../components/hero/hero'
import Select from '../components/select/select'
import SearchContainer from '../components/searchContainer/searchContainer';

import { filterData, getFetchRequest } from '../utils/functions';

import '../pagescss/search.css'

const Search = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');
  
  const initialMount = useRef(true)
  
  let response = useOutletContext()
  const [filteredResponse, setFilteredResponse] = useState([])
  const [updatedResponse, setUpdatedResponse] = useState([])
  
  const [sport, setSport] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [date, setDate] = useState(new Date())
  const initialDate = new Date()
  const [sportArray, setSportArray] = useState([])
  const [cityArray, setCityArray] = useState([])
  const [noResults, setNoResults ] = useState(false);

  useEffect(() => {
    if (response.length > 0) {
      loadSearchFilters(response)
      setFilteredResponse(response)
    } else {
      fetchRequest()
    }
  }, [])

  useEffect(() => {
    if (!initialMount.current) {
      let temp = filteredResponse
      if (sport && sport != 'Select' || sport != '') {
        temp = temp.filter((event) => sport === event.sport)
      }

      if (city && city != 'Select' || city != '') {
        temp = temp.filter((event) => city === event.city)
      }

      if (date && new Date(initialDate).valueOf() != new Date(date).valueOf()) {
        const selectedDate = new Date(date).valueOf()
        temp = temp.filter((event) => selectedDate < new Date(event.date).valueOf())
      }

      if (temp.length === 0) {
        setNoResults(true)
      }

      setUpdatedResponse(temp)
    } else {
      initialMount.current = false
    }
  }, [sport, city, state, date])

  const fetchRequest = async () => {
    const response = await getFetchRequest('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/sport')
    const filtered = filterData(response)

    loadSearchFilters(filtered)
    setFilteredResponse(filtered)
  }

  const loadSearchFilters = (response) => {
    if (response) {
      response.forEach((element) => {
        if (!sportArray.includes(element.sport)) {
          sportArray.push(element.sport)
        }
  
        if (!cityArray.includes(element.city)) {
          cityArray.push(element.city)
        }
      })
    }

    setSportArray(sportArray)
    setCityArray(cityArray)
  }

  const resetFilters = () => {
    setSport('')
    setCity('')
    setDate(new Date())

    setNoResults(false)
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
            <select value={sport} onChange={(option) => setSport(option.target.selectedOptions[0].innerHTML)}>
              <option>Select</option>
              <Select array={sportArray} />
            </select>
          </div>

          <div>
            <p>City:</p>
            <select value={city} onChange={(option) => setCity(option.target.selectedOptions[0].innerHTML)}>
              <option>Select</option>
              <Select array={cityArray}/>
            </select>
          </div>

          <div>
            <p>State:</p>
            <select disabled>
              <option>Select</option>
              {/* <Select array={stateArray}/> */}
            </select>
          </div>

          <div>
            <p>Date:</p>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>

          <button onClick={resetFilters}>Reset</button>
        </div>
      </div>

      <div className='search-container'>
        {noResults ? (<p>No Results Found</p>) : (<SearchContainer response={filteredResponse} updatedResponse={updatedResponse} />)}
      </div>
    </>
  )
}

export default Search
