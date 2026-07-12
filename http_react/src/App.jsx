import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const url = "http://localhost:3000/products"
  const [products, setproducts] = useState([]);

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const envio = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
    }

    if (name === "" || price === "") {
      alert("preencha os campos")
      return
    }

    const res = await fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(product)
    });
      const carregamentoDinamico = await res.json();
      setproducts((prevProducts) => [...prevProducts, carregamentoDinamico]);
  };

  // useEffect(() => {
  //   async function getData() {
  //     const res = await fetch(url)
  //     const data = await res.json();

  //     setproducts(data);

  //   }
  //   getData();
  // }, [])
   
  const { data: items, loading, error } = useFetch(url);

  return (
    <div className="ticks">
      <h1>http em react </h1>

      {loading && <p>carregando...</p>}
      {error && <p>erro ao carregar: {error.message}</p>}

      <ul>
        {(items ?? []).map((product) => (
          <li key={product.id}>
            {product.name} R${product.price}
          </li>
        ))}
      </ul>

      <div className="add-product">
        <form onSubmit={envio}>
          <label className='form'>
            <span>nome: </span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <span>preço: </span>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

            <input type="submit" value="enviar" id='btn' />
          </label>
        </form>
      </div>
    </div>
  )
}

export default App
