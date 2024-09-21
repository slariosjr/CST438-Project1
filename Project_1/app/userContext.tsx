import React, { createContext, useState } from 'react';

type UserContextType = {
  userID: number | null;
  setUser: (id: number | null) => void;
};

// This gave me so much Zucking trouble. 

// https://youtu.be/NRtnUVaRwXM?si=FuySXe4AelUvikYX

// - Alex

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
