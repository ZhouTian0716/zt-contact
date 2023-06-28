import React from 'react'
import {BiSearch} from "react-icons/bi";

import styles from "./SearchInput.module.scss";

const SearchInput = () => {
  return (
    <div className={styles.searchContainer}>
        <BiSearch className={styles.searchIcon}/>
        <input className={styles.searchInput} type="text" placeholder="Search..." />
    </div>
    
  )
}

export default SearchInput