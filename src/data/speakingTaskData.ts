
import { SpeakingTask } from '@/types/speaking';

export const speakingTaskData: SpeakingTask = {
  id: 'speaking-task-1',
  title: 'IELTS Speaking Practice Test 1',
  description: 'A complete IELTS speaking test with all three parts.',
  questions: [
    // Part 1: Introduction and Interview
    {
      id: 'q1',
      part: 1,
      text: 'Can you tell me your full name, please?',
      duration: 30,
    },
    {
      id: 'q2',
      part: 1,
      text: 'Where are you from?',
      duration: 30,
    },
    {
      id: 'q3',
      part: 1,
      text: 'Do you work or are you a student?',
      duration: 30,
      followUp: [
        'What do you do for work?',
        'What are you studying?',
        'Why did you choose this field?'
      ]
    },
    {
      id: 'q4',
      part: 1,
      text: 'Let\'s talk about your hometown. What is your hometown like?',
      duration: 60,
      followUp: [
        'What do you like most about your hometown?',
        'Has your hometown changed much in recent years?'
      ]
    },
    {
      id: 'q5',
      part: 1,
      text: 'Do you prefer to spend time indoors or outdoors?',
      duration: 60,
      followUp: [
        'What kind of indoor/outdoor activities do you enjoy?',
        'Did you spend more time indoors or outdoors when you were a child?'
      ]
    },
    
    // Part 2: Individual Long Turn
    {
      id: 'q6',
      part: 2,
      text: "I'd like you to describe a book you have read that you found particularly interesting. You should say:\n\n• What the book was\n• When you read it\n• What it was about\n• And explain why you found it particularly interesting.",
      preparation: 60,
      duration: 120,
      notes: "You have one minute to prepare. Then you'll need to talk about the topic for one to two minutes. You can make notes if you wish."
    },
    
    // Part 3: Two-way Discussion
    {
      id: 'q7',
      part: 3,
      text: 'Do you think reading habits are changing in your country?',
      duration: 60,
    },
    {
      id: 'q8',
      part: 3,
      text: 'In what ways do you think digital books differ from printed books?',
      duration: 60,
    },
    {
      id: 'q9',
      part: 3,
      text: 'Do you think schools should encourage children to read more fiction or non-fiction?',
      duration: 60,
    },
    {
      id: 'q10',
      part: 3,
      text: 'How important do you think reading is for language development?',
      duration: 60,
    }
  ]
};
