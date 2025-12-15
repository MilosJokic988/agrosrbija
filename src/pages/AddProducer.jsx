import { useState } from 'react'
import './AddProducer.css'
import { useProducers } from '../context/ProducersContext'
import { v4 as uuidv4 } from 'uuid'

export default function AddProducer() {
  const { addProducer } = useProducers()

  const [form, setForm] = useState({
    name: '',
    location: '',
    product: '',
    price: '',
    quantity: '',
    phone: '',
  })

  const [locationFound, setLocationFound] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setLocationFound(null)
  }

  async function checkLocation() {
    if (!form.location) return
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${form.location},Serbia`
      )
      const data = await res.json()

      if (!data.length) {
        alert('Lokacija nije pronađena!')
        setLocationFound(null)
      } else {
        setLocationFound({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          display: data[0].display_name
        })
      }
    } catch (err) {
      console.error(err)
      alert('Greška pri prepoznavanju lokacije.')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!locationFound) {
      alert('Proveri lokaciju pre nego što pošalješ formu!')
      return
    }

    setSubmitting(true)

    addProducer({
      ...form,
      lat: locationFound.lat,
      lng: locationFound.lng,
      id: uuidv4()
    })

    alert('Proizvođač dodat na mapu!')

    setForm({
      name: '',
      location: '',
      product: '',
      price: '',
      quantity: '',
      phone: '',
    })
    setLocationFound(null)
    setSubmitting(false)
  }

  return (
    <section className="add-producer">
      <h1>Dodaj proizvođača</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Naziv gazdinstva</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Naziv gazdinstva"
          required
          autoComplete="organization"
        />

        <label htmlFor="location">Grad / Selo</label>
        <input
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Grad / Selo"
          required
          autoComplete="address-level2"
        />
        <button type="button" onClick={checkLocation}>Proveri lokaciju</button>
        {locationFound && <p style={{ color: 'green' }}>Lokacija prepoznata: {locationFound.display}</p>}

        <label htmlFor="product">Proizvod</label>
        <select
          id="product"
          name="product"
          value={form.product}
          onChange={handleChange}
          required
        >
          <option value="">Izaberi proizvod</option>
          <option value="Malina">Malina</option>
          <option value="Med">Med</option>
          <option value="Krompir">Krompir</option>
          <option value="Voće">Voće</option>
          <option value="Povrće">Povrće</option>
        </select>

        <label htmlFor="price">Cena (din)</label>
        <input
          id="price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Cena (din)"
          required
          autoComplete="off"
        />

        <label htmlFor="quantity">Količina</label>
        <input
          id="quantity"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Količina"
          required
          autoComplete="off"
        />

        <label htmlFor="phone">Telefon</label>
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Telefon"
          required
          autoComplete="tel"
        />

        <button type="submit" disabled={submitting}>
          {submitting ? 'Dodavanje...' : 'Pošalji'}
        </button>
      </form>
    </section>
  )
}
