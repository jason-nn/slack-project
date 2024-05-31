import React from 'react';

export default function RightToggle({
  DisplayLeftPanel,
  DisplayRightPanel,
  setDisplayRightPanel,
}) {
  return (
    <div
      className={DisplayLeftPanel ? 'RightToggle Hide' : 'RightToggle'}
      onClick={() => {
        setDisplayRightPanel(!DisplayRightPanel);
      }}
    >
      <div className={DisplayRightPanel ? 'rotate45degrees' : 'vanish'}></div>
      <div
        className={DisplayRightPanel ? 'rotate45degrees-vanish Dots' : 'Dots'}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={DisplayRightPanel ? 'rotate-45degrees' : 'vanish'}></div>
    </div>
  );
}
