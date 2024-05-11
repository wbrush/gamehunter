const express = require('express')
const app = require('./index')

const port = process.env.PORT || 9000

const server = app.app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

module.exports = server
