import "bootstrap/dist/css/bootstrap.min.css"
import type { Shoe_interface } from "./Models/Interfaces/Shoe.interface";
import { useState, useEffect } from "react";
export const App = function () {
  const [shoes, setShoes] = useState<Shoe_interface[]>([])
  const [name, setName] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [inStock, setInStock] = useState<boolean>(false)
  const [releaseDate, setReleaseDate] = useState<Date>()

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
                <td>{shoe.releaseDate}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  )
};