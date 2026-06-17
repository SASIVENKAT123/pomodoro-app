
import { useState, useEffect, useRef} from "react";
import OnboardingModal from "./components/OnboardingModal";

function App() {
  const getSessionData = () => {

    const sessionData = sessionStorage.getItem("pomodoroSession");
      return sessionData? JSON.parse(sessionData) : null;
  };

  // step:1 State (app memory)

  const [userData, setUserData]  = useState(() => getSessionData());
  const[showOnboarding, setShowOnboarding] = useState(() => {
    const data = getSessionData();
    return !data;
  });
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [planQueue, setPlanQueue] = useState([]);

  const [minutes, setMinutes] = useState(() => {
    const data = getSessionData();
    return data ? data.focusTime :25;
  });
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [totalSec, setTotalSec]= useState(0)




  const handleGenricPomodoro = (data) => {
    sessionStorage.setItem("pomodoroSession", JSON.stringify(data));
    setUserData(data);
    setMinutes(data.focusTime);
    setShowOnboarding(false);
  }

  const handleInitialPlan = (data) => {
    setUserData(data);
    setShowOnboarding(false);
    setShowPlanModal(true);
  }

  const alarm = useRef(typeof Audio!== "undefined"? new Audio("/timer.mp3"):null );
  // step 2: the countdown engine
  useEffect(() => {
    if (!isRunning) return //if pauses do nothing

    const interval = setInterval(() => {


      if (!isBreak) setTotalSec(t => t+1) //only count focuses time not breaks

      if (seconds > 0) {
        setSeconds(s => s-1)
      }else if (minutes > 0) {
        setMinutes(m => m-1)
        setSeconds(59)
      }else {

        if (alarm.current){
          alarm.current.play().catch(err => console.error("Audio error:", err));

        }

        const configuredFocus = userData?.focusTime || 25
        const configuredBreak = userData?.breakTime || 5
        //timer hits 00 : 00 -- switch modes
        if (!isBreak) {
          setIsBreak(true)
          setMinutes(configuredBreak)
          setSeconds(0)
        } else {
          setIsBreak(false)
          setMinutes(configuredFocus)
          setSeconds(0)

        }

      }
      
    },1000)

    return () => clearInterval(interval) //cleanup when paused or unmounted

  
  }, [isRunning, minutes, seconds, isBreak, userData])

  //step-3 : helper functions
  const pad = (n) => String(n).padStart(2, "0")
  //pad(5) = 05 and pad(25)= 25

  const focusMin = Math.floor(totalSec / 60)
  const focusSec = totalSec % 60

  //step - 4 ui jsx
  return (
    <>

      {showOnboarding && (
        <OnboardingModal
          onComplete={handleInitialPlan}
          onGeneric={handleGenricPomodoro}
        />
      )}

      {!showOnboarding && !showPlanModal && (

        <div className={`min-h-screen flex flex-col transition-colors duration-700 ${isBreak ? "bg-blue-950" : "bg-green-900"}`}>

        {/* //header */}

          <header className="flex justify-between items-center px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/25" />
                <span className ="text-[#D4AF37] font-bold font-sans">Welcome, <strong>{userData?.name|| "Guest"}</strong></span>
              
            </div>

            <nav className ="flex gap-6 text-white/50 text-sm font-sans">
              <a href="#" className="hover:text-white">Plan your day</a>
              <a href="#" className="hover:text-white">Change Timer</a>
              <a href="#" className="hover:text-white">Change color</a>
            </nav>
          </header>

          <main className="flex-1 flex flex-col items-center justify-center">
            <p className="text-white/100 text-sm uppercase tracking-widest mb-0 font-sans">
              {isBreak ? "☕ Break Time" : "🎯 Focus Time"}
            </p>

            <div className="text-white text-center w-[70%] font-mono font-black" style={{fontSize: "clamp(4rem, 15vw, 20rem)"}}>
              {pad(minutes)}:{pad(seconds)}
            </div>

            <button onClick={() => setIsRunning(!isRunning)} className="mt-2 mb-8 w-170 px-8 py-4 bg-black text-white rounded-full text-sm tracking-widest uppercase font-bold font-sans hover:bg-red-900 transition-colors">
              {isRunning ? "PAUSE" : "START TIMER"}
            </button>


          </main>
          <footer className="text-center py-5 text-white/50 text-lg font-sans">
            You have been productive for {" "}
            <strong className="text-white/80">"{pad(focusMin)} : {pad(focusSec)}"</strong>
            minutes today - keep going <strong className="text-white/80">{userData?.name || "Guest"}</strong>
            
          </footer>
        </div>
      )}
    </>
  )
  
}
export default App

