
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import UserDashboard from '@/pages/UserDashboard';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Cookies from '@/pages/Cookies';
import SelectionHome from '@/pages/SelectionHome';
import CountriesPage from '@/pages/CountriesPage';
import ResourcesHome from '@/pages/ResourcesHome';
import ResourceDetail from '@/pages/ResourceDetail';
import Resources from '@/pages/Resources';
import AllResources from '@/pages/AllResources';
import CategoryDetail from '@/pages/CategoryDetail';

// Exam Pages
import IeltsPage from '@/pages/exams/IeltsPage';
import ToeflPage from '@/pages/exams/ToeflPage';
import PtePage from '@/pages/exams/PtePage';
import GrePage from '@/pages/exams/GrePage';
import GmatPage from '@/pages/exams/GmatPage';
import SatPage from '@/pages/exams/SatPage';

// Practice Pages
import PracticePage from '@/pages/practice/PracticePage';
import ReadingPractice from '@/pages/practice/ReadingPractice';
import ListeningPractice from '@/pages/practice/ListeningPractice';
import CompleteListeningPage from '@/pages/practice/CompleteListeningPage';
import SpeakingPractice from '@/pages/practice/SpeakingPractice';
import WritingPractice from '@/pages/practice/WritingPractice';
import MockTestPage from '@/pages/practice/MockTestPage';
import AdminRedirect from '@/components/admin/AdminRedirect';

// Import exam-specific practice pages
import IeltsPracticePage from '@/pages/practice/exam-specific/IeltsPracticePage';
import ToeflPracticePage from '@/pages/practice/exam-specific/ToeflPracticePage';
import PtePracticePage from '@/pages/practice/exam-specific/PtePracticePage';
import GrePracticePage from '@/pages/practice/exam-specific/GrePracticePage';
import GmatPracticePage from '@/pages/practice/exam-specific/GmatPracticePage';
import SatPracticePage from '@/pages/practice/exam-specific/SatPracticePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/selection" element={<SelectionHome />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/resources" element={<ResourcesHome />} />
        <Route path="/resources/:slug" element={<ResourceDetail />} />
        <Route path="/resources/all" element={<AllResources />} />
        <Route path="/resources/categories" element={<Resources />} />
        <Route path="/resources/categories/:slug" element={<CategoryDetail />} />
        
        {/* Exam Routes */}
        <Route path="/exams/ielts" element={<IeltsPage />} />
        <Route path="/exams/toefl" element={<ToeflPage />} />
        <Route path="/exams/pte" element={<PtePage />} />
        <Route path="/exams/gre" element={<GrePage />} />
        <Route path="/exams/gmat" element={<GmatPage />} />
        <Route path="/exams/sat" element={<SatPage />} />
        
        {/* Generic Practice Routes */}
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/practice/reading" element={<ReadingPractice />} />
        <Route path="/practice/listening" element={<ListeningPractice />} />
        <Route path="/practice/listening/complete" element={<CompleteListeningPage />} />
        <Route path="/practice/speaking" element={<SpeakingPractice />} />
        <Route path="/practice/writing" element={<WritingPractice />} />
        <Route path="/practice/mock-test" element={<MockTestPage />} />
        
        {/* Exam-Specific Practice Routes */}
        <Route path="/practice/ielts" element={<IeltsPracticePage />} />
        <Route path="/practice/toefl" element={<ToeflPracticePage />} />
        <Route path="/practice/pte" element={<PtePracticePage />} />
        <Route path="/practice/gre" element={<GrePracticePage />} />
        <Route path="/practice/gmat" element={<GmatPracticePage />} />
        <Route path="/practice/sat" element={<SatPracticePage />} />
        
        {/* Exam-Specific Section Routes */}
        {/* SAT Section Routes */}
        <Route path="/practice/sat/reading" element={<ReadingPractice />} />
        <Route path="/practice/sat/math" element={<ReadingPractice />} />
        
        {/* GRE Section Routes */}
        <Route path="/practice/gre/verbal" element={<ReadingPractice />} />
        <Route path="/practice/gre/quantitative" element={<ReadingPractice />} />
        <Route path="/practice/gre/analytical" element={<WritingPractice />} />
        <Route path="/practice/gre/mixed" element={<ReadingPractice />} />
        
        {/* Admin Redirect - This will redirect to your Laravel backend */}
        <Route path="/admin/*" element={<AdminRedirect />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
