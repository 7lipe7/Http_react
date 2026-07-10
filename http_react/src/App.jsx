import { useState , useEffect} from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const url ="http://localhost:3000/products"
  const [products, setproducts] = useState([]);

  useEffect(()=>{
    async function getData() {
      const res = await fetch(url)
      const data = await res.json();
      console.log(data)
      
    }
    getData();
  },[])

  return (
      <div className="ticks">
        <h1>http em react </h1>
      </div>
  )
}

export default App
