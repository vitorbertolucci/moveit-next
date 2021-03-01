import { useCallback, useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  const handleChallengeSucceeded = useCallback(() => { 
    completeChallenge();
    resetCountdown();
   }, [completeChallenge, resetCountdown]);

  const handleChallengeFailed = useCallback(() => { 
    resetChallenge();
    resetCountdown();
  }, [resetChallenge, resetCountdown]);

  return (
    <div className={styles.challengeBoxContainer}>
      {!!activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button 
              className={styles.challengeFailedButton}
              type="button"
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button 
              className={styles.challengeSucceededButton}
              type="button"
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>

          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  )
}