import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const CreatePaymentPage = lazy(() => import('../pages/CreatePaymentPage'));
const PaymentListPage = lazy(() => import('../pages/PaymentListPage'));
const PaymentDetailPage = lazy(() => import('../pages/PaymentDetailPage'));
const SchedulePage = lazy(() => import('../pages/SchedulePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path="create"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CreatePaymentPage />
            </Suspense>
          }
        />
        <Route
          path="payments"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PaymentListPage />
            </Suspense>
          }
        />
        <Route
          path="payments/:id"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PaymentDetailPage />
            </Suspense>
          }
        />
        <Route
          path="schedule"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <SchedulePage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
