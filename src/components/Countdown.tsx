import { useContext, useMemo } from 'react'
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const { 
    minutes, 
    seconds, 
    isActive, 
    hasFinished, 
    startCountdown, 
    resetCountdown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = useMemo(() => {
    return String(minutes).padStart(2, '0').split('');
  }, [minutes])

  const [secondLeft, secondRight] = useMemo(() => {
    return String(seconds).padStart(2, '0').split('');
  }, [seconds])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button 
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button 
              type="button" 
              onClick={resetCountdown}
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button 
              type="button" 
              onClick={startCountdown}
              className={styles.countdownButton}
            >
              Iniciar ciclo
            </button>
          )}
        </>
      )}
      
    </div>
  )
}