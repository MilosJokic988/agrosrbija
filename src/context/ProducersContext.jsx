import { createContext, useContext, useState, useEffect } from 'react'

const ProducersContext = createContext()

export function ProducersProvider({ children }) {
  const [producers, setProducers] = useState(() => {
    // Učitaj iz localStorage ili startuj sa praznim nizom
    const saved = localStorage.getItem('producers')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    // Sačuvaj svaki put kad se producers promeni
    localStorage.setItem('producers', JSON.stringify(producers))
  }, [producers])

  function addProducer(newProducer) {
    setProducers([...producers, newProducer])
  }

  function removeProducer(id) {
    setProducers(producers.filter((p) => p.id !== id))
  }

  return (
    <ProducersContext.Provider value={{ producers, addProducer, removeProducer }}>
      {children}
    </ProducersContext.Provider>
  )
}

export function useProducers() {
  const context = useContext(ProducersContext)
  if (!context) throw new Error('useProducers must be used within a ProducersProvider')
  return context
}
