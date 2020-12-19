import React from 'react';
import '../css/Gadgets.css';
import { Gadgets as GadgetsT } from '../hooks/useGadgets';

interface GadgetsProps {
  gadgets: GadgetsT;
}

const Gadgets = (props: GadgetsProps) => {
  const renderGadgets = () => {
    return Object.entries(props.gadgets).map(([key, value]) => {
      const [state, setState] = value.state;
        return state.enabled ?
          React.createElement(value.node as React.FunctionComponent,
            { settings: state,
              setSettings: setState,
              key: `${key}-GadgetView`} as React.Attributes, null)
        : null;
    })
  }

  return (
    <div className="Gadgets">
      {renderGadgets()}
    </div>
  );
}

export default Gadgets;