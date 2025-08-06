import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import TaskListPage from './pages/TaskListPage'
import ShowTask from './pages/ShowTask'

// Define routes with future flags enabled
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'task-list', element: <TaskListPage /> },
        { path: 'show-task/:taskid', element: <ShowTask /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
