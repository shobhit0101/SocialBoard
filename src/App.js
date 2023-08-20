// App.js
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import BoardProvider from "./Context/BoardProvider";
import PostProvider from "./Context/PostProvider";


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/board/:id" element={<Posts />} />
      </Route>
    ));
  return (

    <BoardProvider>
      <PostProvider>
        <RouterProvider router={router} />
      </PostProvider>
    </BoardProvider>

  );
}

export default App;
