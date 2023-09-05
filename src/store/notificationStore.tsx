import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ExtractState } from './store'



type NotificationType= Record<string, any>

type NotificationStoreTypes = {
	notifications: NotificationType[],
	actions: {
		StoreNotifications: (notifactions: NotificationType[]) => void;
		AddNotifications: (notifaction: NotificationType) => void;
		ClearNotifications: () => void;
	}
}

const notificationsStore = create<NotificationStoreTypes>()(
	
		(set, get) =>
	({
	notifications:[],

	actions: {
		StoreNotifications: (notificationsData) => {
			if (notificationsData?.length) {
				
			set({
				notifications: [...notificationsData]
			})
			}
				
		},
		AddNotifications: (notification) => {
			set(state => ({
				...state,
				notifications: [...state.notifications, notification]
			}))
			
		},
		ClearNotifications:  ()=>{
			set(state => ({
				...state,
				notifications: []
			}))
		}
	}

}),
	)


const notificationsSelector = (state: ExtractState<typeof notificationsStore>) => state.notifications;
const notificationsActionsSelector = (state: ExtractState<typeof notificationsStore>) => state.actions;

export const getNotifications = () => notificationsSelector(notificationsStore.getState())
export const notificationActions = () => notificationsActionsSelector(notificationsStore.getState())

