const filterData = (events) => {
    const temp = []

    events.forEach((event) => {
        let title = ''

        if (event.eventType === 'Open') {
            title = 'Open Gym'
        } else {
            title = 'Reserved Court'
        }

        temp.push({
            title: title,
            start: event.startDate,
            end: event.endDate,
            extendedProps: {
                players: event.players,
                title: title,
                startDate: formatDate(event.startDate.toISOString()),
                endDate: formatDate(event.endDate.toISOString()),
                startTime: formatTime(event.startDate.toISOString()),
                endTime: formatTime(event.endDate.toISOString())
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
        const elementDate = new Date(element.date).valueOf()

        element.date = element.date.split('T')

        if (currentTimestamp < elementDate) {
        element.sport = element.sport.charAt(0).toUpperCase() + element.sport.slice(1)
        element.time = formatTime(element.date[1])
        element.date = formatDate(element.date[0])

        events.upcoming.push(element)
        } else {
        element.sport = element.sport.charAt(0).toUpperCase() + element.sport.slice(1)
        element.time = formatTime(element.date[1])
        element.date = formatDate(element.date[0])

        events.past.push(element)
        }
    })

    return events
}

const formatTime = (time) => {
    return time.split('T')[1].split('.')[0]
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

export { filterData, getFetchRequest, getEventRequest, postFetchRequest, postEventRequest, postCreateEventRequest, filterUserEvents, formatTime, formatDate }
