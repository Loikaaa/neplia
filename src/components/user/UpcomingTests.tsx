
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UpcomingTests = () => {
  const currentDate = new Date();
  
  const tests = [
    {
      title: "Full Mock Test",
      date: new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      duration: "2 hours 45 minutes",
      isPriority: true
    },
    {
      title: "Reading Practice Test",
      date: new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      duration: "1 hour",
      isPriority: false
    },
    {
      title: "Writing Task 1 & 2",
      date: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      duration: "1 hour",
      isPriority: false
    }
  ];

  // Format date to display
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Card className="w-full shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <CalendarClock className="mr-2 h-5 w-5 text-indigo" />
          Upcoming Tests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tests.map((test, index) => (
            <div key={index} className={`border ${test.isPriority ? 'border-coral' : 'border-muted'} rounded-lg p-4`}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium flex items-center">
                  {test.isPriority && <AlertCircle className="mr-1 h-4 w-4 text-coral" />}
                  {test.title}
                </h3>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(test.date)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {test.duration}
                </div>
              </div>
              <Button size="sm" variant={test.isPriority ? "default" : "outline"} className={`w-full ${test.isPriority ? 'bg-coral hover:bg-coral-600' : ''}`}>
                {test.isPriority ? 'Prepare Now' : 'View Details'}
              </Button>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-4 hover:text-indigo">
          Schedule New Test
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingTests;
