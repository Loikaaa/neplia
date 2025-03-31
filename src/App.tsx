
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import PracticePage from "./pages/practice/PracticePage";
import IeltsPage from "./pages/exams/IeltsPage";
import ToeflPage from "./pages/exams/ToeflPage";
import SatPage from "./pages/exams/SatPage";
import GrePage from "./pages/exams/GrePage";
import GmatPage from "./pages/exams/GmatPage";
import PtePage from "./pages/exams/PtePage";
import ListeningPractice from "./pages/practice/ListeningPractice";
import ReadingPractice from "./pages/practice/ReadingPractice";
import WritingPractice from "./pages/practice/WritingPractice";
import SpeakingPractice from "./pages/practice/SpeakingPractice";
import MockTestPage from "./pages/practice/MockTestPage";
import SelectionHome from "./pages/SelectionHome";
import CountriesPage from "./pages/CountriesPage";
import BlogPost from "./pages/BlogPost";
import UserDashboard from "./pages/UserDashboard";
import ResourcesHome from "./pages/ResourcesHome";
import Resources from "./pages/Resources";
import AllResources from "./pages/AllResources";
import CategoryDetail from "./pages/CategoryDetail";
import ResourceDetail from "./pages/ResourceDetail";
import Blog from "./pages/Blog";

// Admin Routes
import Dashboard from "./pages/admin/Dashboard";
import ResourceManagement from "./pages/admin/ResourceManagement";
import BlogPostCMS from "./pages/admin/BlogPostCMS";
import ExamSectionPage from "./pages/admin/ExamSectionPage";
import ReadingTaskCMS from "./pages/admin/ReadingTaskCMS";
import WritingTaskCMS from "./pages/admin/WritingTaskCMS";
import SpeakingReviewPage from "./pages/admin/SpeakingReviewPage";
import UsersCMS from "./pages/admin/UsersCMS";
import Marketing from "./pages/admin/Marketing";
import Settings from "./pages/admin/Settings";

// Footer Pages
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Practice Routes */}
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/practice/listening" element={<ListeningPractice />} />
        <Route path="/practice/reading" element={<ReadingPractice />} />
        <Route path="/practice/writing" element={<WritingPractice />} />
        <Route path="/practice/speaking" element={<SpeakingPractice />} />
        <Route path="/practice/mock-test" element={<MockTestPage />} />
        
        {/* Exam Routes */}
        <Route path="/exams/ielts" element={<IeltsPage />} />
        <Route path="/exams/toefl" element={<ToeflPage />} />
        <Route path="/exams/sat" element={<SatPage />} />
        <Route path="/exams/gre" element={<GrePage />} />
        <Route path="/exams/gmat" element={<GmatPage />} />
        <Route path="/exams/pte" element={<PtePage />} />
        
        {/* Selection & Countries */}
        <Route path="/selection" element={<SelectionHome />} />
        <Route path="/countries" element={<CountriesPage />} />
        
        {/* User Dashboard */}
        <Route path="/dashboard" element={<UserDashboard />} />
        
        {/* Resources Section */}
        <Route path="/resources" element={<ResourcesHome />} />
        <Route path="/resources/explore" element={<Resources />} />
        <Route path="/resources/all" element={<AllResources />} />
        <Route path="/resources/category/:id" element={<CategoryDetail />} />
        <Route path="/resources/:id" element={<ResourceDetail />} />
        
        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        
        {/* Footer Pages */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/resources" element={<ResourceManagement />} />
        <Route path="/admin/blog" element={<BlogPostCMS />} />
        <Route path="/admin/exams/:section" element={<ExamSectionPage />} />
        <Route path="/admin/exams/reading" element={<ReadingTaskCMS />} />
        <Route path="/admin/exams/writing" element={<WritingTaskCMS />} />
        <Route path="/admin/exams/speaking/review" element={<SpeakingReviewPage />} />
        <Route path="/admin/users" element={<UsersCMS />} />
        <Route path="/admin/marketing" element={<Marketing />} />
        <Route path="/admin/settings" element={<Settings />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
