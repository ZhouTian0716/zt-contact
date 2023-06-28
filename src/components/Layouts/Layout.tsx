import styles from "./Layout.module.scss";
import { AiFillClockCircle, AiOutlineHome } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";
import { BiSolidStar, BiSolidUserCircle } from "react-icons/bi";
import { IoIosKeypad } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.bgPhone}>
        <header className={styles.header}>
          <Link to="/">
            <AiOutlineHome fontSize="2rem" />
          </Link>

          <button className={styles.addBtn}>
            <GrFormAdd />
          </button>
        </header>
        <Outlet />
        <footer className={styles.footer}>
          <div className={styles.footerOptions}>
            <BiSolidStar className={styles.optionIcon} />
            <small>Favourites</small>
          </div>
          <div className={styles.footerOptions}>
            <AiFillClockCircle className={styles.optionIcon} />
            <small>Recent</small>
          </div>
          <div className={styles.footerOptions}>
            <BiSolidUserCircle className={`${styles.optionIcon} ${styles.active}`} />
            <small>Contacts</small>
          </div>
          <div className={styles.footerOptions}>
            <IoIosKeypad className={styles.optionIcon} />
            <small>Keypad</small>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
