import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.scss";
import { TableIndexPage } from "./views/table-index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TableIndexPage />,
  },
  {
    path: "/:table_name",
    element: <TableIndexPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
