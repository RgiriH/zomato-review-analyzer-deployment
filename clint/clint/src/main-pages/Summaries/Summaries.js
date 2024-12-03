import React, { useEffect, useState } from 'react'
import style from "./Summaries.module.css"
import Image from 'next/image';
import cloud from "../../../public/cloud.png"

import { useRouter } from 'next/router';
import { GetContext } from '@/Store';




const Summaries = () => {

const {data,setData,setFullData} = GetContext()
  const [Data, setDataStorage] = useState([])
  const router = useRouter();
  
  const getLocalStorage = async () => {
       const summaries = localStorage.getItem("SavedSummaries");

       if (summaries) {
         const json = await JSON.parse(summaries);
         setDataStorage(json);
        
       }
  }

  const getDateFormated = (currentTimestamp) => {
    

      const date = new Date(currentTimestamp);
      // Convert to Indian Standard Time (IST)
      const options = { timeZone: 'Asia/Kolkata', hour12: true };
      const istDate = date.toLocaleString('en-IN', options);
    
    return istDate
  }


  const handleOpen = (summary) => {
    setData(summary.data)
    setFullData(null)
    router.push('/data')
  }

  const handleRemove = async (ind) => {
    console.log("remove function called",ind)
    const summaries = localStorage.getItem("SavedSummaries");
    
    if (summaries) {

         let json = await JSON.parse(summaries);
         json = json.filter((data, index) => ind != index)
         json = JSON.stringify(json)
         localStorage.setItem("SavedSummaries", json);
         getLocalStorage()
         
       }
  }

  useEffect(() => {
    getLocalStorage()
  },[])

  
  return (
    <>
      <div className={style.outer_div}>
        {Data.length != 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 0px",
            }}
          >
            <div className={style.header}>Saved Summaries </div>

            <div className={style.feed_cover}>
              <div className={style.gradient}></div>
              <div className={style.cover_feed_inner}>
                {Data.map((Summaries, index) => {
                  return (
                    <div key={index} className={style.feeds}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <span className={style.span}>
                          #last {Summaries.span} reviews
                        </span>
                        <span className={style.date}>
                          On : {getDateFormated(Summaries.date)}
                        </span>
                      </div>
                      <a
                        href={Summaries.url}
                        target="_blank"
                        className={style.url}
                      >
                        {Summaries.url}
                      </a>
                      <div
                        style={{
                          display: "flex",
                          gap: "30px",
                          alignItems: "center",
                          zIndex: 5,
                        }}
                      >
                        <button
                          className={style.button}
                          onClick={() => handleOpen(Summaries)}
                        >
                          {" "}
                          Open{" "}
                        </button>
                        <button
                          className={style.button}
                          style={{ backgroundColor: "red", width: "80px" }}
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={style.gradientReverse}></div>
            </div>
            <div
              style={{
                width: "95%",
                backgroundColor: "brown",
                padding: "5px",
                marginTop: "10px",
                color: "inherit",
                border: "1px solid grey",
                borderRadius: "5px",
                fontSize: "14px",
                marginTop: "80px",
                marginBottom:"40px"
              }}
            >
              {" "}
              Note : The summaries you save are stored locally on your device.
              If you clear your browser data, these summaries will be
              permanently deleted.
            </div>
          </div>
        )}

        {Data.length == 0 && (
          <div
            style={{
              width: "100%",
              height: "50vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Image src={cloud} width={150} height={150} alt="img loading" fetchPriority="high"/>
            <button className={style.button} onClick={() => router.push("/")}>
              back
            </button>
          </div>
        )}
      </div>
     
    </>
  );
}

export default Summaries