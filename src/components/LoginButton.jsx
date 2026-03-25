import { useState } from 'react';
import './LoginButton.css';

const PERMISSIONS = [
  'pages_show_list',
  'pages_read_engagement',
  'read_insights',
].join(',');

function LoginButton({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    const FB = window.FB;
    if (!FB) {
      setError('Facebook SDK not loaded. Please refresh.');
      return;
    }

    setLoading(true);
    setError(null);

    FB.login(
      (response) => {
        setLoading(false);
        if (response.authResponse) {
          onLogin(response.authResponse.accessToken);
        } else {
          setError('Login cancelled or failed.');
        }
      },
      { scope: PERMISSIONS }
    );
  };

  return (
    <div className="login-container">
      <button
        className="login-btn"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Connecting...' : '🔗 Login with Facebook'}
      </button>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
}

export default LoginButton;
