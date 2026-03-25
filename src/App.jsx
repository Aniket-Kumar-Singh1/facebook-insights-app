import { useState, useEffect, useCallback } from 'react';
import { initFacebookSDK } from './services/facebook';
import { getUserProfile, getUserPages } from './services/api';
import LoginButton from './components/LoginButton';
import UserProfile from './components/UserProfile';
import PageSelector from './components/PageSelector';
import InsightsPanel from './components/InsightsPanel';
import DateFilter from './components/DateFilter';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import useInsights from './hooks/useInsights';
import './App.css';

function App() {
  const [sdkReady, setSdkReady] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(null);
  const [loadingPages, setLoadingPages] = useState(false);
  const [pageError, setPageError] = useState(null);

  const { insights, loading: insightsLoading, error: insightsError, fetchInsights } = useInsights();

  useEffect(() => {
    initFacebookSDK().then(() => setSdkReady(true));
  }, []);

  const handleLogin = useCallback(async (token) => {
    setAccessToken(token);

    try {
      const profile = await getUserProfile(token);
      setUser(profile);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }

    try {
      setLoadingPages(true);
      const response = await getUserPages(token);
      setPages(response.data || []);
    } catch (err) {
      setPageError(err.message || 'Failed to fetch pages');
    } finally {
      setLoadingPages(false);
    }
  }, []);

  const handlePageSelect = (page) => {
    setActivePage(page);
    fetchInsights(page.id, page.access_token);
  };

  const handleDateApply = ({ since, until }) => {
    if (!activePage) return;
    fetchInsights(activePage.id, activePage.access_token, { since, until });
  };

  const handleLogout = () => {
    setAccessToken(null);
    setUser(null);
    setPages([]);
    setActivePage(null);
  };

  if (!sdkReady) {
    return (
      <div className="app">
        <Loader text="Loading Facebook SDK..." />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <h1>📊 Facebook Page Insights</h1>
          {accessToken && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
        <p className="header-sub">Connect your Facebook account to view page analytics</p>
      </header>

      <main className="app-main">
        {!accessToken ? (
          <LoginButton onLogin={handleLogin} />
        ) : (
          <>
            <UserProfile user={user} />

            {loadingPages && <Loader text="Fetching your pages..." />}
            {pageError && (
              <ErrorMessage
                message={pageError}
                onRetry={() => handleLogin(accessToken)}
              />
            )}
            {!loadingPages && !pageError && (
              <PageSelector pages={pages} onSelect={handlePageSelect} />
            )}

            {activePage && (
              <>
                <DateFilter onApply={handleDateApply} loading={insightsLoading} />

                {insightsLoading && <Loader text="Fetching insights..." />}
                {insightsError && (
                  <ErrorMessage
                    message={insightsError}
                    onRetry={() => fetchInsights(activePage.id, activePage.access_token)}
                  />
                )}
                {!insightsLoading && !insightsError && insights && (
                  <InsightsPanel insights={insights} pageName={activePage.name} />
                )}
              </>
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React & Facebook Graph API</p>
      </footer>
    </div>
  );
}

export default App;
