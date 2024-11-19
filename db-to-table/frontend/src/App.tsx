import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import { TableIndexPage } from "./views/table-index";
import { ErrorBoundary } from "./views/error-boundary";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TableIndexPage />,
  },
  {
    path: "/table/:table_name/page/:page_number",
    element: <TableIndexPage />,
  },
]);

function App() {
  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
      <Toaster />
    </>
  );
}

export default App;
