import './Filters.css'

export default function Filters({ filters, setFilters }) {
  return (
    <div className="filters">
      <select
        value={filters.product}
        onChange={(e) =>
          setFilters({ ...filters, product: e.target.value })
        }
      >
        <option value="">Svi proizvodi</option>
        <option value="Malina">Malina</option>
        <option value="Med">Med</option>
        <option value="Krompir">Krompir</option>
        <option value="Voće">Voće</option>
        <option value="Povrće">Povrće</option>
      </select>

      <input
        type="number"
        placeholder="Max cena (din)"
        value={filters.maxPrice}
        onChange={(e) =>
          setFilters({ ...filters, maxPrice: e.target.value })
        }
      />
    </div>
  )
}
