import { create, useStore, UseBoundStore } from 'zustand'
import { persist, createJSONStorage, } from 'zustand/middleware'
import jwtDecode from 'jwt-decode'

interface TokenType {
	token: string,
	setToken: (token: string) => void,
	clearToken: () => void,
}

type decodedTokenSchema = {
	username: string,
	role: string,
	id: string,
	name: string,
}

interface appStore {
	token: string,
	blogs: [],
	users: []
}

type AuthStoreType = {
	accessToken: string | undefined;
	accessTokenData: decodedTokenSchema | undefined;
	// refreshToken: string | undefined;

	actions: {
		setAccessToken: (accessToken: string | undefined) => void;
		// setRefreshToken: (refreshToken: string | undefined) => void;
		// set tokens on the app start
		init: () => void;
		clearTokens: () => void;
		setAuthData:(token: string | undefined)=>void
	}
}



const authStore = create<AuthStoreType>()(
	persist((set, get) =>
	({
	accessToken: undefined,
	accessTokenData: undefined,

	actions: {
		setAccessToken: (accessToken: string | undefined) => {
			
			let accessTokenData = undefined
			if (accessToken) {
				const decoded: Record<string, any> = jwtDecode(accessToken)
				accessTokenData = decoded?.AuthData
			}
			set({
				accessToken,
				accessTokenData,
			})
		},

		init: () => {
		},
		clearTokens: () => set({
			accessToken: undefined,
			accessTokenData: undefined,
		}),
		setAuthData: function (token: string | undefined): void {
			// throw new Error('Function not implemented.')
			let accessTokenData = undefined
			if (token) {
				const decoded: Record<string, any> = jwtDecode(token)
				accessTokenData = decoded?.AuthData
			}
			set({
				accessTokenData,
			})
			
		}
	}

}),
	{
		name: 'authentication',
		partialize: (state) => ({
			accessToken: state.accessToken
		}),
	}
),)

export type ExtractState<S> = S extends {
	getState: () => infer T;
}
	? T
	: never;

type Params<U> = Parameters<typeof useStore<typeof authStore, U>>;


// selectors
const accessTokenSelector = (state: ExtractState<typeof authStore>) => state?.accessToken;
const accessTokenDataSelector = (state: ExtractState<typeof authStore>) => state?.accessTokenData;
const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions;


// actions
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getAuthData =()=> accessTokenDataSelector(authStore.getState())
// export const storeAccessToken =(token: string)=> actionsSelector(authStore.setState())
export const getActions = () => actionsSelector(authStore.getState());


// Hooks
export const useAccessToken = () => authStore(accessTokenSelector);
export const useActions = () => authStore(actionsSelector);
