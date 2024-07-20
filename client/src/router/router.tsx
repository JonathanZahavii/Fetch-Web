import { Suspense } from "react"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { getPagesRoutes } from "@/router/router.const"
import { CircularProgress } from "@mui/material"
import { AppLogo } from "@/assets"
import Navbar from "@/components/Navbar"
import { AuthProvider } from "@/contexts/AuthContext"

function Router() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ErrorBoundary FallbackComponent={() => <img src={AppLogo} />}>
          <AuthProvider>
            <Navbar />
            <Outlet />
          </AuthProvider>
        </ErrorBoundary>
      ),
      children: getPagesRoutes(),
    },
  ])

  return (
    <Suspense fallback={<CircularProgress />}>
      <RouterProvider router={routes} />
    </Suspense>
  )
}

export default Router
