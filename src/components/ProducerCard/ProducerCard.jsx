import './ProducerCard.css'

export default function ProducerCard({ producer, onClose, onRemove }) {
  if (!producer) return null

  return (
    <div className="producer-card">
      <button onClick={onClose}>X</button>
      <h3>{producer.name}</h3>
      <p>Lokacija: {producer.location}</p>
      <p>Proizvod: {producer.product}</p>
      <p>Količina: {producer.quantity}</p>
      <p>Cena: {producer.price} din</p>
      <p>Telefon: {producer.phone}</p>

      <button onClick={onRemove} style={{ background: 'red', color: 'white' }}>
        Obriši proizvođača
      </button>
    </div>
  )
}