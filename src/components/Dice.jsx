import React, { useState } from "react";
import styles from "./Dice.module.css";
import Player from "./Player";
import Button from "./Button";
import AddPlayer from "./AddPlayer";
import RemovePlayer from "./RemovePlayer";
import ReactDOM from "react-dom";
import { RiRefreshLine } from "react-icons/ri";
import { IoDiceOutline } from "react-icons/io5";
import { HiOutlineSave } from "react-icons/hi";

const Backdrop = ({ player }) => {
  return player.some((e) => e.isWinner) && <div className={styles.backdrop}></div>;
};

const ModalOverlay = ({ player }) => {
  const playerSort = JSON.parse(JSON.stringify(player)).sort((a, b) => b.totalScore - a.totalScore);
  return (
    playerSort.some((e) => e.isWinner) && (
      <ol className={styles.modal}>
        {playerSort.map((e) => (
          <li>
            {e.playerName} / {e.totalScore}
          </li>
        ))}
      </ol>
    )
  );
};

export default function Dice() {
  const [player, setPlayer] = useState(initPlayer);
  const [diceNumber, setDiceNumber] = useState(null);

  // 다음 플레이어 인덱스 반환
  const getNextPlayer = () => {
    const nowPlayerIdx = player.findIndex((e) => e.isActive);
    const nextPlayer = nowPlayerIdx === player.length - 1 ? 0 : nowPlayerIdx + 1;

    return nextPlayer;
  };

  // 주사위 굴리기
  const handleRollDice = () => {
    const randomNumber = Math.ceil(Math.random() * 6);
    setDiceNumber(randomNumber);

    if (randomNumber === 1 || randomNumber === 2) {
      const nextPlayer = getNextPlayer();

      setPlayer((prev) =>
        prev.map((player, idx) => {
          if (player.isActive) {
            return {
              ...player,
              currentScore: 0,
              isActive: false,
            };
          } else {
            return {
              ...player,
              isActive: idx === nextPlayer ? true : false,
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
    const nextPlayer = getNextPlayer();

    setPlayer((prev) =>
      prev.map((player, idx) => {
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
            isActive: idx === nextPlayer ? true : false,
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

  // 플레이어 추가
  const handleAddPlayer = () => {
    const newPlayer = {
      playerName: `PLAYER ${player.length + 1}`,
      totalScore: 0,
      currentScore: 0,
      isActive: false,
      isWinner: false,
    };
    setPlayer([...player, newPlayer]);
  };

  // 플레이어 제거
  const handleRemovePlayer = () => {
    if (player.length > 2) {
      setPlayer((prev) => prev.filter((_, i) => player.length - 1 !== i));
    }
  };

  // 플레이어 이름 변경
  const handleNameChange = (e, idx) => {
    const playerName = e.target.value;
    setPlayer((prev) =>
      prev.map((player, i) => (idx === i ? { ...player, playerName } : { ...player }))
    );
  };

  return (
    <main className={styles.main}>
      {player.map((e, i) => (
        <Player key={i} player={e} handleNameChange={handleNameChange} idx={i} />
      ))}
      <div className={styles.utilWrapper}>
        <div className={`${styles.button} ${styles.btnNewGame}`} onClick={handleNewGame}>
          <Button>
            <RiRefreshLine />
            <span>NEW GAME</span>
          </Button>
        </div>

        {!player.some((e) => e.isWinner) && (
          <div className={styles.button} onClick={handleRollDice}>
            <Button>
              <IoDiceOutline />
              <span>ROLL DICE</span>
            </Button>
          </div>
        )}

        {!player.some((e) => e.isWinner) && (
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
      </div>

      {!diceNumber && (
        <div className={styles.addPlayer}>
          <AddPlayer handleAddPlayer={handleAddPlayer} />
          <RemovePlayer handleRemovePlayer={handleRemovePlayer} />
        </div>
      )}

      {ReactDOM.createPortal(
        <Backdrop player={player} />,
        document.getElementById("backdrop-root")
      )}

      {ReactDOM.createPortal(
        <ModalOverlay player={player} />,
        document.getElementById("overlay-root")
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
