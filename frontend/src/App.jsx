import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ModalProvider, Modal } from "./context/Modal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import ProductPage from "./components/Product/ProductPage";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/products",
        element: <ProductPage />
      },
      {
        path: "*",
        element: <h1>Page Not Found</h1>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
