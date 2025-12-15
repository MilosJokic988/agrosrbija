// src/App.jsx
import MainLayout from './components/MainLayout/MainLayout'
import Home from './pages/Home'
import AddProducer from './pages/AddProducer'
import About from './pages/About'
import { Routes, Route } from 'react-router-dom'
import { ProducersProvider } from './context/ProducersContext'

export default function App() {
  return (
    <ProducersProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dodaj" element={<AddProducer />} />
          <Route path="/o-projektu" element={<About />} />
        </Routes>
      </MainLayout>
    </ProducersProvider>
  )
}
