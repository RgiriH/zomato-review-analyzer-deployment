import React, { useEffect, useState } from 'react'
import style from './Data.module.css'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import positively from "../../../public/positively.jpeg"
import negative from "../../../public/negative.jpg"
import pin from "../../../public/pin.png"
import suggestion from "../../../public/suggestion.jpg"
import { GetContext } from '@/Store';

const Data = () => {

  const { data,fullData} = GetContext()
  const route = useRouter()
  const [disabled, setDisabled] = useState(fullData == null ? true : false);

useEffect(() => {
  if (data == null) {
     route.push("/")
  }
},[])
  
const handleSave = async() => {
  const data = localStorage.getItem("SavedSummaries");

  if (data) {
    let json = await JSON.parse(data)

    //checking for duplicate data
    let flag = false
    json.map((node) => {
      if (node.url == fullData.url && node.date == fullData.date && node.span == fullData.span) {
        flag = true
        return
      }
    })
    
    if(flag) return

    json.unshift(fullData)
    
    json = await JSON.stringify(json)
    localStorage.setItem("SavedSummaries", json);
    
  } else {
    let json = [fullData]

    json = await JSON.stringify(json);
    localStorage.setItem("SavedSummaries", json);
  }

  setDisabled(true)
  alert("saved successfully")
}

    
  return (
    <>
    <div className={style.coverM}>
    
        <div className={style.feedcover}>
          <div className={style.card}>
            <div className={style.header}>Positive Points</div>
            <Image
              src={positively}
              fill
              alt="BG IMAGE 1"
              fetchPriority="high"
              className={style.img}
            ></Image>
            <div className={style.gradient}></div>
            <div className={style.gradientBottom}></div>
            <div style={{ height: "400px", overflow: "auto" }}>
              {data?.positivePoints.map((point, index) => {
                return (
                  <div className={style.points} key={index + "P"}>
                    {point}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.card}>
            <div className={style.header}>Negative Points</div>
            <Image
              src={negative}
              fill
              alt="BG IMAGE 2"
              fetchPriority="high"
              className={style.img}
            ></Image>
            <div className={style.gradient}></div>
            <div className={style.gradientBottom}></div>
            <div style={{ height: "400px", overflow: "auto" }}>
              {data?.negativePoints.map((point, index) => {
                return (
                  <div className={style.points} key={index + "n"}>
                    {point}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.card}>
            <div className={style.header}>Suggestions</div>
            <Image
              src={suggestion}
              fill
              alt="BG IMAGE 3"
              fetchPriority="high"
              className={style.img}
            ></Image>
            <div className={style.gradient}></div>
            <div style={{ height: "400px", overflow: "auto", margin: "auto" }}>
              {data?.suggestions?.map((point, index) => {
                return (
                  <div className={style.points} key={index + "s"}>
                    {point}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{width:"100%",display:'flex',justifyContent:"center",padding:"0px"}}>   
           <button
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '5px',
                cursor: disabled ? "not-allowed" : "pointer",
                transition: 'background-color 0.3s',
                
              }}
              onMouseEnter={(e) => {
                 e.target.style.boxShadow = '0px 0px 15px #4CAF50';
              }}
              onMouseOut={(e) => {
                e.target.style.boxShadow = '';
              }}   
              disabled={disabled }
              onClick={() => handleSave()}
          >
            Save Summary
          </button>
        </div> 
        <div
          style={{
            padding: "10px 50px",
            textAlign: "center",
            color: "gray",
            borderRadius: "10px",
            maxWidth: "500px",
            Width: "100%",
            margin: "0px auto",
            marginTop: "20px",
          }}
        >
          Please note: The following summary is based on reviews from Zomato,
          analyzed by AI to provide an overview of customer experiences.
        </div>
      </div>
      <div style={{ height: "100px" }}></div>
    </>
  );
}

export default Data