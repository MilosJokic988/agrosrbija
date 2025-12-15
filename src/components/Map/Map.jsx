import { useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import ProducerCard from '../ProducerCard/ProducerCard'
import Filters from '../Filters/Filters'
import './Map.css'

// Funkcija koja vraća boju po proizvodu
function getMarkerColor(product) {
  switch (product) {
    case 'Malina':
      return 'red'
    case 'Med':
      return 'yellow'
    case 'Krompir':
      return 'brown'
    default:
      return 'blue'
  }
}

export default function Map({ producers, removeProducer }) {
  const [selectedProducer, setSelectedProducer] = useState(null)
  const [filters, setFilters] = useState({ product: '', maxPrice: '' })

  const filteredProducers = producers.filter((p) => {
    const productMatch = !filters.product || p.product === filters.product
    const priceMatch = !filters.maxPrice || p.price <= Number(filters.maxPrice)
    return productMatch && priceMatch
  })

  return (
    <div className="map-wrapper">
      <Filters filters={filters} setFilters={setFilters} />

      <MapContainer
        center={[44.0165, 21.0059]}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredProducers.map((p) => {
          const icon = L.divIcon({
            html: `<i style="background:${getMarkerColor(
              p.product
            )};border-radius:50%;display:block;width:16px;height:16px;"></i>`,
            className: '',
            iconSize: [16, 16],
          })

          return (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={icon}
              eventHandlers={{
                click: () => setSelectedProducer(p),
              }}
            />
          )
        })}
      </MapContainer>

      <ProducerCard
        producer={selectedProducer}
        onClose={() => setSelectedProducer(null)}
        onRemove={() => {
          removeProducer(selectedProducer.id)
          setSelectedProducer(null)
        }}
      />
    </div>
  )
}
