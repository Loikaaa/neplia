
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import SpeakingPractice, { SpeakingPracticeProps } from '@/pages/practice/SpeakingPractice';
import WritingPractice from '@/pages/practice/WritingPractice';
import MockTestPage from '@/pages/practice/MockTestPage';

// Import exam-specific practice pages
import IeltsPracticePage from '@/pages/practice/exam-specific/IeltsPracticePage';
import ToeflPracticePage from '@/pages/practice/exam-specific/ToeflPracticePage';
import PtePracticePage from '@/pages/practice/exam-specific/PtePracticePage';
import GrePracticePage from '@/pages/practice/exam-specific/GrePracticePage';
import GmatPracticePage from '@/pages/practice/exam-specific/GmatPracticePage';
import SatPracticePage from '@/pages/practice/exam-specific/SatPracticePage';

// Country profile component
import CountryProfile from '@/components/abroad/CountryProfile';

// Admin pages
import { DemoAdminLogin } from '@/components/admin/DemoAdminLogin';
import Dashboard from '@/pages/admin/Dashboard';
import UsersCMS from '@/pages/admin/UsersCMS';
import ResourceManagement from '@/pages/admin/ResourceManagement';
import ExamSectionPage from '@/pages/admin/ExamSectionPage';
import ReadingTaskCMS from '@/pages/admin/ReadingTaskCMS';
import WritingTaskCMS from '@/pages/admin/WritingTaskCMS';
import SpeakingReviewPage from '@/pages/admin/SpeakingReviewPage';
import BlogPostCMS from '@/pages/admin/BlogPostCMS';
import Marketing from '@/pages/admin/Marketing';
import Settings from '@/pages/admin/Settings';
import IeltsTaskManager from '@/pages/admin/IeltsTaskManager';
import ListeningTaskCMS from '@/pages/admin/ListeningTaskCMS';

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
        <Route path="/abroad" element={<CountriesPage />} />
        <Route path="/country/:countrySlug" element={<CountryProfile />} />
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
        {/* IELTS Section Routes */}
        <Route path="/practice/ielts/reading" element={<ReadingPractice />} />
        <Route path="/practice/ielts/listening" element={<ListeningPractice />} />
        <Route path="/practice/ielts/writing" element={<WritingPractice />} />
        <Route path="/practice/ielts/speaking" element={<SpeakingPractice examType="ielts" />} />
        
        {/* TOEFL Section Routes */}
        <Route path="/practice/toefl/reading" element={<ReadingPractice />} />
        <Route path="/practice/toefl/listening" element={<ListeningPractice />} />
        <Route path="/practice/toefl/writing" element={<WritingPractice />} />
        <Route path="/practice/toefl/speaking" element={<SpeakingPractice examType="toefl" />} />
        
        {/* PTE Section Routes */}
        <Route path="/practice/pte/reading" element={<ReadingPractice examType="pte" />} />
        <Route path="/practice/pte/listening" element={<ListeningPractice examType="pte" />} />
        <Route path="/practice/pte/speaking" element={<SpeakingPractice examType="pte" />} />
        <Route path="/practice/pte/writing" element={<WritingPractice examType="pte" />} />
        
        {/* SAT Section Routes */}
        <Route path="/practice/sat/reading" element={<ReadingPractice />} />
        <Route path="/practice/sat/math" element={<ReadingPractice />} />
        
        {/* GRE Section Routes */}
        <Route path="/practice/gre/verbal" element={<ReadingPractice />} />
        <Route path="/practice/gre/quantitative" element={<ReadingPractice />} />
        <Route path="/practice/gre/analytical" element={<WritingPractice />} />
        <Route path="/practice/gre/mixed" element={<ReadingPractice />} />
        
        {/* GMAT Section Routes */}
        <Route path="/practice/gmat/verbal" element={<ReadingPractice />} />
        <Route path="/practice/gmat/quantitative" element={<ReadingPractice />} />
        <Route path="/practice/gmat/integrated" element={<ReadingPractice />} />
        <Route path="/practice/gmat/analytical" element={<WritingPractice />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<DemoAdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
        <Route path="/admin/users" element={<AdminProtectedRoute><UsersCMS /></AdminProtectedRoute>} />
        <Route path="/admin/resources" element={<AdminProtectedRoute><ResourceManagement /></AdminProtectedRoute>} />
        <Route path="/admin/exam-sections" element={<AdminProtectedRoute><ExamSectionPage /></AdminProtectedRoute>} />
        <Route path="/admin/reading-tasks" element={<AdminProtectedRoute><ReadingTaskCMS /></AdminProtectedRoute>} />
        <Route path="/admin/writing-tasks" element={<AdminProtectedRoute><WritingTaskCMS /></AdminProtectedRoute>} />
        <Route path="/admin/speaking-review" element={<AdminProtectedRoute><SpeakingReviewPage /></AdminProtectedRoute>} />
        <Route path="/admin/blog-posts" element={<AdminProtectedRoute><BlogPostCMS /></AdminProtectedRoute>} />
        <Route path="/admin/marketing" element={<AdminProtectedRoute><Marketing /></AdminProtectedRoute>} />
        <Route path="/admin/settings" element={<AdminProtectedRoute><Settings /></AdminProtectedRoute>} />
        <Route path="/admin/ielts-overview" element={<AdminProtectedRoute><IeltsTaskManager /></AdminProtectedRoute>} />
        <Route path="/admin/listening-tasks" element={<AdminProtectedRoute><ListeningTaskCMS /></AdminProtectedRoute>} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// Create a protected route component for admin routes
const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = sessionStorage.getItem('demoAdminLoggedIn') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  
  return <>{children}</>;
};

export default App;
