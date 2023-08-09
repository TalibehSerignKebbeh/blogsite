import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import './index.css'
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
import UploadImage from './components/ImageUpload/UploadImage';
import EditBlog from './components/Blog/Edit/EditBlog';
import UserPage from './Pages/UserPage'
import AdminBlogs from './Pages/AdminBlogs';
import UseAuth from './hooks/useAuth';
import { jwttoken } from './hooks/useAuth';
import TagsBlogs from './Pages/TagsBlogs';
import './utils/global.styles.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index:true,
        loader: async () => {
          const res = await AxiosInstance.get(`/blogs/infinite?page=${Number(1)}&size=${Number(6)}&offset=${Number(0)}`)
          const responseData = res?.data
          return responseData;
        },
        element: <Blogs  />,
        errorElement: <ErrorPage />
      },
      {
        path:`/dash`,
        element: <RequiredAuth roles={['editor', 'admin']} />,
        children: [
          {
            index: true,
            // loader: async () => {
            //   const res = await AxiosInstance.get(`/blogs/stats`, config)
            //   const responseData = res?.data
            //   return responseData;
            // },
            element: <Dashboard />,
        errorElement: <ErrorPage />

          },
           {
             path: "/dash/blogs",
              loader: async () => {
          const res = await AxiosInstance.get(`/blogs?page=${Number(0)}&size=${Number(5)}`)
          const responseData = res?.data
          return responseData;
        },
             element: <AdminBlogs />,
        errorElement: <ErrorPage />
            
          },
          {
            path: "/dash/blogs/newblog",
            element: <UploadBlog />,
        errorElement: <ErrorPage />

          },
          {
            path: "/dash/users",
            element: <UserPage />,
        errorElement: <ErrorPage />

          },
          {
            path: "/dash/blogs/:blogId/edit",
            element: <EditBlog />,
            loader: async ({ params }) => {
          const res = await AxiosInstance.get(`/blogs/${params?.blogId}`)
          // console.log(res);
         return res?.data;
        },
          },
           {
            path: "/dash/blogs/view/:title",
            element: <ViewBlog />,
        loader: async ({ params }) => {
          const res = await AxiosInstance.get(`${apiUrl}/blogs/single?title=${params?.title}`)
          // console.log(res);
          const blog = res?.data?.blog;
          return blog;
        },
          },
        ],
        errorElement: <AuthErrorPage />,
      },

      {
        path: '/blogs/:title',
        element: <ViewBlog />,
        loader: async ({ params }) => {
          const res = await AxiosInstance.get(`${apiUrl}/blogs/single?title=${params?.title}`,
          {headers:{Authorization: `Bearer ${jwttoken}`}})
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
