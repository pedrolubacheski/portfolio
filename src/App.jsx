import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import About         from './components/About'
import Projects      from './components/Projects'
import Contact       from './components/Contact'
import FloatingIcons from './components/FloatingIcons'
import Footer        from './components/Footer'

export default function App() {
  return (
    <div className="grid-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <FloatingIcons />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
