
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AdminLink from "./components/AdminLink";

// Admin pages
import WritingTaskCMS from "./pages/admin/WritingTaskCMS";
import ReadingTaskCMS from "./pages/admin/ReadingTaskCMS";
import BlogPostCMS from "./pages/admin/BlogPostCMS";
import UsersCMS from "./pages/admin/UsersCMS";
import Settings from "./pages/admin/Settings";
import Dashboard from "./pages/admin/Dashboard";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Define App as a proper React functional component with React.FC type
const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<><Index /><AdminLink /></>} />
              <Route path="/practice/listening" element={<><ListeningPractice /><AdminLink /></>} />
              <Route path="/practice/reading" element={<><ReadingPractice /><AdminLink /></>} />
              <Route path="/practice/writing" element={<><WritingPractice /><AdminLink /></>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/resources" element={<><Resources /><AdminLink /></>} />
              <Route path="/resources/all" element={<><AllResources /><AdminLink /></>} />
              <Route path="/resources/:resourceId" element={<><ResourceDetail /><AdminLink /></>} />
              <Route path="/resources/category/:categoryId" element={<><CategoryDetail /><AdminLink /></>} />
              <Route path="/about" element={<><About /><AdminLink /></>} />
              <Route path="/blog" element={<><Blog /><AdminLink /></>} />
              <Route path="/blog/:slug" element={<><BlogPost /><AdminLink /></>} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/writing-tasks" element={<WritingTaskCMS />} />
              <Route path="/admin/reading-tasks" element={<ReadingTaskCMS />} />
              <Route path="/admin/blog-posts" element={<BlogPostCMS />} />
              <Route path="/admin/users" element={<UsersCMS />} />
              <Route path="/admin/settings" element={<Settings />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
