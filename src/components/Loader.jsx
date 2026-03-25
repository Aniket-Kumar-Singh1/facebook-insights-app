import './Loader.css';

function Loader({ text = 'Loading...' }) {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}

export default Loader;
