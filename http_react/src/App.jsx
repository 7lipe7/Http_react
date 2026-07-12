import { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import "./App.css";

function App() {
  const url = "http://localhost:3000/products";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(null);

  const { data: items, loading, error, refetch } = useFetch(url);

  const envio = async (e) => {
    e.preventDefault();

    setPostError(null);

    if (name === "" || price === "") {
      alert("preencha os campos");
      return;
    }

    setPosting(true);
    try {
      const res = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, price }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      // opcional: const created = await res.json();

      setName("");
      setPrice("");
      await refetch();
    } catch (err) {
      setPostError(err);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="ticks">
      <h1>http em react</h1>

      {loading && <p>carregando...</p>}
      {error && <p>erro ao carregar: {error.message}</p>}
      {postError && <p>erro ao enviar: {postError.message}</p>}

      <ul>
        {(items ?? []).map((product) => (
          <li key={product.id}>
            {product.name} R${product.price}
          </li>
        ))}
      </ul>

      <div className="add-product">
        <form onSubmit={envio}>
          <label className="form">
            <span>nome: </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <span>preço: </span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              id="btn"
              type="submit"
              value={posting ? "Enviando..." : "Enviar"}
              disabled={posting}
            />
          </label>
        </form>
      </div>
    </div>
  );
}

export default App;

