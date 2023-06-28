import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

import styles from "./SearchInput.module.scss";

interface IProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ searchTerm, setSearchTerm }: IProps) => {
  const [val, setVal] = useState(searchTerm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <BiSearch className={styles.searchIcon} />
      <input className={styles.searchInput} value={val} onChange={handleChange} type="text" placeholder="Search..." />
    </div>
  );
};

export default SearchInput;
