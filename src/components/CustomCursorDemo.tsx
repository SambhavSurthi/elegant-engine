import React from 'react';

const CustomCursorDemo: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Custom Cursor Demo</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Elements (Cursor will double size and show arrow):</h3>
        
        <div className="space-x-4">
          <a href="#" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Regular Link
          </a>
          
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Regular Button
          </button>
          
          <div 
            role="button" 
            tabIndex={0}
            className="inline-block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 cursor-pointer"
          >
            Div with role="button"
          </div>
          
          <input 
            type="submit" 
            value="Submit Input" 
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer"
          />
          
          <div 
            data-cursor="interactive"
            className="inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            Custom Interactive Element
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Ignored Elements (Cursor will not change):</h3>
        
        <div className="space-x-4">
          <div 
            data-cursor="ignore"
            className="inline-block px-4 py-2 bg-gray-500 text-white rounded"
          >
            Ignored Element
          </div>
          
          <span className="px-4 py-2 bg-gray-400 text-white rounded">
            Regular Span (no cursor change)
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Instructions:</h3>
        
        <div className="bg-gray-100 p-4 rounded text-sm space-y-2">
          <p><strong>To make an element interactive:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Add <code>data-cursor="interactive"</code> to any element</li>
            <li>Or use semantic elements: <code>&lt;a&gt;</code>, <code>&lt;button&gt;</code>, <code>[role="button"]</code>, <code>input[type="submit"]</code></li>
          </ul>
          
          <p><strong>To ignore an element:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Add <code>data-cursor="ignore"</code> to prevent cursor changes</li>
          </ul>
          
          <p><strong>Features:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Default: 8px white dot with shadow</li>
            <li>Interactive: 16px with centered MoveUpRight arrow</li>
            <li>Smooth animation with linear interpolation</li>
            <li>Auto-disables on touch devices</li>
            <li>Respects prefers-reduced-motion</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomCursorDemo;
