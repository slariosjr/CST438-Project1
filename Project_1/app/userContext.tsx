import React, { createContext, useState } from 'react';

type UserContextType = {
  userID: number | null;
  setUser: (id: number | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userID, setUser] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ userID, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
