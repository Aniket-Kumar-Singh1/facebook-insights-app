import './InsightsPanel.css';

const METRIC_LABELS = {
  page_views_total: { label: 'Page Views', icon: '👀' },
  page_post_engagements: { label: 'Engagements', icon: '💬' },
  page_follows: { label: 'Followers', icon: '👥' },
  page_actions_post_reactions_total: { label: 'Reactions', icon: '❤️' },
};

function InsightsPanel({ insights, pageName }) {
  if (!insights || insights.length === 0) {
    return <p className="no-insights">No insights data available for this page.</p>;
  }

  return (
    <div className="insights-panel">
      <h2 className="insights-title">Insights for {pageName}</h2>
      <div className="insights-grid">
        {insights.map((metric) => {
          const info = METRIC_LABELS[metric.name] || {
            label: metric.title || metric.name,
            icon: '📊',
          };
          const value = metric.values?.[0]?.value;
          const displayValue = typeof value === 'object'
            ? Object.values(value).reduce((sum, v) => sum + v, 0)
            : value ?? 'N/A';

          return (
            <div className="insight-card" key={metric.id}>
              <span className="insight-icon">{info.icon}</span>
              <h3>{info.label}</h3>
              <p className="insight-value">
                {typeof displayValue === 'number'
                  ? displayValue.toLocaleString()
                  : displayValue}
              </p>
              <span className="insight-desc">{metric.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InsightsPanel;
