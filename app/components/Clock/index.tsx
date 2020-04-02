import React, { useState, useEffect } from 'react'
import moment from 'moment'
import business from 'moment-business'

moment.locale('nl')

// tslint:disable-next-line: no-empty-interface
interface IProps {

}

const useTimer = (currentDateTime: Date): Date => {
  const [date, setDate] = useState(currentDateTime)
  const tick = () => setDate(new Date(currentDateTime))

  useEffect(() => {
    const timerInterval = setInterval(() => tick(), 1000)
    return () => {
      clearInterval(timerInterval)
    }
  })

  return date
}

const Clock: React.FunctionComponent<IProps> = () => {
  const time = useTimer(new Date())
  return (
    <div className="card">
      <div className="card-header">
        {business.isWeekDay(moment(time)) ? (
          <b>Make this day count!</b>
        ) : (
          <i>Relax and read a Medium post</i>
        )}
      </div>
      <div className="card-body">
        <p className="card-text">{moment(time).format('LTS')}</p>
        <p className="card-text">
          today is {moment(time).format('ll')}
          <br />
          {moment(time).format('YYYY-MM-DD')}
        </p>
      </div>
    </div>
  )
}

export { Clock }
