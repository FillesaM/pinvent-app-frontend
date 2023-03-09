import styles from "./search.module.scss";
import { BiSearch } from "react-icons/bi";

import React from 'react'

const Search = ({value,onChange}) => {
  return (
    <div className={styles.search}>
        <BiSearch size={18} className={styles.icon}/>
        <input type="text" placeholder="Search product" value={value} onChange={onChange}/>
    </div>
  )
}

export default Search