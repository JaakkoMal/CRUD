import React, { useState } from 'react'
import axios from 'axios'
import styles from './feedback.module.css'

const URL = 'http://localhost:3000/feedback/'

export const FeedBackCard = ({employee}) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const [feedback, setFeedback] = useState([])
  const [average, setAverage] = useState(0)
  const [grade, setGrade] = useState('')

  const showGrades = () => {
    getFeedback(employee.id)
    setInfoVisible(true)
  }

  const getFeedback = async () => {
    axios.get(URL+employee.id)
    .then(response => {
        setFeedback(response.data)
        if( response.data.length > 0){
          let averageGrade = 0;
          response.data.forEach(data => averageGrade+= data.grade)
          setAverage(averageGrade / response.data.length)
        }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    axios.post(URL+employee.id, {
        date_of_feedback: new Date(),
        grade: grade
    })
    .then(response => {
        getFeedback()
        setGrade('')
    })
    .catch(error => console.error(error))
  }
 
  return (
    <div className={styles.cardContainer}>
      <h3>{employee.first_name} {employee.last_name}</h3>
      {infoVisible ? 
      <div className={styles.container}>
        {
        feedback.map(feedback => (
            <div key={feedback.id}>
                <h4>Feedback given on {feedback.date_of_feedback.slice(0, 10)}</h4>
                <p>Grade: {feedback.grade}</p>
            </div>
            ))
        }
        <p>Overall average: <b>{average.toFixed(2)}</b></p>
        <form onSubmit={handleSubmit}>
            <input 
                type='text'
                placeholder='Give a new grade'
                value={grade}
                onChange={e => setGrade(e.target.value)}
            />
            <input 
                type='submit'
                value='submit'
            />
        </form>
        <button onClick={() => setInfoVisible(false)}>Hide details</button>
        </div>
        :
        <div>
        <button onClick={showGrades}>Show details</button>
        </div>
        }
    </div>
  )
}
