import "bootstrap/dist/css/bootstrap.min.css"
import type { Shoe_interface } from "./Models/Interfaces/Shoe.interface";
import { useState, useEffect, type SubmitEventHandler } from "react";
export const App = function () {
  const [shoes, setShoes] = useState<Shoe_interface[]>([])
  const [name, setName] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [inStock, setInStock] = useState<boolean>(false)
  const [releaseDate, setReleaseDate] = useState<Date>()

  // Ezt ai-al irattam, nem volt kedvem megirni :P
  const formatDateForInput = (date?: Date) => {
    if (!date) return ''

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    async function fetchShoes() {
      try {
        const response = await fetch('http://localhost:3000/shoes')
        const data: Shoe_interface[] = await response.json()
        setShoes(data)
      } catch (err: Error | any) {
        throw new Error(err);
      }
    }
    fetchShoes()
  }, []);

  const addShoe: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/shoes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: name,
          brand: brand,
          price: price,
          inStock: inStock,
          releaseDate: releaseDate
        })
      })
      const newShoe: Shoe_interface = await response.json()
      setShoes((lastShoes) => [...lastShoes, newShoe])
    } catch (err: Error | any) {
      throw new Error(err);
    }
  }

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>In Stock</th>
            <th>Release Date</th>

          </tr>
        </thead>
        <tbody>
          {
            shoes.map((shoe) => (
              <tr key={shoe.id}>
                <td>{shoe.id}</td>
                <td>{shoe.name}</td>
                <td>{shoe.brand}</td>
                <td>{shoe.price}</td>
                <td>{shoe.inStock ? "Yes" : "No"}</td>
                <td>{shoe.releaseDate.toString()}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <form onSubmit={addShoe}>
        <div className="input-group">
          <label htmlFor='nameInput'>Name</label>
          <input
            type="text"
            name="name"
            id="nameInput"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor='brandInput'>Brand</label>
          <input
            type="text"
            name="brand"
            id="brandInput"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor='priceInput'>Age</label>
          <input
            type="number"
            name="price"
            id="priceInput"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
          />
        </div>
        <div className="input-group">
          <label htmlFor='inStockInput'>In Stock</label>
          <input
            type="checkbox"
            name="inStock"
            id="inStockInput"
            checked={inStock}
            onChange={(event) => setInStock(event.target.checked)}
          />
        </div>
        <div className="input-group">
          <label htmlFor='releaseDateInput'>Release date</label>
          <input
            type="date"
            name="releaseDate"
            id="releaseDateInput"
            value={formatDateForInput(releaseDate)}
            onChange={(event) => setReleaseDate(new Date(event.target.value))}
          />
        </div>

        <button type="submit">Feltvitel</button>
      </form>

    </div>
  )
};