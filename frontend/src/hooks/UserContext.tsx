import React, { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';
import { StoryPreview, User, UserContextType } from './Types';

const UserContext = createContext<UserContextType | undefined>(undefined);
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [storyList, setStoryList] = useState<StoryPreview[] | null>(null)

    const login = (userData: User) => {
        console.log(userData)
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
        
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user');
    };

    const setStories = (storyData: StoryPreview[] ) => {
        console.log(storyData)
        setStoryList(storyData)
        sessionStorage.setItem('stories', JSON.stringify(storyData));


    }

    return (
        <UserContext.Provider value={{ user, login, logout, setStories }}>
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