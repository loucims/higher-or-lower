import React, { createContext, useState, useContext } from 'react';

const TabBarContext = createContext();

export const useTabBarState = () => useContext(TabBarContext);

const TabBarStateProvider = ({ children }) => {
  const [hideTabBar, setHideTabBar] = useState(false);

  return (
    <TabBarContext.Provider value={{ hideTabBar, setHideTabBar }}>
      {children}
    </TabBarContext.Provider>
  );
};

export default TabBarStateProvider;