import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@pages/home/HomePage'
import { AboutPage } from '@pages/about/AboutPage'
import { ProjectsPage } from '@pages/projects/ProjectsPage'
import { ContactPage } from '@pages/contact/ContactPage'
// import { Layout } from '../../shared/ui/Layout/Layout.jsx'


export function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      
    </BrowserRouter>
  )
}
