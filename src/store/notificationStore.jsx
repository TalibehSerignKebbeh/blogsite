import { create } from 'zustand'
import { persist } from 'zustand/middleware'


const notificationStore = create(
    persist((set, get) =>
    ({
    notifications: [],
    actions: {
        AddNotification: (data) => {
            let newNotifications = get().notifications;
            newNotifications=[...newNotifications, data]
            set((state) => ({
                ...state,
                notifications:newNotifications
            }))
        },
        SetNotifications: (dataArray) => {
            set((state) => ({
                ...state,
                notifications: [...dataArray]
            }))
        },
        ReadNotifications: () => {
            
        }
    }
    }),
        {
            name: 'notifications',
            partialize: (state) => {
            notifications: state?.notifications
        }}
    ))


export const notificationState = notificationStore.getState();
export const notificationsActions = notificationStore.getState()?.actions;
// export const setNoficationsData=(data)=> notificationStore.setState()