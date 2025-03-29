
import React from 'react';
import { Settings, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

// Get country name from code
const getCountryName = (code: string): string => {
  const countries: Record<string, { name: string, flag: string }> = {
    'us': { name: 'United States', flag: '🇺🇸' },
    'ca': { name: 'Canada', flag: '🇨🇦' },
    'uk': { name: 'United Kingdom', flag: '🇬🇧' },
    'au': { name: 'Australia', flag: '🇦🇺' },
    'nz': { name: 'New Zealand', flag: '🇳🇿' },
    'in': { name: 'India', flag: '🇮🇳' },
    'sg': { name: 'Singapore', flag: '🇸🇬' },
    'my': { name: 'Malaysia', flag: '🇲🇾' },
    'ph': { name: 'Philippines', flag: '🇵🇭' },
    'hk': { name: 'Hong Kong', flag: '🇭🇰' },
    'de': { name: 'Germany', flag: '🇩🇪' },
    'fr': { name: 'France', flag: '🇫🇷' },
    'it': { name: 'Italy', flag: '🇮🇹' },
    'es': { name: 'Spain', flag: '🇪🇸' },
    'jp': { name: 'Japan', flag: '🇯🇵' },
    'cn': { name: 'China', flag: '🇨🇳' },
    'br': { name: 'Brazil', flag: '🇧🇷' },
    'mx': { name: 'Mexico', flag: '🇲🇽' },
    'nl': { name: 'Netherlands', flag: '🇳🇱' },
    'se': { name: 'Sweden', flag: '🇸🇪' },
  };
  
  return countries[code] ? `${countries[code].flag} ${countries[code].name}` : 'Not specified';
};

// Get exam name from ID
const getExamName = (id: string): string => {
  const exams: Record<string, string> = {
    'ielts-academic': 'IELTS Academic 🎓',
    'ielts-general': 'IELTS General Training ✈️',
    'toefl': 'TOEFL 📝',
    'pte': 'PTE Academic 🖥️',
    'duolingo': 'Duolingo English Test 🦉',
    'cambridge': 'Cambridge English 🏛️',
  };
  
  return exams[id] || 'Not specified';
};

const UserPreferences: React.FC = () => {
  const navigate = useNavigate();
  const selectedCountry = localStorage.getItem('selectedCountry') || '';
  const selectedExam = localStorage.getItem('selectedExam') || '';

  const handleEditPreferences = () => {
    navigate('/selection');
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5 text-indigo" />
          Your Preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Country</div>
            <div className="font-medium">
              {selectedCountry ? getCountryName(selectedCountry) : 'Not specified'}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground mb-1">Target Exam</div>
            <div className="font-medium">
              {selectedExam ? getExamName(selectedExam) : 'Not specified'}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2" 
            onClick={handleEditPreferences}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPreferences;
