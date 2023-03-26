const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000;
const db = require('./queries')

app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


app.get('/', (req, res) => {
    res.send('Welcome')
})

// Employees
app.get('/employees', db.getEmployees)
app.get('/employees/:id', db.getEmployeeById)
app.post('/employees', db.addEmployee)
app.put('/employees/:id', db.updateEmployee)
app.delete('/employees/:id', db.deleteEmployee)

// Feedback
app.get('/feedback/:id', db.getEmployeeFeedbackById)
app.post('/feedback/:id', db.addEmployeeFeedback)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})