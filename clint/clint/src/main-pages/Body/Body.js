import React, { useState } from 'react'
import Image from 'next/image';
import { GetContext } from '@/Store';
import { Circles } from 'react-loading-icons';
import axios from 'axios';
import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL



import style from "./Body.module.css"
import Vector from "../../../public/Vector.png"
import Right from "../../../public/Right.png";
import img2 from "../../../public/img2.jpeg"

const Body = () => {

  const { data, setData ,fullData,setFullData} = GetContext();
  const rounter = useRouter()
  
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lenght, setLenght] = useState(50)
  
  
  const getSummary = async () => {
    
    setLoading(() => {
      return true;
    });
    setError(null)
      try {
        const body = {
          url: url,
          size: lenght,
        };

      const pattern = /^https:\/\/www\.zomato\.com\/[a-zA-Z0-9\-]+\/[a-zA-Z0-9\-]+(?:\/[a-zA-Z0-9\-]+)*\/reviews$/;

        if (!pattern.test(url)) {
          setError("Please provide a valid URL of a zomato restaurant's review page")
          setLoading(false)
          return
        }
       const res = await  axios(`${API_URL}/api/summary`, {
          method: "post",
          data: body,
          timeout: 300000,
       })
        

        setData(res.data.analysis)
        setFullData({ data: res.data.analysis ,span : lenght,url:url,date : Date.now()});
        
        rounter.push('/data')

      } catch (error) {
        console.log(error?.response?.data)
        if(error?.response?.data?.message) setError(error?.response?.data?.message)
        else setError(error.message)
       
      }
      


    
    setLoading(false)
  }

  return (
    <>
      <div className={style.main_div}>
        <div className={style.inner_div}>
          <div className={style.logo}>BITES&BREF</div>
          <div className={style.search_container}>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={style.input}
              placeholder="enter a valid zomato url to get summaries"
            />
            <div className={style.selectBar} onClick={() => setUrl("")}>
              <Image src={Vector.src} width={15} height={15} alt='vector' fetchPriority="high"/>
            </div>
          </div>
          <div className={style.time_line}>
            <div
              className={style.time}
              onClick={() => setLenght(50)}
              style={{
                border: `${lenght == 50 ? ".5px solid #ccc" : ""}`,

                borderRadius: "10px",
                //  backgroundColor: "red",
              }}
            >
              last 50 reviews
            </div>
            <div
              className={style.time}
              onClick={() => setLenght(100)}
              style={{
                border: `${lenght == 100 ? ".5px solid #ccc" : ""}`,
                borderRadius: "10px",
              }}
            >
              last 100 reviews
            </div>
            <div
              className={style.time}
              onClick={() => setLenght(150)}
              style={{
                border: `${lenght == 150 ? ".5px solid #ccc" : ""}`,
                borderRadius: "10px",
              }}
            >
              last 150 reviews
            </div>
            <div
              className={style.time}
              onClick={() => setLenght(200)}
              style={{
                border: `${lenght == 200 ? ".5px solid #ccc" : ""}`,
                borderRadius: "10px",
              }}
            >
              last 200 reviews
            </div>
          </div>
          <p className={style.discription}>
            Our survice : Our web application reviews Zomato feedback to create
            brief summaries for restaurants, focusing on key positive and
            negative points. We aims to help restaurant owners better understand
            customer opinions and enhance their services.
          </p>
          <button className={style.button} onClick={() => getSummary()}>
            <div>Genrate Summary</div>
            <Image src={Right.src} width={25} height={25} alt="logo" fetchPriority="high"/>
          </button>
          <div style={{ color: "red" }}>
            {error !== null ? (
              <>
                <span>&#9888;</span>  {error}
              </>
            ) : (
              ""
            )}
          </div>
          
        </div>
        <div>
          <img src={img2.src} className={style.bg}></img>
          <div className={style.gradient}></div>
        </div>
      </div>
      <div className={style.helper}></div>
      {loading && (
        <div
          style={{
            zIndex: "8",
            width: "100%",
            height: "100%",
            position: "fixed",
            backgroundColor: "#ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap:"20px",
            top: "0px",
            left: "0px",
            opacity: ".8",
            flexDirection: "column",
            zIndex:10
          }}
        >
          <Circles />
          <span
            style={{
              textAlign: "center",
              background: `linear-gradient(to bottom, #E6F7FF, #FFFFFF)`,
              color: "grey",
              padding: "10px",
              borderRadius:"10px"
            }}
          >Please wait! <br />
            It may take some seconds to few minutes as we need to extract reviews,<br />
            and have to perform series of analyses to get best summary...
          </span>
          <div
            style={{ marginTop: "20px", fontSize: "30px", color: "#B22222" }}
          ></div>
        </div>
      )}
    </>
  );
}

export default Body