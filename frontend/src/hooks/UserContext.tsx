import React, { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';
import { User, UserContextType } from './Types';

const UserContext = createContext<UserContextType | undefined>(undefined);
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        console.log(userData)
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
        
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};