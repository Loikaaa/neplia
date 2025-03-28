
import { SpeakingTask } from '@/types/speaking';

export const speakingTasksData: SpeakingTask[] = [
  // Family category
  {
    id: 'speaking-family',
    title: 'Family and Relationships',
    description: 'Questions about your family and relationships',
    category: 'family',
    questions: [
      {
        id: 'family-q1',
        part: 1,
        text: 'Do you have a large or small family?',
        duration: 60,
        category: 'family'
      },
      {
        id: 'family-q2',
        part: 1,
        text: 'How much time do you spend with your family?',
        duration: 60,
        followUp: [
          'What do you usually do together?',
          'Do you think families spend enough time together these days?'
        ],
        category: 'family'
      },
      {
        id: 'family-q3',
        part: 2,
        text: "Describe a family member who you are close to. You should say:\n\n• Who this person is\n• What this person does\n• What kind of person they are\n• And explain why you are close to this person",
        preparation: 60,
        duration: 120,
        notes: "You have one minute to prepare. Then you'll need to talk about the topic for one to two minutes. You can make notes if you wish.",
        category: 'family'
      },
      {
        id: 'family-q4',
        part: 3,
        text: 'How have families in your country changed in recent decades?',
        duration: 60,
        category: 'family'
      },
      {
        id: 'family-q5',
        part: 3,
        text: 'Do you think the role of grandparents in childcare is important?',
        duration: 60,
        category: 'family'
      }
    ]
  },
  
  // Work category
  {
    id: 'speaking-work',
    title: 'Work and Career',
    description: 'Questions about work, careers and professional life',
    category: 'work',
    questions: [
      {
        id: 'work-q1',
        part: 1,
        text: 'Do you work or are you a student?',
        duration: 60,
        followUp: [
          'What do you do for work?',
          'Why did you choose this career?'
        ],
        category: 'work'
      },
      {
        id: 'work-q2',
        part: 1,
        text: 'What aspects of your job do you find most challenging?',
        duration: 60,
        category: 'work'
      },
      {
        id: 'work-q3',
        part: 2,
        text: "Describe a job you would like to do in the future. You should say:\n\n• What the job is\n• What skills or qualifications you would need\n• Where you would be working\n• And explain why you would like to do this job",
        preparation: 60,
        duration: 120,
        notes: "You have one minute to prepare. Then you'll need to talk about the topic for one to two minutes. You can make notes if you wish.",
        category: 'work'
      },
      {
        id: 'work-q4',
        part: 3,
        text: 'Do you think it's better to have a job that pays well or one that you enjoy?',
        duration: 60,
        category: 'work'
      },
      {
        id: 'work-q5',
        part: 3,
        text: 'How do you think the job market will change in the next 20 years?',
        duration: 60,
        category: 'work'
      }
    ]
  },
  
  // Education category
  {
    id: 'speaking-education',
    title: 'Education and Learning',
    description: 'Questions about education, learning and studying',
    category: 'education',
    questions: [
      {
        id: 'education-q1',
        part: 1,
        text: 'What subject did you enjoy most at school?',
        duration: 60,
        followUp: [
          'Why did you enjoy it?',
          'Was there a teacher who influenced you particularly?'
        ],
        category: 'education'
      },
      {
        id: 'education-q2',
        part: 1,
        text: 'Do you think learning languages is important?',
        duration: 60,
        category: 'education'
      },
      {
        id: 'education-q3',
        part: 2,
        text: "Describe a teacher who has influenced you in your education. You should say:\n\n• Who this person is/was\n• What subject they taught\n• What was special about them\n• And explain how they influenced you",
        preparation: 60,
        duration: 120,
        notes: "You have one minute to prepare. Then you'll need to talk about the topic for one to two minutes. You can make notes if you wish.",
        category: 'education'
      },
      {
        id: 'education-q4',
        part: 3,
        text: 'How has education changed in your country in the last 20 years?',
        duration: 60,
        category: 'education'
      },
      {
        id: 'education-q5',
        part: 3,
        text: 'Do you think online learning is as effective as traditional classroom learning?',
        duration: 60,
        category: 'education'
      }
    ]
  },
  
  // Hometown category
  {
    id: 'speaking-hometown',
    title: 'Hometown and Local Area',
    description: 'Questions about your hometown and local area',
    category: 'hometown',
    questions: [
      {
        id: 'hometown-q1',
        part: 1,
        text: 'Where is your hometown located?',
        duration: 60,
        category: 'hometown'
      },
      {
        id: 'hometown-q2',
        part: 1,
        text: 'What do you like most about your hometown?',
        duration: 60,
        followUp: [
          'Has your hometown changed much in recent years?',
          'Would you like to live there in the future?'
        ],
        category: 'hometown'
      },
      {
        id: 'hometown-q3',
        part: 2,
        text: "Describe a place of interest in your hometown that you would recommend to visitors. You should say:\n\n• Where it is\n• What people can do there\n• What makes it special\n• And explain why you would recommend it",
        preparation: 60,
        duration: 120,
        notes: "You have one minute to prepare. Then you'll need to talk about the topic for one to two minutes. You can make notes if you wish.",
        category: 'hometown'
      },
      {
        id: 'hometown-q4',
        part: 3,
        text: 'How are small towns different from big cities in your country?',
        duration: 60,
        category: 'hometown'
      },
      {
        id: 'hometown-q5',
        part: 3,
        text: 'Do you think the government should invest more in developing rural areas?',
        duration: 60,
        category: 'hometown'
      }
    ]
  },
  
  // Travel category
  {
    id: 'speaking-travel',
    title: 'Travel and Tourism',
    description: 'Questions about travel experiences and tourism',
    category: 'travel',
    questions: [
      {
        id: 'travel-q1',
        part: 1,
        text: 'Do you like to travel?',
        duration: 60,
        followUp: [
          'What type of places do you like to visit?',
          'Do you prefer traveling alone or with other people?'
        ],
        category: 'travel'
      },
      {
        id: 'travel-q2',
        part: 1,
        text: 'What's the most interesting place you've visited?',
        duration: 60,
        category: 'travel'
      },
      {
        id: 'travel-q3',
        part: 2,
        text: "Describe a memorable journey you have taken. You should say:\n\n• Where you went\n• How you traveled there\n• Who you were with\n• And explain why this journey was memorable",
        preparation: 60,
        duration: 120,
        notes: "You have one minute to prepare. Then you'll need to talk about the topic for one to two minutes. You can make notes if you wish.",
        category: 'travel'
      },
      {
        id: 'travel-q4',
        part: 3,
        text: 'How has tourism changed in your country in recent years?',
        duration: 60,
        category: 'travel'
      },
      {
        id: 'travel-q5',
        part: 3,
        text: 'Do you think tourism can have negative effects on local communities?',
        duration: 60,
        category: 'travel'
      }
    ]
  }
];
