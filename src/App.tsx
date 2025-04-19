
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from './pages/Index';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import UserDashboard from './pages/UserDashboard';
import PracticePage from './pages/practice/PracticePage';
import ReadingPractice from './pages/practice/ReadingPractice';
import ListeningPractice from './pages/practice/ListeningPractice';
import WritingPractice from './pages/practice/WritingPractice';
import SpeakingPractice from './pages/practice/SpeakingPractice';
import CompleteListeningPage from './pages/practice/CompleteListeningPage';
import MockTestPage from './pages/practice/MockTestPage';
import IeltsPage from './pages/exams/IeltsPage';
import ToeflPage from './pages/exams/ToeflPage';
import PtePage from './pages/exams/PtePage';
import GrePage from './pages/exams/GrePage';
import GmatPage from './pages/exams/GmatPage';
import SatPage from './pages/exams/SatPage';
import IeltsPracticePage from './pages/practice/exam-specific/IeltsPracticePage';
import ToeflPracticePage from './pages/practice/exam-specific/ToeflPracticePage';
import PtePracticePage from './pages/practice/exam-specific/PtePracticePage';
import GrePracticePage from './pages/practice/exam-specific/GrePracticePage';
import GmatPracticePage from './pages/practice/exam-specific/GmatPracticePage';
import SatPracticePage from './pages/practice/exam-specific/SatPracticePage';
import SelectionHome from './pages/SelectionHome';
import Resources from './pages/Resources';
import ResourcesHome from './pages/ResourcesHome';
import AllResources from './pages/AllResources';
import ResourceDetail from './pages/ResourceDetail';
import CategoryDetail from './pages/CategoryDetail';
import CountriesPage from './pages/CountriesPage';
import { DemoAdminLogin } from './components/admin/DemoAdminLogin';
import AdminDashboard from './pages/admin/Dashboard';
import UsersCMS from './pages/admin/UsersCMS';

import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/selection" element={<SelectionHome />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/reading" element={<ReadingPractice />} />
            <Route path="/practice/listening" element={<ListeningPractice />} />
            <Route path="/practice/writing" element={<WritingPractice />} />
            <Route path="/practice/speaking" element={<SpeakingPractice />} />
            <Route path="/practice/listening/:taskId" element={<CompleteListeningPage />} />
            <Route path="/practice/mock-test" element={<MockTestPage />} />

            {/* Exam Information Pages */}
            <Route path="/exams/ielts" element={<IeltsPage />} />
            <Route path="/exams/toefl" element={<ToeflPage />} />
            <Route path="/exams/pte" element={<PtePage />} />
            <Route path="/exams/gre" element={<GrePage />} />
            <Route path="/exams/gmat" element={<GmatPage />} />
            <Route path="/exams/sat" element={<SatPage />} />

            {/* Exam-Specific Practice Pages */}
            <Route path="/practice/ielts" element={<IeltsPracticePage />} />
            <Route path="/practice/toefl" element={<ToeflPracticePage />} />
            <Route path="/practice/pte" element={<PtePracticePage />} />
            <Route path="/practice/gre" element={<GrePracticePage />} />
            <Route path="/practice/gmat" element={<GmatPracticePage />} />
            <Route path="/practice/sat" element={<SatPracticePage />} />

            {/* Resources Pages */}
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/home" element={<ResourcesHome />} />
            <Route path="/resources/all" element={<AllResources />} />
            <Route path="/resources/:resourceId" element={<ResourceDetail />} />
            <Route path="/resources/category/:categoryId" element={<CategoryDetail />} />

            {/* Study Abroad */}
            <Route path="/abroad" element={<CountriesPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<DemoAdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersCMS />} />
            
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
