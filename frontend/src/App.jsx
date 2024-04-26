import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ModalProvider, Modal } from "./context/Modal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import ProductPage from "./components/Product/ProductPage";
import CreateInventoryForm from "./components/InventoryForm/CreateInventoryForm";
import EditInventoryForm from "./components/InventoryForm/EditInventoryForm";
import ReviewPage from "./components/ReviewPage/ReviewPage";
import Order from "./components/Order/Order";
import Checkout from "./components/CheckoutPage/Checkout";
import ContactUs from "./components/ContactUs/ContactUs";
import AboutUs from "./components/AboutUs/AboutUs";

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
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/orders",
        element: <Order />
      },
      {
        path: "/products",
        element: <ProductPage />
      },
      {
        path: "/products/new",
        element: <CreateInventoryForm />
      },
      {
        path: "/products/:id/edit",
        element: <EditInventoryForm />
      },
      {
        path: "/reviews",
        element: <ReviewPage />
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
