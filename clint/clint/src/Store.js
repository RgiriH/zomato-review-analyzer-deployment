'use clint'
import React, { useState } from 'react'
import {  useContext } from 'react'
import { Context } from './Context'

const Store = ({children}) => {

    const [data, setData] = useState(null)
    const [fullData,setFullData] = useState(null)
  return (
      <Context.Provider value = {{data,setData,fullData,setFullData}}>{ children}</Context.Provider>
  )
}

export const GetContext = () => {
    return useContext(Context)
}

export default Store