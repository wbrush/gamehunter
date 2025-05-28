import { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'

import UserModal from '../userModal/modal';
import CalendarModal from './calendarModal/modal';

import { filterData, getFetchRequest } from '../../utils/functions';

import './calendar.css';

const Calendar = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');

  const [calendarModalVisibility, setCalendarModalVisibility ] = useState(false);
  const [clickedEventInfo, setClickedEventInfo] = useState({});
  const [events, setEvents] = useState()

  const calendarRef = useRef(null)
  
  useEffect(() => {
    fetchRequest()
  }, [])

  const fetchRequest = async () => {
    const response = await getFetchRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/events/')
    const filtered = filterData(response)
    
    setEvents(filtered)
  }

  const handleEventClick = (info) => {
    window.scrollTo({top:0})
    setCalendarModalVisibility(true)
    setClickedEventInfo(info._def.extendedProps)
  }

  return (
    <>
      <UserModal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />

      <div className='calendar'>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin ]}
          headerToolbar={{
            start: 'dayGridMonth timeGridWeek',
            center: 'title',
            end: 'today prev next'
          }}
          views={['dayGridMonth', 'timeGridWeek']}
          initialView='dayGridMonth'
          firstDay={1}
          allDaySlot={false}
          slotLabelFormat={{
            hour: 'numeric'
          }}
          slotDuration={'01:00'}
          contentHeight='auto'
          events={events}
          eventClick={(eventInfo) => handleEventClick(eventInfo.event)}
          ref={calendarRef}
        />
      </div>

      <CalendarModal modalVisibility={calendarModalVisibility} setModalVisibility={setCalendarModalVisibility} info={clickedEventInfo} />
    </>
  )
}

export default Calendar
