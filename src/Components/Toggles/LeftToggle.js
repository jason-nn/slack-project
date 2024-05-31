import React from 'react';

export default function LeftToggle({
  DisplayLeftPanel,
  DisplayRightPanel,
  setDisplayLeftPanel,
}) {
  return (
    <div
      className={DisplayRightPanel ? 'LeftToggle Hide' : 'LeftToggle'}
      onClick={() => {
        setDisplayLeftPanel(!DisplayLeftPanel);
      }}
    >
      <div className={DisplayLeftPanel ? 'rotate45degrees' : null}></div>
      <div className={DisplayLeftPanel ? 'middle' : null}></div>
      <div className={DisplayLeftPanel ? 'rotate-45degrees' : null}></div>
    </div>
  );
}
