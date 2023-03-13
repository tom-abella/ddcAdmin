import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Record from "./components/Record"
import CompletedList from "./components/CompletedList"
import AuthorizeduserList from "./components/AuthorizedList"
import AuthContextProvider from "./AuthContext/AuthContext"
function App() {

  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/record" element={<Record />} />
          <Route path="/CompletedList" element={<CompletedList />} />
          <Route path="/AuthorizeduserList" element={<AuthorizeduserList />} />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
