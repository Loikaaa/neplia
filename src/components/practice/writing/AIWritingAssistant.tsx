
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Bot, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AIWritingAssistantProps {
  prompt?: string;
  onSuggestion?: (suggestion: string) => void;
}

export const AIWritingAssistant = ({ prompt, onSuggestion }: AIWritingAssistantProps) => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const { toast } = useToast();

  const getAIFeedback = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to use the AI assistant.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful GRE analytical writing assistant. Provide constructive feedback and suggestions to improve essays."
            },
            {
              role: "user",
              content: `Please help me improve this text for my GRE analytical writing section: ${userInput}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        const suggestion = data.choices[0].message.content;
        onSuggestion?.(suggestion);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI feedback. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Bot className="w-4 h-4" />
        <span>AI Writing Assistant</span>
      </div>

      <input
        type="password"
        placeholder="Enter your OpenAI API key"
        className="w-full p-2 border rounded"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />

      <Textarea
        placeholder="Enter your text here for AI feedback..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="min-h-[100px]"
      />

      <Button 
        onClick={getAIFeedback}
        disabled={loading || !userInput.trim()}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Getting Feedback...
          </>
        ) : (
          'Get AI Feedback'
        )}
      </Button>
    </Card>
  );
};
