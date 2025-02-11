import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserModel } from "../models/User";

interface UserContextProps {
    user: UserModel | null;
    setUser: (user: UserModel | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserModel | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
