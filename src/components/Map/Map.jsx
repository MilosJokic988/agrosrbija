import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import ProducerCard from '../ProducerCard/ProducerCard'
import Filters from '../Filters/Filters'
import './Map.css'
import { ZoomControl } from 'react-leaflet'
// Funkcija koja vraća boju po proizvodu
function getMarkerColor(product) {
  switch (product) {
    case 'Malina':
      return '#e74c3c'
    case 'Med':
      return '#f1c40f'
    case 'Krompir':
      return '#8b4513'
    case 'Voće':
      return '#e67e22'
    case 'Povrće':
      return '#27ae60'
    default:
      return '#3498db'
  }
}

// Komponenta koja osvežava mapu nakon rendera (bitno za mobilne)
function MapResizeFix() {
  const map = useMap()
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100)
  }, [map])
  return null
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
      <div className="filters-wrapper">
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      <MapContainer
  center={[44.0165, 21.0059]}
  zoom={7}
  style={{ height: '100%', width: '100%' }}
  zoomControl={false} // isključuje default dugmad
>
  <TileLayer
    attribution="&copy; OpenStreetMap"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {filteredProducers.map((p) => {
    const icon = L.divIcon({
      html: `<span class="pulse-marker" style="background:${getMarkerColor(
        p.product
      )}"></span>`,
      className: '',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
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

  <MapResizeFix />
</MapContainer>

      {selectedProducer && (
        <ProducerCard
          producer={selectedProducer}
          onClose={() => setSelectedProducer(null)}
          onRemove={() => {
            removeProducer(selectedProducer.id)
            setSelectedProducer(null)
          }}
        />
      )}
    </div>
  )
}
