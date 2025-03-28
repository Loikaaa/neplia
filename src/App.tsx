import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ListeningPractice from "./pages/practice/ListeningPractice";
import ReadingPractice from "./pages/practice/ReadingPractice";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import CategoryDetail from "./pages/CategoryDetail";
import AllResources from "./pages/AllResources";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import WritingPractice from "./pages/practice/WritingPractice";
import SpeakingPractice from "./pages/practice/SpeakingPractice";
import PracticePage from "./pages/practice/PracticePage";
import MockTestPage from "./pages/practice/MockTestPage";
import AdminLink from "./components/AdminLink";
import UserDashboard from "./pages/UserDashboard";

// Admin pages
import BlogPostCMS from "./pages/admin/BlogPostCMS";
import UsersCMS from "./pages/admin/UsersCMS";
import Settings from "./pages/admin/Settings";
import Dashboard from "./pages/admin/Dashboard";
import ExamSectionPage from "./pages/admin/ExamSectionPage";
import SpeakingReviewPage from "./pages/admin/SpeakingReviewPage";
import { DemoAdminLogin } from "./components/admin/DemoAdminLogin";

// Protected route component for Admin
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = sessionStorage.getItem('demoAdminLoggedIn') === 'true';
  const rememberedAdmin = localStorage.getItem('rememberAdminLogin') === 'true';
  const adminUsername = localStorage.getItem('adminUsername') === 'admin';
  const location = useLocation();
  
  useEffect(() => {
    if (rememberedAdmin && adminUsername && !isLoggedIn) {
      sessionStorage.setItem('demoAdminLoggedIn', 'true');
    }
  }, [rememberedAdmin, adminUsername, isLoggedIn]);
  
  if (!isLoggedIn && !(rememberedAdmin && adminUsername)) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

// Protected route for User Dashboard
const ProtectedUserRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('demoUserLoggedIn') === 'true';
  const location = useLocation();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Define App as a proper React functional component with React.FC type
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<><Index /><AdminLink /></>} />
              <Route path="/practice" element={<><PracticePage /><AdminLink /></>} />
              <Route path="/practice/listening" element={<><ListeningPractice /><AdminLink /></>} />
              <Route path="/practice/reading" element={<><ReadingPractice /><AdminLink /></>} />
              <Route path="/practice/writing" element={<><WritingPractice /><AdminLink /></>} />
              <Route path="/practice/speaking" element={<><SpeakingPractice /><AdminLink /></>} />
              <Route path="/practice/mock-test" element={<><MockTestPage /><AdminLink /></>} />
              <Route path="/practice/mock-tests" element={<><MockTestPage /><AdminLink /></>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedUserRoute><UserDashboard /></ProtectedUserRoute>} />
              <Route path="/resources" element={<><Resources /><AdminLink /></>} />
              <Route path="/resources/all" element={<><AllResources /><AdminLink /></>} />
              <Route path="/resources/:resourceId" element={<><ResourceDetail /><AdminLink /></>} />
              <Route path="/resources/category/:categoryId" element={<><CategoryDetail /><AdminLink /></>} />
              <Route path="/about" element={<><About /><AdminLink /></>} />
              <Route path="/blog" element={<><Blog /><AdminLink /></>} />
              <Route path="/blog/:slug" element={<><BlogPost /><AdminLink /></>} />
              
              <Route path="/admin/login" element={<DemoAdminLogin />} />
              
              <Route path="/admin" element={<ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute>} />
              <Route path="/admin/blog-posts" element={<ProtectedAdminRoute><BlogPostCMS /></ProtectedAdminRoute>} />
              <Route path="/admin/users" element={<ProtectedAdminRoute><UsersCMS /></ProtectedAdminRoute>} />
              <Route path="/admin/settings" element={<ProtectedAdminRoute><Settings /></ProtectedAdminRoute>} />
              
              <Route path="/admin/exams/:examType/:sectionType" element={<ProtectedAdminRoute><ExamSectionPage /></ProtectedAdminRoute>} />
              <Route path="/admin/speaking-reviews" element={<ProtectedAdminRoute><SpeakingReviewPage /></ProtectedAdminRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </React.StrictMode>
    </QueryClientProvider>
  );
};

export default App;
