'use client';
import React, { ReactNode, createContext, useContext } from 'react';
import { AuthContextData, useAuthContext } from './AuthContext';
import { HomeContextData, useHomeContext } from './HomeContext';
import { ShopContextData, useShopContext } from './ShopContext';

interface AppContextData extends HomeContextData, AuthContextData, ShopContextData {
	isHeaderFixed: boolean;
}

interface AppProviderProps {
	children: ReactNode;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const shopContext = useShopContext();

	const authContext = useAuthContext();
	const homeContext = useHomeContext();

	const contextValue: AppContextData = {
		...homeContext,
		...shopContext,
		...authContext,
	};

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useCafeuContext must be used within an CafeuProvider');
	}
	return context;
};
