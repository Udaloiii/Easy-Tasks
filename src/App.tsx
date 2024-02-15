import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Loader } from '@/components/loader/Loader'
import { Snackbar } from '@/components/snackbar/Snackbar'
import { Login } from '@/layout/login/Login'
import { Page404 } from '@/layout/pageNotFound/Page404'
import { TodolistsBox } from '@/layout/todolist/TodolistsBox'
import { AppStatusType } from '@/store/reducers/app-reducer'
import { authMeTC } from '@/store/reducers/auth-reducer'
import { AppMainType, useAppDispatch } from '@/store/store'
import { AnimatePresence } from 'framer-motion'

export function App() {
  const isInitialized = useSelector<AppMainType, boolean>(state => state.app.isInitialized)
  const appStatus = useSelector<AppMainType, AppStatusType>(state => state.app.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authMeTC())
  }, [dispatch])

  if (!isInitialized) {
    return (
      <AnimatePresence>
        <Loader />
      </AnimatePresence>
    )
  }

  return (
    <div>
      {<AnimatePresence>{appStatus === 'loading' && <Loader />}</AnimatePresence>}
      <Snackbar />
      <Routes>
        <Route element={<TodolistsBox />} path={'/'} />
        <Route element={<Login />} path={'/login'} />
        <Route element={<Page404 />} path={'/404'} />
        <Route element={<Navigate to={'/404'} />} path={'*'} />
      </Routes>
    </div>
  )
}
