import React from 'react';

export default function SearchResult({ data, setUserInput }) {
  return (
    <div
      className="SearchResult"
      onClick={() => {
        setUserInput(data.uid);
      }}
    >
      <span>{data.uid}</span>
    </div>
  );
}
