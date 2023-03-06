import { Navigate, useRouteError } from "react-router-dom"

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <Navigate to={`/`} />
  )
}

export default ErrorPage