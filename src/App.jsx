import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Packages from './components/Packages';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import PackageDetail from './components/PackagesDetails';
import './App.css';

// Componente para la página principal
function HomePage() {
  return (
    <>
      <Hero />
      <Packages />
      <Testimonials />
      <Contact />
    </>
  );
}

// Componente wrapper para manejar el Header condicionalmente
function AppContent() {
  const location = useLocation();
  const showHeader = !location.pathname.startsWith('/paquete/');

  return (
    <div className="app">
      {showHeader && <Header />}
      <main className={!showHeader ? 'no-header' : ''}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/paquete/:id" element={<PackageDetail />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;