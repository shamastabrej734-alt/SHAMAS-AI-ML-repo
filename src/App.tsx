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
import Resources from './pages/Resources';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import AdminLayout from './components/layout/AdminLayout';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminCourses from './pages/Admin/AdminCourses';
import AdminResources from './pages/Admin/AdminResources';
import AdminProjects from './pages/Admin/AdminProjects';
import AdminGallery from './pages/Admin/AdminGallery';
import AdminSettings from './pages/Admin/AdminSettings';
import AdminPlaceholder from './pages/Admin/AdminPlaceholder';
import AiRoadmap from './pages/AiRoadmap';
import MlCourse from './pages/MlCourse';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="youtube" element={<YouTubeTranslator />} />
          <Route path="courses" element={<Courses />} />
          <Route path="resources" element={<Resources />} />
          <Route path="projects" element={<Projects />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="category/ai" element={<AiRoadmap />} />
          <Route path="category/ml" element={<MlCourse />} />
        </Route>
        
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="resources" element={<AdminResources />} />
            <Route path="topics" element={<AdminPlaceholder title="Course Topics" />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="content" element={<AdminPlaceholder title="Website Content" />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
