import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NewProforma from './components/NewProforma';
import ListProformas from './components/ListProformas';
import Settings from './components/Settings';
import ProformaPreview from './components/ProformaPreview';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
            <Route path="new" element={<NewProforma />} />
            <Route path="list" element={<ListProformas />} />
            <Route path="settings" element={<Settings />} />
            <Route path="preview" element={<ProformaPreview />} />
            <Route index element={<Navigate to="/dashboard/new" replace />} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}