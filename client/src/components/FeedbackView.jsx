import React from 'react'
import styles from './feedback.module.css'
import { FeedBackCard } from './FeedBackCard'

export const FeedbackView = ({employees}) => {

  return (
    <div className={styles.mainContainer}>
      <h1>Employee feedback</h1>
      <div className={styles.container}>
          {employees.map(employee => (
            <FeedBackCard key={employee.id} employee={employee} />
          ))}
      </div>
    </div>
  )
}
