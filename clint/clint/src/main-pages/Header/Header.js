import React from 'react'
import style from "./Header.module.css"
import Image from 'next/image'

import { useRouter } from 'next/router'


const Header = () => {
  const router = useRouter()
  return (
    <div className={style.main_div}>
      <div className={style.logo} onClick={() => router.push("/")}>
        BITE&BREF
      </div>
      <div style={{ cursor: "pointer" }}>
        <div className={style.save} onClick={() => router.push("/summaries")}>
          Saved Summaries
        </div>
      </div>
    </div>
  );
}

export default Header