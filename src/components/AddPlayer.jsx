import React from "react";
import styles from "./AddPlayer.module.css";
import { IoMdAdd } from "react-icons/io";

export default function AddPlayer({ handleAddPlayer }) {
  return (
    <div className={styles.addPlayer} onClick={handleAddPlayer}>
      <IoMdAdd />
    </div>
  );
}
