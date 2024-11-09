import styles from "../styles/Card.module.css";
import { SuitIcon } from "../common/types";

type Props = { value: string | number; suit: SuitIcon };

export default function PlayingCard({ value, suit }: Props) {
  const className = suit === "♥" || suit === "♦" ? styles.red : undefined;
  return (
    <section className={styles.card}>
      <div className={className}>{suit}</div>
      <div>{value as string}</div>
      <div className={className}>{suit}</div>
    </section>
  );
}
