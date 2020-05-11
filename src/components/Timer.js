import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap'

import '../styles/Timer.scss';

const Timer = (props) => {
    const [start, setStart] =  useState(false);
    const [formatCounter, setFormatCounter] = useState('00:00:00');
    let {seconds, minutes,hours} = {...props.counter};
    useEffect ( () => {
        if(props.start){
            const timer =  setInterval(() => {
                if (seconds <= 60 && seconds != 0){
                    seconds = seconds - 1;
                } else if(seconds === 0 && minutes > 0 && minutes <= 60 ){
                    minutes = minutes - 1;
                    seconds = 59;
                }
                props.setCounter((prev) => (
                        {...prev, seconds:seconds, minutes:minutes,hours:hours}
                    )
                );
                setFormatCounter(setTimerFormat());
            },1000)
            return () => clearInterval(timer);
        }
        else {
            setFormatCounter(setTimerFormat());
        }


    },[props.start,seconds, props.counter]) ;

    const handlerStart = () => {
        setStart(!start);
    }

    const setTimerFormat = () => {
        let secondsCounter = '00';
        let minutesCounter = '00';
        let hoursCounter = '00';
        
        // @ToDo Improve this part.
        if( props.counter.seconds < 10) {
            secondsCounter =  `0${props.counter.seconds}`

        }
        else {
            secondsCounter =  props.counter.seconds;
        }

        if(props.counter.minutes < 10){
            minutesCounter = `0${props.counter.minutes}`;
        }
        else  {
            minutesCounter = props.counter.minutes;
        }

        if(props.counter.hours < 10){
            hoursCounter = `0${props.counter.hours}`;
        }
        else {
            hoursCounter = props.counter.hours;
        }

        const formatTime = `${hoursCounter}:${minutesCounter}:${secondsCounter}`;
        return formatTime;
    }

    return (
        <div className="timer">
            <div className='timer__counter'>{formatCounter}</div>
            <Button onClick={handlerStart} className="btn--timer " variant="outline-success">&#10148;</Button>{' '}
        </div>
    )
}

export default Timer;