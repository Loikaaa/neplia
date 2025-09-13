import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Resource } from '@/types/resource';

interface ResourceDownloadButtonProps {
  resource: Resource;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

const ResourceDownloadButton: React.FC<ResourceDownloadButtonProps> = ({ 
  resource, 
  size = 'default', 
  className = '', 
  variant = 'default' 
}) => {
  const handleDownload = () => {
    // Generate content based on resource type
    let content = '';
    let filename = '';
    let mimeType = 'text/plain';
    
    switch (resource.type.toLowerCase()) {
      case 'pdf':
      case 'study guide':
      case 'practice test':
        content = generateStudyContent(resource);
        filename = `${resource.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
        break;
      case 'audio':
        content = generateAudioContent(resource);
        filename = `${resource.title.replace(/[^a-zA-Z0-9]/g, '_')}_audio_guide.txt`;
        break;
      case 'video':
        content = generateVideoContent(resource);
        filename = `${resource.title.replace(/[^a-zA-Z0-9]/g, '_')}_video_guide.txt`;
        break;
      case 'worksheet':
        content = generateWorksheetContent(resource);
        filename = `${resource.title.replace(/[^a-zA-Z0-9]/g, '_')}_worksheet.txt`;
        break;
      default:
        content = generateStudyContent(resource);
        filename = `${resource.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    }
    
    // Create and download the file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Complete",
      description: `${resource.title} has been downloaded successfully!`,
    });
  };
  
  const generateStudyContent = (resource: Resource) => {
    return `${resource.title}
${'='.repeat(resource.title.length)}

RESOURCE INFORMATION
━━━━━━━━━━━━━━━━━━━━
Type: ${resource.type}
Category: ${resource.category}
Rating: ${'★'.repeat(Math.floor(resource.rating))} (${resource.rating}/5)
Downloads: ${resource.downloads}

DESCRIPTION
━━━━━━━━━━━
${resource.description}

STUDY CONTENT
━━━━━━━━━━━━━
This comprehensive study resource includes:

• Key concepts and definitions
• Practice exercises and examples  
• Test-taking strategies and tips
• Common mistakes to avoid
• Progress tracking guidelines

PRACTICE EXERCISES
━━━━━━━━━━━━━━━━━━
[This section would contain actual practice questions and exercises based on the resource type]

Example Questions:
1. Multiple Choice Practice
2. Reading Comprehension
3. Writing Tasks
4. Speaking Prompts

ANSWER KEY & EXPLANATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━
[Detailed explanations for all practice exercises would be provided here]

ADDITIONAL RESOURCES
━━━━━━━━━━━━━━━━━━━━
• Visit neplia.com for more practice materials
• Join our community forums for discussion
• Access video tutorials and live sessions
• Track your progress with our dashboard

---
© ${new Date().getFullYear()} Neplia.com - All Rights Reserved
For support: support@neplia.com
`;
  };
  
  const generateAudioContent = (resource: Resource) => {
    return `${resource.title} - Audio Resource Guide
${'='.repeat(resource.title.length + 20)}

AUDIO RESOURCE INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Title: ${resource.title}
Type: ${resource.type}
Category: ${resource.category}
Rating: ${'★'.repeat(Math.floor(resource.rating))} (${resource.rating}/5)

DESCRIPTION
━━━━━━━━━━━
${resource.description}

LISTENING INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━
This audio resource includes:
• High-quality recordings with native speakers
• Various accents and speaking speeds
• Practice conversations and monologues
• Audio transcripts for reference

RECOMMENDED PRACTICE METHOD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. First Listen: Play without looking at questions
2. Second Listen: Read questions then listen again
3. Third Listen: Focus on specific details
4. Review: Check answers and read transcript

AUDIO TRANSCRIPT
━━━━━━━━━━━━━━━━
[In an actual audio resource, the full transcript would be provided here]

PRACTICE QUESTIONS
━━━━━━━━━━━━━━━━━━
Based on the audio content:
1. What is the main topic discussed?
2. Who are the speakers?
3. What is the speaker's opinion about...?
4. What information is mentioned about...?

---
© ${new Date().getFullYear()} Neplia.com - All Rights Reserved
Audio files available at: neplia.com/resources
`;
  };
  
  const generateVideoContent = (resource: Resource) => {
    return `${resource.title} - Video Resource Guide
${'='.repeat(resource.title.length + 20)}

VIDEO RESOURCE INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Title: ${resource.title}
Type: ${resource.type}
Category: ${resource.category}
Rating: ${'★'.repeat(Math.floor(resource.rating))} (${resource.rating}/5)

DESCRIPTION
━━━━━━━━━━━
${resource.description}

VIDEO CONTENT OVERVIEW
━━━━━━━━━━━━━━━━━━━━━━
This video tutorial covers:
• Step-by-step demonstrations
• Expert tips and strategies
• Common mistakes and how to avoid them
• Real exam examples and practice

VIEWING GUIDE
━━━━━━━━━━━━━
Recommended viewing approach:
1. Watch the entire video once for overview
2. Take notes during the second viewing
3. Practice along with the demonstrations
4. Review specific sections as needed

KEY LEARNING POINTS
━━━━━━━━━━━━━━━━━━━
• Understanding the exam format
• Time management strategies
• Effective preparation techniques
• Scoring criteria and expectations

SUPPLEMENTARY MATERIALS
━━━━━━━━━━━━━━━━━━━━━━━━━━
• Practice worksheets (download separately)
• Additional reading materials
• Online quizzes and assessments
• Community discussion forums

---
© ${new Date().getFullYear()} Neplia.com - All Rights Reserved
Watch video at: neplia.com/resources
`;
  };
  
  const generateWorksheetContent = (resource: Resource) => {
    return `${resource.title} - Practice Worksheet
${'='.repeat(resource.title.length + 20)}

WORKSHEET INFORMATION
━━━━━━━━━━━━━━━━━━━━━━
Title: ${resource.title}
Type: ${resource.type}
Category: ${resource.category}
Difficulty Level: Intermediate to Advanced

INSTRUCTIONS
━━━━━━━━━━━━━
Complete all exercises in order. Time yourself for realistic practice conditions.
Recommended time: 45-60 minutes

SECTION A: VOCABULARY BUILDING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Exercise 1: Word Definitions
Match the words with their correct definitions:

1. Comprehensive    a) Including everything
2. Evaluate        b) To judge or assess
3. Significant     c) Important or meaningful
4. Implement       d) To put into action
5. Analyze         e) To examine in detail

Exercise 2: Sentence Completion
Fill in the blanks with appropriate words:

1. The study provides a _______ analysis of the data.
2. We need to _______ the new policy next month.
3. The results show a _______ improvement in scores.

SECTION B: READING COMPREHENSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Sample passage would be included here]

Questions:
1. What is the main idea of the passage?
2. According to the author, what factors contribute to...?
3. The word "significant" in paragraph 2 most likely means...?

SECTION C: WRITING PRACTICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Task: Write a 250-word essay on the following topic:
"The importance of continuous learning in today's world"

Planning space:
- Introduction: ________________
- Main point 1: _______________
- Main point 2: _______________
- Conclusion: _________________

ANSWER KEY
━━━━━━━━━━━
[Complete answer key with explanations would be provided]

---
© ${new Date().getFullYear()} Neplia.com - All Rights Reserved
For more worksheets: neplia.com/resources
`;
  };

  return (
    <Button 
      onClick={handleDownload}
      size={size}
      variant={variant}
      className={`flex items-center gap-2 ${className}`}
    >
      <Download size={16} />
      Download
    </Button>
  );
};

export default ResourceDownloadButton;