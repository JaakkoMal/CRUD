const Pool = require('pg').Pool
const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432
})

const getEmployees = (req, res) => {
    pool.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.log(err)
        }
        res.status(200).json(results.rows)
    })
}

const getEmployeeById = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM employee WHERE id=$1', [id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.status(200).json(result.rows)
    })
}

const addEmployee = (req, res) => {
    const { first_name, last_name } = req.body
    pool.query('INSERT INTO employee (first_name, last_name) VALUES ($1, $2)', [first_name, last_name], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.status(201).send(`Employee ${first_name} ${last_name} added.`)
    })
}

const updateEmployee = (req, res) => {
    const id = req.params.id
    const { first_name, last_name} = req.body
    pool.query('UPDATE employee SET first_name=$1, last_name=$2 WHERE id=$3', [first_name, last_name, id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.status(200).send(`Employee (ID: ${id}) updated.`)
    })
}

const deleteEmployee = (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM employee WHERE id=$1', [id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.status(200).send(`Employee (ID: ${id}) deleted.`)
    })
}

const getEmployeeFeedbackById = (req, res) => {
    const id = req.params.id
    pool.query('SELECT first_name, last_name, date_of_feedback, grade FROM feedback JOIN employee ON feedback.employee_id=employee.id WHERE employee_id=$1', [id], (err, results) => {
        if (err) {
            console.log(err)
        }
        res.status(200).json(results.rows)
    })
}

const addEmployeeFeedback = (req, res) => {
    const id = req.params.id
    const { date_of_feedback, grade } = req.body
    pool.query('INSERT INTO feedback (date_of_feedback, grade, employee_id) VALUES ($1, $2, $3)', [date_of_feedback, grade, id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.status(201).send(`Feedback added for employee with ID ${id}`)
    })
}

module.exports = {
    getEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeFeedbackById,
    addEmployeeFeedback
}