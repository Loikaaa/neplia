
import React from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import ReadingTaskCMS from '@/pages/admin/ReadingTaskCMS';
import WritingTaskCMS from '@/pages/admin/WritingTaskCMS';
import { SpeakingTestManagement } from '@/components/admin/speaking/SpeakingTestManagement';

const ExamSectionPage = () => {
  const { examType, sectionType } = useParams<{ examType: string; sectionType: string }>();
  
  const renderContent = () => {
    // Handle different exam types with their specific sections
    if (examType === 'ielts' || examType === 'toefl' || examType === 'pte') {
      // English proficiency exams (reading, writing, listening, speaking)
      if (sectionType === 'reading') {
        return <ReadingTaskCMS />;
      } else if (sectionType === 'writing') {
        return <WritingTaskCMS />;
      } else if (sectionType === 'speaking') {
        return <SpeakingTestManagement />;
      } else if (sectionType === 'listening') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Listening Section Management</h2>
            <p className="text-muted-foreground">
              Full listening task management coming soon.
            </p>
          </div>
        );
      }
    } else if (examType === 'sat') {
      // SAT sections (math, english)
      if (sectionType === 'math') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">SAT Math Section Management</h2>
            <p className="text-muted-foreground">
              Manage math questions across algebra, problem solving and advanced math.
            </p>
          </div>
        );
      } else if (sectionType === 'english') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">SAT English Section Management</h2>
            <p className="text-muted-foreground">
              Manage reading, writing and language questions.
            </p>
          </div>
        );
      }
    } else if (examType === 'gre') {
      // GRE sections
      if (sectionType === 'verbal') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">GRE Verbal Reasoning Management</h2>
            <p className="text-muted-foreground">
              Manage verbal reasoning questions and tasks.
            </p>
          </div>
        );
      } else if (sectionType === 'quantitative') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">GRE Quantitative Reasoning Management</h2>
            <p className="text-muted-foreground">
              Manage quantitative reasoning questions and problems.
            </p>
          </div>
        );
      } else if (sectionType === 'analytical') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">GRE Analytical Writing Management</h2>
            <p className="text-muted-foreground">
              Manage analytical writing tasks and prompts.
            </p>
          </div>
        );
      }
    }
    
    // Default coming soon message for sections under development
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          {examType?.toUpperCase()} {sectionType?.charAt(0).toUpperCase() + sectionType?.slice(1)} section is under development.
        </p>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            {examType?.toUpperCase()} {sectionType?.charAt(0).toUpperCase() + sectionType?.slice(1)}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage {examType?.toUpperCase()} {sectionType?.charAt(0).toUpperCase() + sectionType?.slice(1)} tasks and questions
          </p>
        </div>
        
        {renderContent()}
      </div>
    </AdminLayout>
  );
};

export default ExamSectionPage;
