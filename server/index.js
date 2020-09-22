const express = require('express')
const app = express()
const port = 3000


/* 
Build a single RESTful microservice accessible over HTTP 
(HTTPS is not required) that provides basic CRUD methods 
to list, get, create, update, and delete student records. 
The list method must support pagination 
(specifying an index, count, and sort order) 
and should include an x-total-count header 
so that the client understands the total number of records available. 
The RESTful API should support basic authentication
 using a simple username and token (can be hardwired). 
 The student database should be populated with approximately 200 records 
 (fake data with non-sensical fields is fine). 
 The microservice can be built using any framework and/or language.
*/
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})