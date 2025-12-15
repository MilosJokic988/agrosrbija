import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function MainLayout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  )
}
