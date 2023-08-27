import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdDeveloperMode } from 'react-icons/md';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import Navigation from './components/Navigation';
import AddThreadPage from './pages/AddThreadPage';
import Loading from './components/Loading';

function App() {
  const authUser = useSelector((states) => states.authUser);

  const isPreload = useSelector((states) => states.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <header className="app-header">
          <div className="app-logo">
            <MdDeveloperMode style={{ fontSize: '64px' }} />
            <h1>Forum App</h1>
          </div>
        </header>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-logo">
          <MdDeveloperMode style={{ fontSize: '64px' }} />
          <h1>Forum App</h1>
        </div>
      </header>
      <Loading />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/threads" element={<AddThreadPage />} />
        </Routes>
      </main>
      <footer>
        <Navigation signOut={onSignOut} />
      </footer>
    </div>
  );
}

export default App;
