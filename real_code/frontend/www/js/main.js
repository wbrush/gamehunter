/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const sports_mgr_hostname = "https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app"
const user_mgr_hostname = "https://gh-user-mgr-462896897923.us-central1.run.app"
const event_mgr_hostname = ''

function listData(query) {
    let endpoint = '/api/v1/sport'
    
    if (query) {
        endpoint += query
    }
    
    console.log(`sending request to ${sports_mgr_hostname}`)
    try {
        fetch(sports_mgr_hostname + endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            renderListData(data)

            if (!query) {
                renderSavedList(data)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// !Container div
function renderListData(data) {
    const dataContainer = document.querySelector('.data-container')
    dataContainer.innerHTML = ''
    
    data.forEach(element => {
        const div = document.createElement('div')
        div.classList.add('container')
        
        const content = renderData(element)
        const buttons = renderButtons(element)
        
        div.appendChild(content)
        div.appendChild(buttons)

        dataContainer.appendChild(div)
    })
}

// !Content div
function renderData(element, saved) {
    const div = document.createElement('div')
    div.classList.add('content')

    const h2 = document.createElement('h2')
    let sportName = element.sport
    sportName = sportName.split('')
    sportName[0] = sportName[0].toUpperCase()
    sportName = sportName.join('')
    
    let eventDate = formatDate(element.date)
    eventDate = eventDate.split(',')
    h2.innerHTML = sportName + ' signup for ' + eventDate[0]
    
    if(saved != 'true') {
        h2.classList = 'container-title'
    }
    div.appendChild(h2)

    const location = document.createElement('p')
    location.innerHTML = 'Location: ' + element.location
    div.appendChild(location)
    
    const date = document.createElement('p')
    let eventTime = formatDate(element.date)
    eventTime = eventTime.split(',')
    date.innerHTML = 'Time: ' + eventTime[1]
    div.appendChild(date)

    if (saved == 'true') {
        const btnDiv = document.createElement('div')
        btnDiv.classList.add('container-btns')

        const removeBtn = document.createElement('button')
        removeBtn.innerHTML = 'Remove'
        div.appendChild(removeBtn)
    }


    return div
}

// !Button div
function renderButtons(element) {
    const div = document.createElement('div')
    div.classList.add('container-btns')

    const saveBtn = document.createElement('button')
    saveBtn.id = `${element.id}`
    saveBtn.onclick = function() {saveEvent(element, 'save')}
    saveBtn.innerHTML = 'Save'
    div.appendChild(saveBtn)
    
    const signupBtn = document.createElement('button')
    signupBtn.id = `${element.id}`
    signupBtn.onclick = function() {saveEvent(element, 'signup')}
    signupBtn.innerHTML = 'Signup'
    div.appendChild(signupBtn)

    return div
}

function renderSavedList(data) {
    const savedContainer = document.querySelector('.saved-events')
    
    const h2 = document.createElement('h2')
    h2.innerHTML = 'Saved Events'
    h2.id = 'header'
    savedContainer.appendChild(h2)
    
    const div = document.createElement('div')
    div.classList.add('list')
    
    data.forEach(element => {
        const content = renderData(element, 'true')
        div.appendChild(content)
        
        savedContainer.appendChild(div)
    })
}

function search() {
    const date = $('#datepicker').val()
    const sport = $('#selection').val()
    const location = $('#location').val()
    let query = {}
    
    if (!date || !sport || !location) {
        alert('Please fill out all search parameters')
    } else {
        query = `?sport=${sport}&location=${location}&date=${date}`
    }
    
    listData(query)
}

async function signup() {
    name = document.getElementById('signup-name').value
    email = document.getElementById('signup-email').value
    password = document.getElementById('signup-password').value
    document.querySelector('.sform-error').id = 'hidden'
    document.querySelector('.signup-error').id = 'hidden'
    
    const endpoint = '/api/v1/signup'
    
    if (name && email && password) {
        console.log(`sending signup request to ${user_mgr_hostname}`)
        
        await fetch(user_mgr_hostname + endpoint, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.result) {
                // Clear form and hide modal on successful signup
                const form = document.querySelector('.signup')
                form.reset()
                document.querySelector('.user-modal').id = 'hidden'
            } else {
                document.querySelector('.signup-error').id = ''
            }
        })
    } else {
        document.querySelector('.sform-error').id = ''
    }
}

async function login() {
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value
    document.querySelector('.lform-error').id = 'hidden'
    document.querySelector('.login-error').id = 'hidden'
    
    const endpoint = '/api/v1/login'
    
    if (email && password) {
        console.log(`sending login request to ${user_mgr_hostname}`)

        await fetch(user_mgr_hostname + endpoint, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.result) {
                // Clear form and hide modal on successful login
                const form = document.querySelector('.login')
                form.reset()
                document.querySelector('.user-modal').id = 'hidden'
            } else {
                document.querySelector('.login-error').id = ''
            }
        })
    } else {
        document.querySelector('.lform-error').id = ''
    }
}

function displayLogin() {
    // display modal
    document.querySelector(".user-modal").id = ""
    
    // display login info
    document.querySelector(".signup").id = "hidden"
    document.querySelector(".login").id = ""

    // disable scrolling when modal is open
    document.getElementById("scroll-body").style.overflow = "hidden"
}

function displaySignup() {
    // display modal
    document.querySelector(".user-modal").id = ""
    
    // display signup info
    document.querySelector(".signup").id = ""
    document.querySelector(".login").id = "hidden"
    
    // disable scrolling when modal is open
    document.getElementById("scroll-body").style.overflow = "hidden"
}

function formatDate(date) {
    const formattedDate = new Date(date).toLocaleString()
    return formattedDate
}

async function saveEvent(event, method) {
    const endpoint = `/api/v1/saveEvent`

    if (method == 'save') {
        console.log('save button', event.id, 'clicked')
        
        // change condition to is logged in when functional
        if (true) {
            console.log(`sending save request to ${event_mgr_hostname}`)
            
            // replace with session user id
            const user = 7

            await fetch(event_mgr_hostname + endpoint + '/save', {
                method: 'POST',
                body: JSON.stringify({ user_id: user, event_id: event.id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
        } else {
            alert('Please login to save events')
        }
    } else {
        console.log('signup button', e.id, 'clicked')
    }
}
