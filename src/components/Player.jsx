import React from "react";
import styles from "./Player.module.css";
import Score from "./Score";

export default function Player({ player }) {
  return (
    <section
      className={`${styles.player} 
        ${player.isActive ? styles.active : ""} 
        ${player.isWinner ? styles.winner : ""}`}
    >
      <h1 className={styles.playerName}>{player.playerName}</h1>
      <div className={styles.totalScore}>{player.totalScore}</div>
      {player.isWinner && <div className={styles.winnerText}>You Win!!!</div>}
      <Score currentScore={player.currentScore} />
    </section>
  );
}
