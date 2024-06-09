import React, { useEffect, useState } from 'react'
import style from './CountdownTimer.module.css'

export default function CountdownTimer({ initialCount,handleReset }) {
  const [count, setCount] = useState(initialCount);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    let timerId;

    if (isCounting && count > 0) {
      timerId = setInterval(() => {
        setCount(prevCount => {
          if (prevCount <= 1) {
            clearInterval(timerId);
            setIsCounting(false);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [isCounting, count]);

  const resetCountdown = () => {
    setCount(initialCount);
    setIsCounting(true);
  };

  // return (
  //   <div>
  //     <h1>Countdown: {count}</h1>
  //     {!isCounting && <button onClick={resetCountdown}>Restart Countdown</button>}
  //   </div>
  // );

  return (
    <div>
      {!isCounting?<button onClick={()=>{resetCountdown(),handleReset()}}>Request New Code</button>:<div>You don't received code ? Request new code After <span className='text-green-500'>{count}</span></div>}

      {/* <h1>Countdown: {count}</h1> */}
    </div>
  );
};

