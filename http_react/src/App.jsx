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
      
      setproducts(data);
      
    }
    getData();
  },[])

  return (
      <div className="ticks">
        <h1>http em react </h1>
       <ul>
  {products.map((product) => (
    <li key={product.id}>
      {product.name} R${product["price "]}
    </li>
  ))}
</ul>

        
      </div>
  )
}

export default App
