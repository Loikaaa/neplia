
export interface SpeakingQuestion {
  id: string;
  part: 1 | 2 | 3;
  text: string;
  duration?: number; // in seconds
  preparation?: number; // in seconds for Part 2
  notes?: string;
  followUp?: string[];
}

export interface SpeakingTask {
  id: string;
  title: string;
  description: string;
  questions: SpeakingQuestion[];
}
