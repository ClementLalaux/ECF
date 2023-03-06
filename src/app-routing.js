
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import FormPage from "./components/formImc/FormPage";
import ErrorPage from "./routes/ErrorPage";
import HomePage from "./routes/HomePage";


const authCheck = () => {
    const user = localStorage.getItem('token')
    if (user) {
        return true
    } else {
        return redirect(`/`)
    }
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path:"/",
                element : <HomePage/>
            },
            {
                path:"/formImc",
                element : <FormPage/>,
                loader: () => authCheck()
            }
        ]
    }
])

export default router;