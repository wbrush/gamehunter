const filterData = (events) => {
    const temp = []
    
    events.forEach((event) => {
        let title = ''

        if (event.event_type.toLowerCase() === 'open') {
            title = 'Open Gym'
        } else {
            title = 'Reserved Court'
        }
        
        // console.log('event', event)
        const tempStart = new Date(event.start_date)
        const tempEnd = new Date(event.end_date)

        temp.push({
            title: title,
            start: event.start_date,
            end: event.end_date,
            extendedProps: {
                id: event.id,
                players: event.players,
                event_type: event.event_type,
                start_date: tempStart,
                end_date: tempEnd
            }
        })
    })

    return temp
}

const filterUserEvents = (data) => {
    const currentTimestamp = new Date(Date.now()).valueOf()
    const events = {
        upcoming: [],
        past: []
    }

    data.forEach(element => {
        const elementDate = new Date(element.start_date).valueOf()

        if (currentTimestamp < elementDate) {
            events.upcoming.push(element)
        } else {
            events.past.push(element)
        }
    })

    return events
}

const formatTime = (time) => {
    return time.split('T')[1].split('.')[0]
}

const formatISOTime = (time) => {
    time = time.split(':')
    time.pop()

    if (time[0] > 12) {
        time[0] = Number(time[0]) - 12
        time[1] += ' PM'
    } else if (time[0] == 12 && time[1] > 0) {
        time[1] += ' PM'
    } else {
        time [1] += ' AM'
    }
    
    return time.join(':')
}

const formatDate = (date) => {
    return date.split('T')[0]
}

// GET Request
const getFetchRequest = async (url) => {
    const api = await fetch (url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })

    const apijson = await api.json()
    return apijson
}

// GET Request for user events
const getEventRequest = async (url) => {
    const api = await fetch (url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })

    const apijson = await api.json()
    return apijson
}

// User POST Request
const postFetchRequest = async (url, data) => {
    const api = await fetch (url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': `${data.name}`,
            'email': `${data.email}`,
            'password': `${data.password}`
        })
    })

    const apiJson = await api.json()
    return apiJson
}

// Save/Remove Event POST Request
const postEventRequest = async (url, data) => {
    const api = await fetch (url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'userId': `${data.user}`,
            'eventId': `${data.event}`,
        })
    })

    const apiJson = await api.json()
    return apiJson
}

// Create Event POST Request
const postCreateEventRequest = async (url, data) => {
    const api = await fetch (url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    const apiJson = await api.json()
    return apiJson
}

// Update player count POST Request
const postPlayerCountRequest = async (url, eventId) => {
    const api = await fetch (url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': eventId,
        })
    })

    const apiJson = await api.json()
    return apiJson
}

export { filterData, getFetchRequest, getEventRequest, postFetchRequest, postEventRequest, postCreateEventRequest, postPlayerCountRequest, filterUserEvents, formatTime, formatISOTime, formatDate }
