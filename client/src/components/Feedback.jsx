import React, { useEffect, useState } from 'react'
import { FeedbackView } from './FeedbackView'

const URL = 'http://localhost:3000/'

export const Feedback = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch(URL+'employees')
    .then(res => res.json())
    .then(response => {
        setEmployees(response)
    })
    .catch(error => console.log(error))
  })

  return (
    <FeedbackView employees={employees} />
  )
}
