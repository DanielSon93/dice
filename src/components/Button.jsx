import React from "react";
import styles from "./Button.module.css";

export default function Button({ children }) {
  return (
    <button type="button" className={styles.button}>
      {children}
    </button>
  );
}
