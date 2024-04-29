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

var basepath = "http://localhost/api/v1/db"
var sports_mgr_hostname = "https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app"

// const searchBtn = document.getElementById('search-btn')
// window.addEventListener('load', function(){
//     searchBtn.addEventListener('click', function(){
//         listTodos()
//     })
// })

function listTodos() {
    console.log("sending request to gh-sport-mgr")
    try {
        fetch('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/db', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    } catch (error) {
        console.log(error)
    }
}


