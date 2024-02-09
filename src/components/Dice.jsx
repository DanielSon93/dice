import React, { useState } from "react";
import styles from "./Dice.module.css";
import Player from "./Player";
import Button from "./Button";
import { RiRefreshLine } from "react-icons/ri";
import { IoDiceOutline } from "react-icons/io5";
import { HiOutlineSave } from "react-icons/hi";

export default function Dice() {
  const [player, setPlayer] = useState(initPlayer);
  const [diceNumber, setDiceNumber] = useState(null);

  // 주사위 굴리기
  const handleRollDice = () => {
    const randomNumber = Math.ceil(Math.random() * 6);

    setDiceNumber(randomNumber);

    if (randomNumber === 1 || randomNumber === 2) {
      setDiceNumber(null);
      setPlayer((prev) =>
        prev.map((player) => {
          if (player.isActive) {
            return {
              ...player,
              currentScore: 0,
              isActive: false,
            };
          } else {
            return {
              ...player,
              isActive: true,
            };
          }
        })
      );
    } else {
      setPlayer((prev) =>
        prev.map((player) =>
          player.isActive
            ? { ...player, currentScore: player.currentScore + randomNumber }
            : { ...player }
        )
      );
    }
  };

  // 주사위 멈추기
  const handleHold = () => {
    setDiceNumber(null);

    setPlayer((prev) =>
      prev.map((player) => {
        if (player.isActive) {
          return {
            ...player,
            totalScore: player.totalScore + player.currentScore,
            currentScore: 0,
            isActive: false,
            isWinner: player.totalScore + player.currentScore >= 50 ? true : false,
          };
        } else {
          return {
            ...player,
            isActive: true,
          };
        }
      })
    );
  };

  // 게임 초기화
  const handleNewGame = () => {
    setDiceNumber(null);
    setPlayer(initPlayer);
  };

  console.log(player[0].isWinner || player[1].isWinner);

  return (
    <main className={styles.main}>
      <Player player={player[0]} />
      <Player player={player[1]} />
      <div className={`${styles.button} ${styles.btnNewGame}`} onClick={handleNewGame}>
        <Button>
          <RiRefreshLine />
          <span>NEW GAME</span>
        </Button>
      </div>
      {!(player[0].isWinner || player[1].isWinner) && (
        <div className={`${styles.button} ${styles.btnRollDice}`} onClick={handleRollDice}>
          <Button>
            <IoDiceOutline />
            <span>ROLL DICE</span>
          </Button>
        </div>
      )}
      {!(player[0].isWinner || player[1].isWinner) && (
        <div className={`${styles.button} ${styles.btnHold}`} onClick={handleHold}>
          <Button>
            <HiOutlineSave />
            <span>HOLD</span>
          </Button>
        </div>
      )}
      {diceNumber && (
        <div className={styles.diceShape}>
          <img src={`https://pig-game-v2.netlify.app/dice-${diceNumber}.png`} alt="dice" />
        </div>
      )}
    </main>
  );
}

// 선수 초기화
const initPlayer = [
  {
    playerName: "PLAYER 1",
    totalScore: 0,
    currentScore: 0,
    isActive: true,
    isWinner: false,
  },
  {
    playerName: "PLAYER 2",
    totalScore: 0,
    currentScore: 0,
    isActive: false,
    isWinner: false,
  },
];
