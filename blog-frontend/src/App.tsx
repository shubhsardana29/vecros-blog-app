import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CreateEditBlogPage from './pages/CreateEditBlogPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { lightTheme, darkTheme } from './utils/theme';
import { RootState } from './redux/store';
import SharedBlogsPage from './pages/SharedBlogsPage';

const App: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/edit/:id" element={<CreateEditBlogPage />} />
          <Route path="/create" element={<CreateEditBlogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/shared-blogs" element={<SharedBlogsPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
