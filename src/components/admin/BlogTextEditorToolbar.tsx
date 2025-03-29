
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, Link, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Heading1, Heading2, Heading3, Quote } from 'lucide-react';

interface BlogTextEditorToolbarProps {
  onFormatText: (formatType: string, formatValue?: string) => void;
}

const BlogTextEditorToolbar: React.FC<BlogTextEditorToolbarProps> = ({ onFormatText }) => {
  const handleInsertLink = () => {
    const url = prompt('Enter the URL:');
    const text = prompt('Enter the link text:');
    
    if (url && text) {
      onFormatText('link', `[${text}](${url})`);
    }
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-md mb-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('bold')}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('italic')}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('underline')}
        title="Underline"
      >
        <Underline className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleInsertLink}
        title="Insert Link"
      >
        <Link className="h-4 w-4" />
      </Button>
      
      <span className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></span>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('heading', '# ')}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('heading', '## ')}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('heading', '### ')}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      
      <span className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></span>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('list', '- ')}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('list', '1. ')}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('quote', '> ')}
        title="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </Button>
      
      <span className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></span>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('align', 'left')}
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('align', 'center')}
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onFormatText('align', 'right')}
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default BlogTextEditorToolbar;
