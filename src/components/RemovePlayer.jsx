import React from "react";
import styles from "./RemovePlayer.module.css";
import { FiMinus } from "react-icons/fi";

export default function RemovePlayer({ handleRemovePlayer }) {
  return (
    <div className={styles.removePlayer} onClick={handleRemovePlayer}>
      <FiMinus />
    </div>
  );
}
