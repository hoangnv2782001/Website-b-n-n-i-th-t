import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import LoadingScreen from "../components/ui/LoadingScreen";
import MainLayout from "../pages/auth";

import PrivateRoute from "./PrivateRoute";
import Search from "../pages/search";
import DashboardComponent from "../components/admin/dasboard/index.js";
import PrivateAdminRoute from "./PrivateAdminRoute.js";
import ProtetedAuthRouter from "./ProtetedAuthRouter.js";

/**
 * Dùng trả về một component sử dụng lazy load
 * Nếu component chưa kịp tải nó sẽ hiển thị LoadingScreen
 * @param {*} Component
 * @returns Function component
 */
const Loadable = (Component) => {
  return (props) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

/**
 * Định tuyến đến component trang web
 * @returns {Route}
 */
export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: (
        <ProtetedAuthRouter>
          <MainLayout />
        </ProtetedAuthRouter>
      ),
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
        { path: "new-password", element: <NewPasswordPage /> },
        { path: "verify", element: <VerifyPage /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <PrivateAdminRoute>
          <Dashboard />
        </PrivateAdminRoute>
      ),
      children: [
        { element: <Navigate to={"dashboard"} replace />, index: true },
        { path: "dashboard", element: <DashboardComponent /> },
        {
          path: "category",
          element: <CategoryDashboard />,
          children: [
            { element: <Navigate to={"all"} replace />, index: true },
            { path: "all", element: <Categorys /> },
            { path: "new", element: <NewCategory /> },
            { path: "update/:id", element: <UpdateCategory /> },
          ],
        },
        {
          path: "product",
          element: <ProductDashboard />,
          children: [
            { element: <Navigate to={"all"} replace />, index: true },
            { path: "all", element: <Products /> },
            { path: "new", element: <NewProduct /> },
            { path: "update/:id", element: <UpdateProduct /> },
          ],
        },
        {
          path: "order",
          element: <OrderDashboard />,
          children: [
            { element: <Navigate to={"all"} replace />, index: true },
            { path: "all", element: <Orders /> },
            { path: "detail/:id", element: <OrderDetail /> },
            // { path: "update/:id", element: <UpdateProduct /> },
          ],
        },
        {
          path: "user",
          element: <UserDashboard />,
          // children: [
          //   { element: <Navigate to={"all"} replace />, index: true },
          //   { path: "all", element: <Orders /> },
          //   { path: "detail/:id", element: <OrderDetail /> },
          //   // { path: "update/:id", element: <UpdateProduct /> },
          // ],
        },
        {
          path: "statistic",
          element: <StatisticDashboard />,
          // children: [
          //   { element: <Navigate to={"all"} replace />, index: true },
          //   { path: "all", element: <Orders /> },
          //   { path: "detail/:id", element: <OrderDetail /> },
          //   // { path: "update/:id", element: <UpdateProduct /> },
          // ],
        },
      ],
    },
    {
      path: "/",
      element: <Home />,
      children: [
        { element: <Navigate to={"home"} replace />, index: true },
        { path: "home", element: <HomePage /> },
        { path: "category/:id", element: <Category /> },
        {
          path: "cart",
          element: (
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
          children: [
            { element: <Navigate to={"info"} replace />, index: true },
            { path: "info", element: <ProfileInfo /> },
            { path: "order", element: <OrderInfo /> },
            { path: "order-detail/:id", element: <OrderDetailCustomer /> },
            { path: "change-password", element: <NewPassword /> },
          ],
        },
        {
          path: "checkout",
          element: (
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          ),
        },
        {
          path: "order-successfuly",
          element: (
            <PrivateRoute>
              <CompleteCheckout />
            </PrivateRoute>
          ),
        },
        { path: "product/:id", element: <ProductDetail /> },

        { path: "search", element: <Search /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const Category = Loadable(lazy(() => import("../pages/category")));

const ProfileInfo = Loadable(
  lazy(() => import("../components/ui/profile/ProfileInfo"))
);

const OrderInfo = Loadable(
  lazy(() => import("../components/ui/profile/OrderInfo"))
);

const OrderDetailCustomer = Loadable(
  lazy(() => import("../components/ui/profile/OrderDetail.js"))
);

const Profile = Loadable(lazy(() => import("../pages/profile")));

/**
 * Lazy load Loginpage component
 */
const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));

/**
 * Lazy load RegisterPage component
 */
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));

/**
 * Lazy load Settings component
 */
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);

const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword"))
);

/**
 * Lazy load verify component
 */
const VerifyPage = Loadable(lazy(() => import("../pages/auth/Verify")));

/**
 * Lazy load cart component
 */
const CartPage = Loadable(lazy(() => import("../pages/cart")));

/**
 * Lazy load cart component
 */
const Dashboard = Loadable(lazy(() => import("../pages/admin/dashboard")));

/**
 * Lazy load cart component
 */
const Content = Loadable(lazy(() => import("../components/admin/Content")));

const CategoryDashboard = Loadable(
  lazy(() => import("../pages/admin/category"))
);

const Categorys = Loadable(
  lazy(() => import("../components/admin/category/Categorys"))
);

const NewCategory = Loadable(
  lazy(() => import("../components/admin/category/NewCategory"))
);

const UpdateCategory = Loadable(
  lazy(() => import("../components/admin/category/UpdateCategory"))
);

const ProductDashboard = Loadable(lazy(() => import("../pages/admin/product")));

const OrderDashboard = Loadable(lazy(() => import("../pages/admin/order")));

const UserDashboard = Loadable(lazy(() => import("../pages/admin/user")));

const StatisticDashboard = Loadable(
  lazy(() => import("../pages/admin/statistic"))
);

const Products = Loadable(
  lazy(() => import("../components/admin/product/Products"))
);

const NewProduct = Loadable(
  lazy(() => import("../components/admin/product/NewProduct"))
);

const UpdateProduct = Loadable(
  lazy(() => import("../components/admin/product/UpdateProduct"))
);

const Home = Loadable(lazy(() => import("../pages/Home")));

const HomePage = Loadable(lazy(() => import("../pages/Home/Home")));

const ProductDetail = Loadable(lazy(() => import("../pages/productDetail")));

const Checkout = Loadable(lazy(() => import("../pages/checkout")));

const Orders = Loadable(lazy(() => import("../components/admin/order/Orders")));

const NewPassword = Loadable(
  lazy(() => import("../components/ui/profile/NewPassword.js"))
);

const OrderDetail = Loadable(
  lazy(() => import("../components/admin/order/OrderDetail"))
);

const CompleteCheckout = Loadable(
  lazy(() => import("../pages/checkout/CompleteCheckout.js"))
);
