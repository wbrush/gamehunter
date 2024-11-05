import { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Header from '../components/header/header'
import Modal from '../components/modal/modal'
import Hero from '../components/hero/hero'
import Select from '../components/select/select'
import SearchContainer from '../components/searchContainer/searchContainer';
import { filterData } from '../utils/functions';
import '../pagescss/search.css'

const Search = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');
  
  const [searchParams, setSearchParams] = useSearchParams()
  let response = useOutletContext()
  const [filteredResponse, setFilteredResponse] = useState([])
  const [dataLoaded, setDataLoaded] = useState([])

  const [sport, setSport] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [date, setDate] = useState(new Date())
  const [sportArray, setSportArray] = useState([])
  const [cityArray, setCityArray] = useState([])
  
  useEffect(() => {
    if (response.length > 0) {
      let tempResponse
      if(searchParams.size > 0 && dataLoaded.length == 0) {
        tempResponse = response.filter((element) => element.sport.toLowerCase() === searchParams.get('sport'))
        setSport(tempResponse[0].sport)
      } else {
        tempResponse = response
      }

      loadSearchFilters(response, null)
      setFilteredResponse(tempResponse)
    } else if (response.length == 0 && dataLoaded.length == 0) {
      fetchRequest()
      loadSearchFilters(null, dataLoaded)
    } else {
      fetchRequest()
      loadSearchFilters(null, dataLoaded)
    }
  }, [dataLoaded])

  const fetchRequest = async () => {
    const api = await fetch ('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/sport', {
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
  
        if (!cityArray.includes(element.city)) {
          cityArray.push(element.city)
        }
      })
    } else {
      dataLoaded.forEach((element) => {
        if (!sportArray.includes(element.title)) {
          sportArray.push(element.title)
        }
  
        if (element.events.length > 0) {
          for (let i = 0; i < element.events.length; i++) {
            if (!cityArray.includes(element.events[i].city)) {
              cityArray.push(element.events[i].city)
            }
          }
        }
      })
    }

    setSportArray(sportArray)
    setCityArray(cityArray)
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
          <select onChange={(option) => setCity(option.target.selectedOptions[0].innerHTML)}>
            <option>Select</option>
            <Select array={cityArray}/>
          </select>
        </div>
        
        <div>
          <p>State:</p>
          <select disabled>
            <option>Texas</option>
            {/* <Select array={stateArray}/> */}
          </select>
        </div>

        <div>
          <p>Date:</p>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </div>
      </div>

    </div>

    <div className='search-container'>
      <SearchContainer response={filteredResponse} />
    </div>
    </>
  )
}

export default Search
