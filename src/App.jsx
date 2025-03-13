import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Document from "./component/Document.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Document></Document>
    </>
  )
}

export default App
