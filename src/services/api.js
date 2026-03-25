const GRAPH_API = 'https://graph.facebook.com/v19.0';

export function fetchFromGraph(endpoint, token, params = {}) {
  const url = new URL(`${GRAPH_API}${endpoint}`);
  url.searchParams.set('access_token', token);

  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      url.searchParams.set(key, val);
    }
  });

  return fetch(url.toString())
    .then((res) => {
      if (!res.ok) throw new Error(`Graph API error: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error.message || 'Unknown API error');
      }
      return data;
    });
}

export function getUserProfile(token) {
  return fetchFromGraph('/me', token, { fields: 'id,name,picture' });
}

export function getUserPages(token) {
  return fetchFromGraph('/me/accounts', token, {
    fields: 'id,name,access_token,picture',
  });
}

export function getPageInsights(pageId, pageToken, options = {}) {
  const { since, until } = options;

  const metrics = [
    'page_follows',
    'page_impressions',
    'page_post_engagements',
    'page_actions_post_reactions_total',
  ].join(',');

  const params = {
    metric: metrics,
    period: 'total_over_range',
  };

  if (since) params.since = since;
  if (until) params.until = until;

  return fetchFromGraph(`/${pageId}/insights`, pageToken, params);
}
