'use client';

import { useState } from 'react';
import commafy from '@/utils/commafy';

export default function InputTest() {
  const [inputValue, setInputValue] = useState<string>('');
  const [formattedValue, setFormattedValue] = useState<string>('');

  const handleSubmit = () => {
    setFormattedValue(commafy(Number(inputValue)));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex mb-4">
        <input
          id="number-input"
          data-testid="number-input"
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          id="submit-button"
          data-testid="submit-button"
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          submit
        </button>
      </div>
      <div className="mt-2">
        <p id="formatted-value" data-testid="formatted-value" className="text-gray-700">
          Value : {formattedValue}
        </p>
      </div>
    </div>
  );
}
