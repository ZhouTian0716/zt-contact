import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.linkBack}>Url not Found, return home.</Link>
    </div>
  );
};

export default NotFound;
