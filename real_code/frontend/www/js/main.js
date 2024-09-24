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

function listData(query) {
    let endpoint = '/api/v1/sport'
    
    if (query) {
        endpoint += query
    }
    
    console.log(`sending request to ${sports_mgr_hostname, endpoint}`)
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
            renderSavedList(data)
        })
    } catch (error) {
        console.log(error)
    }
}

// !Container div
function renderListData(data) {
    console.log('Returned data:', data)
    const dataContainer = document.querySelector('.data-container')
    
    data.forEach(element => {
        const div = document.createElement('div')
        div.classList.add('container')
        
        const content = renderData(element)
        const buttons = renderButtons()
        
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
    h2.innerHTML = element.sport + ' Signup for ' + element.date
    
    if(saved != 'true') {
        h2.classList = 'container-title'
    }
    div.appendChild(h2)

    const location = document.createElement('p')
    location.innerHTML = 'Location: ' + element.location
    div.appendChild(location)
    
    const date = document.createElement('p')
    date.innerHTML = 'Time: ' + element.time
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
function renderButtons() {
    const div = document.createElement('div')
    div.classList.add('container-btns')

    const saveBtn = document.createElement('button')
    saveBtn.innerHTML = 'Save'
    div.appendChild(saveBtn)
    
    const signupBtn = document.createElement('button')
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

function signup() {
    const name = document.getElementById('signup-name').value
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value

    const endpoint = '/api/v1/signup'
    
    console.log(`sending request to ${user_mgr_hostname}`)
    try {
        fetch(user_mgr_hostname + endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: {name, email, password}
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            console.log('finished')
        })
    } catch (error) {
        console.log(error)
    }
}

function login() {
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value
    console.log('email:', email, '. password:', password)

    const endpoint = '/api/v1/login'
    
    console.log(`sending request to ${user_mgr_hostname}`)
    try {
        fetch(user_mgr_hostname + endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            console.log('finished')
        })
    } catch (error) {
        console.log(error)
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
