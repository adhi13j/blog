import React, { useReducer, useContext } from "react";

export default (reducer, actions, initialState, ExtraContext = null) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Get extra context if provided (e.g., SettingsContext)
    const extra = ExtraContext ? useContext(ExtraContext) : {};

    const boundActions = {};
    for (let key in actions) {
      // Pass dispatch and extra context to actions
      boundActions[key] = actions[key](dispatch, extra);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};