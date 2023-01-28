import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddRecord from "./addRecord"
import Record from "./Record";
export default function Index() {
  return (
    <>
<Routes >
  <Route path='/' element={<AddRecord />}/>
  <Route path='record' element={<Record />}/>
</Routes>
    </>
  )
}
