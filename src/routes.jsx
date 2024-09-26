import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import PrivateRoute from './PrivateRoute';
import { BASE_URL_DASHBOARD, BASE_URL_LOGIN } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              route.private ? (
                <PrivateRoute>
                  <Guard>
                    <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
                  </Guard>
                </PrivateRoute>
              ) : (
                <Guard>
                  <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
                </Guard>
              )
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard')),
        private: true
      },
      {
        exact: 'true',
        path: '/basic/button',
        element: lazy(() => import('./views/ui-elements/basic/BasicButton')),
        private: true
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges')),
        private: true
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb-paging',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb')),
        private: true
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse')),
        private: true
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills')),
        private: true
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography')),
        private: true
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements')),
        private: true
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable')),
        private: true
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart')),
        private: true
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps')),
        private: true
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage')),
        private: true
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL_DASHBOARD} />
      }
    ]
  }
];

export default routes;
