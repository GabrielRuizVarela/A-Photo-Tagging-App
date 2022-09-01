import React, { useEffect } from 'react';

function Timer({ allFound }: { allFound: boolean }) {
  const [time, setTime] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  // const [timerId, setTimerId] = React.useState(0);
  let timerId = 0;
  const tick = () => {
    setTime(time + 1);
  };
  useEffect(() => {
    // when all images are loaded, start the timer
    const images = document.querySelectorAll('img');
    const imagesLength = images.length;
    if (!allFound) {
      if (!loaded) {
        let imagesLoaded = 0;
        images.forEach((image) => {
          // eslint-disable-next-line no-param-reassign
          image.onload = () => {
            imagesLoaded += 1;
            if (imagesLoaded === imagesLength) {
              setLoaded(true);
              timerId = setInterval(tick, 1000);
            }
          };
        });
      } else {
        timerId = setInterval(() => {
          tick();
        }, 1000);
      }
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [time]);

  return (
    <div>
      <h1>Timer</h1>
      <div>{time}</div>
    </div>
  );
}

export default Timer;
