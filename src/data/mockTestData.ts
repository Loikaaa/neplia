
import { MockTest } from '../types/mockTest';

export const mockTestData: MockTest = {
  id: 'mock-test-1',
  title: 'IELTS Academic Mock Test',
  description: 'Complete IELTS Academic mock test simulating the real exam experience',
  totalDuration: 170, // 2h 50m
  sections: [
    {
      id: 'listening-section',
      title: 'Listening Test',
      type: 'listening',
      description: 'Listen to four recordings and answer questions based on what you hear',
      duration: 30,
      questions: [
        {
          id: 'l-q1',
          text: 'What is the woman\'s student ID number?',
          type: 'fill-in-blank',
          correctAnswer: '7856321'
        },
        {
          id: 'l-q2',
          text: 'Which course is the woman interested in?',
          type: 'multiple-choice',
          options: [
            { id: 'l-q2-a', text: 'Business Administration' },
            { id: 'l-q2-b', text: 'International Relations' },
            { id: 'l-q2-c', text: 'Computer Science' }
          ],
          correctAnswer: 'l-q2-c'
        },
        {
          id: 'l-q3',
          text: 'When is the library open on weekends?',
          type: 'multiple-choice',
          options: [
            { id: 'l-q3-a', text: '9am - 5pm' },
            { id: 'l-q3-b', text: '10am - 4pm' },
            { id: 'l-q3-c', text: '11am - 3pm' }
          ],
          correctAnswer: 'l-q3-b'
        }
      ]
    },
    {
      id: 'reading-section',
      title: 'Reading Test',
      type: 'reading',
      description: 'Read three passages and answer questions to demonstrate your comprehension',
      duration: 60,
      questions: [
        {
          id: 'r-q1',
          text: 'According to the passage, what is the main cause of deforestation in the Amazon?',
          type: 'multiple-choice',
          options: [
            { id: 'r-q1-a', text: 'Climate change' },
            { id: 'r-q1-b', text: 'Agricultural expansion' },
            { id: 'r-q1-c', text: 'Urban development' }
          ],
          correctAnswer: 'r-q1-b'
        },
        {
          id: 'r-q2',
          text: 'The author suggests that coral reefs are:',
          type: 'multiple-choice',
          options: [
            { id: 'r-q2-a', text: 'Resilient to all environmental changes' },
            { id: 'r-q2-b', text: 'Threatened by multiple factors' },
            { id: 'r-q2-c', text: 'Only important for tourism' }
          ],
          correctAnswer: 'r-q2-b'
        },
        {
          id: 'r-q3',
          text: 'Complete the summary using words from the passage: The researcher concluded that the experiment was ____.',
          type: 'fill-in-blank',
          correctAnswer: 'inconclusive'
        }
      ]
    },
    {
      id: 'writing-section',
      title: 'Writing Test',
      type: 'writing',
      description: 'Complete two writing tasks to demonstrate your writing skills',
      duration: 60,
      questions: [
        {
          id: 'w-q1',
          text: 'The graph below shows the percentage of households with internet access in three different countries between 2000 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
          type: 'essay',
          maxWords: 150
        },
        {
          id: 'w-q2',
          text: 'Some people believe that universities should focus more on academic subjects, while others think they should prepare students for their future careers. Discuss both views and give your opinion.',
          type: 'essay',
          maxWords: 250
        }
      ]
    },
    {
      id: 'speaking-section',
      title: 'Speaking Test',
      type: 'speaking',
      description: 'Complete a face-to-face interview with three parts',
      duration: 14,
      questions: [
        {
          id: 's-q1',
          text: 'Let\'s talk about your hometown. What do you like most about living there?',
          type: 'speaking-prompt'
        },
        {
          id: 's-q2',
          text: 'Describe a time when you helped someone. You should say: who you helped, how you helped them, why they needed help, and explain how you felt about helping them.',
          type: 'speaking-prompt'
        },
        {
          id: 's-q3',
          text: 'Do you think people help each other more or less than they did in the past? Why do you think this is?',
          type: 'speaking-prompt'
        }
      ]
    }
  ]
};

export const getRecommendationForBand = (band: number): string => {
  if (band >= 8) {
    return "Your English language skills are exceptional. Consider applying for universities or jobs with high language requirements. To maintain your proficiency, engage with complex academic texts, participate in debates, and practice formal writing.";
  } else if (band >= 7) {
    return "You have a good command of English with occasional inaccuracies. Focus on improving complex grammatical structures, expanding academic vocabulary, and enhancing your writing coherence and cohesion.";
  } else if (band >= 6) {
    return "You have a generally effective command of English. To improve, practice academic reading daily, work on grammatical accuracy, expand your vocabulary range, and practice writing essays with clear organization.";
  } else if (band >= 5) {
    return "You have a modest command of English with noticeable inaccuracies. Concentrate on learning fundamental grammar rules, building your vocabulary through daily reading, and practicing speaking to improve fluency.";
  } else {
    return "You need to strengthen your basic English skills. Start with foundational grammar, build essential vocabulary, and immerse yourself in English through daily listening and reading practice.";
  }
};

export const getSectionSpecificRecommendation = (section: 'listening' | 'reading' | 'writing' | 'speaking', score: number): string => {
  if (section === 'listening') {
    if (score >= 7) {
      return "Excellent listening skills. Practice with more complex academic lectures and discussions to maintain your proficiency.";
    } else if (score >= 6) {
      return "Practice with various accents and academic lectures. Focus on note-taking strategies during listening tasks.";
    } else {
      return "Build your listening skills by practicing with different audio types daily. Work on identifying main ideas and specific details.";
    }
  } else if (section === 'reading') {
    if (score >= 7) {
      return "Strong reading comprehension. Challenge yourself with complex academic texts and practice speed reading techniques.";
    } else if (score >= 6) {
      return "Improve skimming and scanning techniques. Practice reading academic texts and identifying arguments and supporting evidence.";
    } else {
      return "Focus on building vocabulary and understanding paragraph structure. Practice reading various text types daily.";
    }
  } else if (section === 'writing') {
    if (score >= 7) {
      return "Good writing skills. Work on sophisticated vocabulary and complex sentence structures to enhance your expression.";
    } else if (score >= 6) {
      return "Practice essay planning and paragraph organization. Focus on task achievement and coherence in your writing.";
    } else {
      return "Strengthen basic grammar and sentence construction. Practice writing different essay types and focus on clear structure.";
    }
  } else { // speaking
    if (score >= 7) {
      return "Articulate speaker. Continue practicing with complex topics and work on reducing any minor hesitations.";
    } else if (score >= 6) {
      return "Work on fluency and coherence in extended responses. Practice speaking on unfamiliar topics to improve flexibility.";
    } else {
      return "Build confidence by speaking English daily. Focus on basic pronunciation and expanding your vocabulary for everyday topics.";
    }
  }
};
