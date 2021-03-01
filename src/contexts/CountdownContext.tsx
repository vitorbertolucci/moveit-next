import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { ChallengesContext } from "./ChallengeContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown(): void;
  resetCountdown(): void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);
  
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  } , [isActive, time])

  const startCountdown = useCallback(() => { 
    setIsActive(true);
  } ,[])

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeout);
    setHasFinished(false);
    setIsActive(false);
    setTime(0.1 * 60);
  }, [])

  const minutes = useMemo(() => {
    return Math.floor(time / 60);
  }, [time])

  const seconds = useMemo(() => {
    return time % 60;
  }, [time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}