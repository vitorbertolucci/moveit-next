import { useContext, useMemo } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = useMemo(() => {
    return Math.round((currentExperience * 100) / experienceToNextLevel);
  }, [currentExperience, experienceToNextLevel]);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div >
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span style={{ left: `${percentToNextLevel}%` }} className={styles.currentExperience}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}