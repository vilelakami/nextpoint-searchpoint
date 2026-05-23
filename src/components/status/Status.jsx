import React from 'react';

import { status } from '../../utils/dados';

export default function Status() {
  return (
    <div className="flex items-center gap-2 md:gap-3 lg:gap-4 flex-wrap md:flex-nowrap">
      {status.map((status) => (
        <button
          key={status.value}
          type="button"
          className="bg-gray-200 hover:bg-indigo-700 text-gray-400 hover:text-white text-xs md:text-sm font-normal py-1 px-2 md:px-3 rounded-full transition-colors whitespace-nowrap"
        >
          {' '}
          {status.label}{' '}
        </button>
      ))}
    </div>
  );
}
