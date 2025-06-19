import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'

import UserModal from '../userModal/modal';
import CalendarModal from './calendarModal/modal';

import './calendar.css';

const Calendar = ({ eventList }) => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');

  const [calendarModalVisibility, setCalendarModalVisibility ] = useState(false);
  const [clickedEventInfo, setClickedEventInfo] = useState({});

  const calendarRef = useRef(null)

  const handleEventClick = (info) => {
    const currentDate = Date.now().valueOf()
    const eventDate = info._def.extendedProps.startDate.valueOf()

    if (currentDate < eventDate) {
      setCalendarModalVisibility(true)
      setClickedEventInfo(info._def.extendedProps)
    }
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
          events={eventList}
          eventClick={(eventInfo) => handleEventClick(eventInfo.event)}
          ref={calendarRef}
        />
        
        <CalendarModal modalVisibility={calendarModalVisibility} setModalVisibility={setCalendarModalVisibility} info={clickedEventInfo} />
      </div>

    </>
  )
}

export default Calendar
