import React, {useState, useEffect} from 'react'
import styled, {keyframes} from 'styled-components'

const TimerInput = styled.input`
  width: 100px;
  height: 50px;
  margin: 20px;
  border-radius: 50px;
  text-align:center;
  outline: none;
  border: 1px solid lightblue;
  font-size: 30px;
`
const Container = styled.div`
  background-color: #add8e6;
  width: 500px;
  left: 50%;
  top: 50%;
  padding: 20px;
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 50px;
`;

const Header = styled.div`
  font-size: 36px;
  font-family: Helvetica Neue;
  color: teal;
  text-align:center;
  font-weight: 800;
  padding: 30px;

`
const pulseRing = keyframes`
  0% {
    transform: scale(.33);
  }
  80%, 100% {
    opacity: 0;
  }
}
`
const pulseDot = keyframes`
  0% {
    transform: scale(.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(.8);
  }
}
`
const TimeContainer = styled.div`
&:after {
  content: '';
  position:absolute;
  background-color: #01a4e9;
  width: 150%;
  height: 150%;
  border-radius: 50%;
  z-index: -1;
  animation: ${pulseRing} 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}
    background-color: #74B8BE;
    font-size: 36px;
    padding: 10px;
    border: 1px solid #74B8BE;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    color: white;
    display:flex;
    align-items:center;
    justify-content: center;
    margin: 50px auto;
    padding: 50px;
      box-shadow: 0 0 8px rgba(0,0,0,.3);
      animation: ${pulseDot} 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite;
  
`;



const Button = styled.button`
    background-color: white;
    padding: 20px;
    color: teal;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    outline: none;
    border: 2px solid white;
    border-radius: 5px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`

const App = () => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [counter, setCounter] = useState(hours* 3600 + minutes * 60 + seconds)
  const [isActive, setIsActive] = useState(false)


  const handleHoursChange = (e) => {
    setHours(e.target.value)
  }

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value)
  }

  const handleSecondsChange = (e) => {
    setSeconds(e.target.value)
  }
  
  const getTime = () => {
    setCounter(counter-1)
    if(isActive) {
      if(seconds > 0) {
      setSeconds(seconds-1);
      setCounter(counter+1)
    } else if(seconds == 0) {
      if(minutes > 0) {
        setMinutes(minutes-1)
        setSeconds(59)
      } else if (minutes == 0) {
        if(hours > 1) {
          setHours(hours-1)
          setMinutes(59)
          setSeconds(59)
        }
      }
    }
    
  }
}

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000)
    return () => clearInterval(interval)
  })
  

 
  return (
    <Container>
      <Header>Pomodoro Timer</Header>
      <TimerInput className="timeInput" type="number"  name="hours" value={hours == 0? '00' : String(hours)} onChange={handleHoursChange} />  : 
      <TimerInput className="timeInput" type="number"  name="minutes" value={minutes == 0 ? '00' : String(minutes)} onChange={handleMinutesChange} />
      <TimerInput className="timeInput" type="number"  name="seconds" value={seconds == 0 ? '00' : String(seconds)} onChange={handleSecondsChange} />
      
      
        <TimeContainer>{hours == 0? '00' : String(hours)} : {minutes == 0 ? '00' : String(minutes)}: {seconds == 0 ? '00' : String(seconds)}</TimeContainer>
        <div>
        <Button onClick={() => setIsActive(!isActive)}>{isActive ? "Pause": "Start"}</Button>
        </div>
        
        </Container>
   
  )
}

export default App;
