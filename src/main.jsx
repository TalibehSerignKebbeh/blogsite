import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './ErrorPage';
import UploadBlog from './components/Blog/UploadBlog';
import { apiUrl, AxiosInstance } from './api';
import CreateAccount from './components/User/CreateAccount';
import Blogs from './Pages/Blogs';
import Login from './components/Auth/Login';
import { AuthProvider } from './context/AuthContext';
import RequiredAuth from './components/Auth/RequiredAuth';
import ViewBlog from './components/Blog/ViewBlog';
import UnAuthorized from './components/Auth/UnAuthorized';
import AuthErrorPage from './components/Error/AuthErrorPage';
import Dashboard from './components/Dashboard/Dashboard';
import EditBlog from './components/Blog/Edit/EditBlog';
import UserPage from './Pages/UserPage'
import AdminBlogs from './Pages/AdminBlogs';
import { jwttoken } from './hooks/useAuth';
import TagsBlogs from './Pages/TagsBlogs';
import './utils/global.styles.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import ProfilePage from './components/User/Profile/ProfilePage';
import MyBlogs from './Pages/MyBlogs';
import InfiniteLoadBlogs from './InfiniteLoadBlogs';


const router = createBrowserRouter([
  {
    path: "/",
    element:<AuthProvider children={<App />}>
        <App />
    </AuthProvider>
        ,
    children: [
      {
        index: true,
        loader: async () => {
          const res = await AxiosInstance.get(`/blogs/infinite?page=${Number(1)}&size=${Number(3)}&offset=${Number(0)}`)
          const responseData = res?.data
          return responseData;
        },
        element: <Blogs />,
        errorElement: <ErrorPage />
      }, {
        path: 'infinite',
        element: <InfiniteLoadBlogs />,
        
      },
      {
        path: `/dash`,
        element: <RequiredAuth roles={['user', 'admin']} />,
        children: [
          {
            index: true,

            element: <Dashboard />,
            errorElement: <ErrorPage />

          },
           {
            path: "/dash/blogs/newblog",
            element: <UploadBlog />,
            errorElement: <ErrorPage />

          },
            {
            path: "/dash/blogs/:blogId/edit",
            element: <EditBlog />,
            loader: async ({ params }) => {
              const res = await AxiosInstance.get(`/blogs/${params?.blogId}`)
              return res?.data;
            },
          },
          {
            path: "/dash/blogs/view/:title",
            element: <ViewBlog />,
            loader: async ({ params }) => {
              const res = await AxiosInstance.get(`${apiUrl}/blogs/single?title=${params?.title}`)

              const blog = res?.data?.blog;
              return blog;
            },
          },
          
          {
            element: <RequiredAuth roles={['admin']} />,
            children: [
              {
                path: "/dash/blogs",
                // loader: async () => {
                //   const res = await AxiosInstance.get(`/blogs?page=${Number(0)}&size=${Number(10)}`)
                //   const responseData = res?.data
                //   return responseData;
                // },
                element: <AdminBlogs />,
                errorElement: <ErrorPage />

              },
              {
            path: "/dash/users",
            element: <UserPage />,
            errorElement: <ErrorPage />

          },

            ],
          },
           {
        element: <RequiredAuth roles={['user']} />,
        children: [
          {
            path: "/dash/blogs/myblogs",
            element: <MyBlogs />,
            errorElement: <ErrorPage />

          },
        ]

      },

         
        ],
        errorElement: <AuthErrorPage />,
      },

      {
        element: <RequiredAuth roles={['user', 'admin']} />,

        children: [
         {

            path: '/profile',
            element: <ProfilePage />,
errorElement: <ErrorPage />,
          },
       ]
     },
      {
        path: '/blogs/:title',
        element: <ViewBlog />,
        loader: async ({ params }) => {
          const res = await AxiosInstance.get(`${apiUrl}/blogs/single?title=${params?.title}`,
            { headers: { Authorization: `Bearer ${jwttoken}` } })
          // console.log(res);
          const blog = res?.data?.blog;
          return blog;
        },
        errorElement: <ErrorPage />

      },
      {
        path: "/register",
        element: <CreateAccount />,
        errorElement: <ErrorPage />
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />
      },
      {
        path: "/unauthorized",
        element: <UnAuthorized />,
        errorElement: <ErrorPage />
      },
      {
        path: '/blogs/tags/:tag',
        element: <TagsBlogs />,
        loader: async ({ params }) => {
          const tag = params?.tag;
          const response = await AxiosInstance.get(`/blogs/tags/${tag}?page={Number(0)}&pageSize={Number(10)}`)
          return response.data;
        },
      }
    ],
    errorElement: <ErrorPage />,
  },

]);

// const rootRouter = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<App />} />
//   )
// )

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider
        client={client}>

        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
