import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // tasks: tasksReducer,
    // todolists: todolistsReducer,
    // app: appReducer,
    // auth: authSlice,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
