import React, { useState, useEffect } from 'react';

export default function Count() {
  const [count, setCount] = useState(1);

  let countID;

  useEffect(() => {
    countID = setInterval(() => setCount(count + 1), 1000);

    return () => clearInterval(countID);
  });

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => clearInterval(countID)}>Stop</button>
      <button onClick={() => setCount(0)}>Restart</button>
    </div>
  );
}
