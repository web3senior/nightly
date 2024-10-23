import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.scss'
import './styles/global.scss'

import ErrorPage from './error-page'
import Loading from './routes/components/Loading.jsx'
const Layout = lazy(() => import('./routes/layout.jsx'))
const UserLayout = lazy(() => import('./routes/userLayout.jsx'))
import Tour, { loader as tourLoader } from './routes/tour.jsx'
import Connect, { loader as connectLoader } from './routes/connect.jsx'
import Home, { loader as homeLoader } from './routes/home.jsx'
import Search, { loader as searchLoader } from './routes/search.jsx'
import About from './routes/about.jsx'
import Leaderboard from './routes/leaderboard.jsx'
import Event from './routes/event.jsx'
import Project from './routes/project.jsx'
import ProjectDetail from './routes/project-detail.jsx'
import User from './routes/user.jsx'
import UserDetail from './routes/user-detail.jsx'
import Ecosystem from './routes/ecosystem.jsx'
// import Admin from './routes/admin.jsx'
import Fee from './routes/fee.jsx'
import Owned from './routes/owned.jsx'
import TermsOfService from './routes/terms-of-service.jsx'
import PrivacyPolicy from './routes/privacy-policy.jsx'
import Dashboard from './routes/dashboard.jsx'

const router = createBrowserRouter([
  {
    path: `tour`,
    loader: tourLoader,
    element: <Tour title={`Tour`} />,
  },
  {
    path: `connect`,
    loader: tourLoader,
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <Connect title={`Connect`} />
        </AuthProvider>
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: homeLoader,
        element: <Home title={`Connect, Collaborate, Create`} />,
      },
      {
        path: `search`,
        element: <Search title={`Search`} />,
      },
      {
        path: `event`,
        element: <Event title={`Events`} />,
      },
      {
        path: `project`,
        children: [
          {
            index: true,
            element: <Project title={`Project`} />,
          },
          {
            path: `:id`,
            element: <ProjectDetail />
          }
        ]
      },
      {
        path: `user`,
        children: [
          {
            index: true,
            element: <User title={`Expert`} />,
          },
          {
            path: `:id`,
            element: <UserDetail />
          }
        ]
      },
      {
        path: `about`,
        element: <About title={`About`} />,
      },
      {
        path: `ecosystem`,
        element: <Ecosystem title={`Ecosystem`} />,
      },
    ],
  },
  {
    path: 'user',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <UserLayout />
        </AuthProvider>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard to={`/dashboard`} replace />,
      },
      {
        path: `dashboard`,
        element: <Dashboard title={`Dashboard`} />,
      },
      {
        path: `transfer`,
        element: <Dashboard title={`Transfer`} />,
      },
      {
        path: `owned`,
        element: <Owned title={`Owned`} />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
