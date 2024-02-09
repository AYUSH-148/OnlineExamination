import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Counter = (props) => {
  const {subId} = props;
  const navigate = useNavigate();
 
  const [time, setTime] = useState({ hours: '00',minutes: '00', seconds: '30' });

  useEffect(() => {
    const interval = setInterval(() => {
      countdown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const countdown = () => {
    setTime(prevTime => {
      let hours = parseInt(prevTime.hours);
      let minutes = parseInt(prevTime.minutes);
      let seconds = parseInt(prevTime.seconds);

      if (minutes === 0 && seconds === 0&& hours == 0) {
        // Call a function when the timer reaches 00:00
        handleTimerEnd();
      }
      else if(minutes===0 && hours>0 && seconds ===0){
        hours-=1;
        minutes = 59;
        seconds = 59;
      }
      else if (seconds === 0) {
        minutes -= 1;
        seconds = 59;
      } else {
        seconds -= 1;
      }

      hours = hours.toString().padStart(2,'0');
      minutes = minutes.toString().padStart(2, '0');
      seconds = seconds.toString().padStart(2, '0');

      return { hours,minutes, seconds };
    });
  };

  const handleTimerEnd = () => {
    console.log('Timer ended!');
    // navigate(`/getMarks/${subId}`);
    // Call any function you want to execute when the timer ends
  };

  return (
    <div>
      <div className="digital-watch">
        <span id="hours">{time.hours}</span>:
        <span id="minutes">{time.minutes}</span>:
        <span id="seconds">{time.seconds}</span>
      </div>
    </div>
  );
};

export default Counter;
