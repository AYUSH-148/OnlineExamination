import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Counter = (props) => {
  // -----------
  const style = {
    color: "f7f9fd"
  }
  // -----------
  const navigate = useNavigate();
  
  const {dur,subId,std_id} = props;

  const [time, setTime] = useState({ hours:'..' ,minutes:'..', seconds:'..'});

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTime({ hours: dur.hours, minutes: dur.minutes, seconds: dur.seconds });
      const interval = setInterval( async() => {
        countdown();
      }, 1000);
      return () => clearInterval(interval);

    },3000);
    return () => clearTimeout(timeoutId);
  }, [dur]); 

  const countdown = () => {
    setTime(prevTime => {
      let hours = parseInt(prevTime.hours);
      let minutes = parseInt(prevTime.minutes);
      let seconds = parseInt(prevTime.seconds);

      if (minutes === 0 && seconds === 0&& hours == 0) {
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
    navigate(`/getResponse/${std_id}/${subId}`);
  };
  
  return (
    <div className="  text-xl  border-black border-4 text-center py-1 px-2  rounded  text-black ">
      {time.hours ==='..'?<i className="fa-solid fa-clock " style={style}></i>:
        <div>
          <span id="hours">{time.hours} </span>:
          <span id="minutes">{time.minutes} </span>:
          <span id="seconds">{time.seconds}</span>
        </div>
      }
    </div>
    // <div>hello</div>
  );
};

export default Counter;
