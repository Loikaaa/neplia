
import React from 'react';
import { useToast } from "@/hooks/use-toast";

interface AIWritingAssistantProps {
  essayText: string;
  prompt: string;
  onFeedbackReceived: (feedback: string) => void;
}

export const AIWritingAssistant = async ({ essayText, prompt, onFeedbackReceived }: AIWritingAssistantProps) => {
  const { toast } = useToast();

  const getAIFeedback = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful GRE analytical writing evaluator. Analyze essays and provide constructive feedback focusing on: argument structure, evidence usage, logical flow, and language clarity. Be specific and actionable in your suggestions."
            },
            {
              role: "user",
              content: `Please evaluate this GRE analytical writing essay for the following prompt: "${prompt}"\n\nEssay: ${essayText}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        const feedback = data.choices[0].message.content;
        onFeedbackReceived(feedback);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI feedback. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return getAIFeedback();
};
