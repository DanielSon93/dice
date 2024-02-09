import React from "react";
import styles from "./Score.module.css";

export default function Score({ currentScore }) {
  return (
    <div className={styles.score}>
      <div className={styles.scoreTitle}>CURRENT</div>
      <div className={styles.currentScore}>{currentScore}</div>
    </div>
  );
}
