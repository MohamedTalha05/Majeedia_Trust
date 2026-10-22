/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Legacy } from './pages/Legacy';
import { Projects } from './pages/Projects';
import { Transparency } from './pages/Transparency';
import { Vision } from './pages/Vision';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 font-sans">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/legacy" element={<Legacy />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/transparency" element={<Transparency />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}
