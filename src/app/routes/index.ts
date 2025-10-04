import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { UserRoutes } from "../modules/user/user.route"
import DriverRoutes from "../modules/driver/driver.routes"
import RideRoutes from "../modules/ride/ride.route"
import AdminRoutes from "../modules/admin/admin.route"

export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
            path: '/drivers',
            route: DriverRoutes
      },
      {
            path: '/admin',
            route: AdminRoutes
      },
      {
            path: '/rides',
            route: RideRoutes
      },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})