import React from "react";
import styles from "./Player.module.css";
import Score from "./Score";

export default function Player({ player, handleNameChange, idx }) {
  return (
    <section
      className={`${styles.player}
        ${player.isActive ? styles.active : ""} 
        ${player.isWinner ? styles.winner : ""}`}
    >
      <input
        className={styles.playerName}
        value={player.playerName}
        onChange={(e) => handleNameChange(e, idx)}
      />
      <div className={styles.totalScore}>{player.totalScore}</div>
      {player.isWinner && <div className={styles.winnerText}>You Win!!!</div>}
      <Score currentScore={player.currentScore} />
    </section>
  );
}
