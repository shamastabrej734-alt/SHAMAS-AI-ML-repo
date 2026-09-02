/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import YouTubeTranslator from './pages/YouTubeTranslator';
import Courses from './pages/Courses';
import PDFs from './pages/PDFs';
import Projects from './pages/Projects';
import AdminLayout from './components/layout/AdminLayout';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="youtube" element={<YouTubeTranslator />} />
          <Route path="courses" element={<Courses />} />
          <Route path="pdfs" element={<PDFs />} />
          <Route path="projects" element={<Projects />} />
        </Route>
        
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
