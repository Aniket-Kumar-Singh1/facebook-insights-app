import './ErrorMessage.css';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box">
      <p className="error-text">⚠️ {message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
