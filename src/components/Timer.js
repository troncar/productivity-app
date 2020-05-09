import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap'

import '../styles/Timer.scss';

const Timer = () => {

    const [start, setStart] =  useState(false);
    const [counter, setCounter] = useState({seconds: 0, minutes:0, hours: 0})
    const [formatCounter, setFormatCounter] = useState('00:00:00');

    useEffect ( () => {
        if(start){
            const timer =  setInterval(() => {
                let {seconds,minutes,hours} = {...counter};
                
                if(counter.seconds > 0 && (counter.seconds % 60) === 0) {
                    minutes = minutes + 1;
                    seconds = 0;
                }
                else {
                    seconds = seconds + 1;
                }
                if(counter.minutes > 0 && (counter.minutes % 60) === 0) {
                    minutes = 0;
                    hours = hours + 1;

                }
                setCounter((prev) => (
                        {...prev, seconds:seconds, minutes:minutes,hours:hours}
                    )
                );
                setFormatCounter(setTimerFormat());
            },1000)
            return () => clearInterval(timer);
        }


    },[start,counter.seconds]) ;

    const handlerStart = () => {
        setStart(!start);
    }

    const setTimerFormat = () => {
        let secondsCounter = '00';
        let minutesCounter = '00';
        let hoursCounter = '00';

        if( counter.seconds < 10) {
            secondsCounter =  `0${counter.seconds}`

        }
        else {
            secondsCounter =  counter.seconds;
        }

        if(counter.minutes < 10){
            minutesCounter = `0${counter.minutes}`;
        }
        else  {
            minutesCounter = counter.minutes;
        }

        if(counter.hours < 10){
            hoursCounter = `0${counter.hours}`;
        }
        else {
            hoursCounter = counter.hours;
        }

        const formatTime = `${hoursCounter}:${minutesCounter}:${secondsCounter}`;
        return formatTime;
    }

    return (
        <div className="timer">
            <Button onClick={handlerStart} className="btn--timer " variant="outline-success">&#10148;</Button>{' '}
            <div className='timer__counter'>{formatCounter}</div>
        </div>
    )
}

export default Timer;