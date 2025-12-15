import MapComponent from '../components/Map/Map'
import { useProducers } from '../context/ProducersContext'


export default function Home() {
  const { producers, removeProducer } = useProducers()

  return <MapComponent producers={producers} removeProducer={removeProducer} />
}
