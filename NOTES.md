# NOTES

## What this app does

This is a simple dashboard that lets you login with your Facebook account and view insights (analytics) for the Facebook Pages you manage. You can see things like how many followers your page has, how many impressions and engagements your posts got, and reactions too.

## Features

- Facebook login using OAuth
- Shows your profile (name + picture) after login
- Fetches all the Facebook Pages you manage
- Dropdown to select which page you want to see insights for
- Shows insights in nice cards - followers, impressions, engagements, reactions
- Date range filter so you can pick specific time periods
- Loading states while data is being fetched
- Error handling if something goes wrong (like API fails or no pages found)

## How login works

When you click "Login with Facebook", it opens a Facebook popup that asks you to give permission. We ask for three permissions:
- `pages_show_list` - to see what pages you manage
- `pages_read_engagement` - to read engagement data
- `read_insights` - to read page insights/analytics

After you approve, Facebook gives us an **access token** which is basically a temporary key that lets us talk to Facebook's API on your behalf.

## What is access token & page access token

- **User Access Token**: This is what we get after login. It represents YOU and lets us do things like get your profile and list your pages.
- **Page Access Token**: Each page has its own access token. When we fetch `/me/accounts`, Facebook returns a list of pages with their own tokens. We need the PAGE token specifically to fetch insights for that page - the user token won't work for insights.

## How Facebook Graph API is used

Facebook has this thing called the Graph API. Its basically a way to get data from Facebook using URLs. For example:
- `GET /me` → gives your profile info
- `GET /me/accounts` → gives list of pages you manage
- `GET /{page-id}/insights` → gives analytics for a specific page

We make these requests with the access token so Facebook knows who's asking. All our API calls are in `src/services/api.js`.

## How insights are fetched and displayed

1. User selects a page from the dropdown and clicks "Get Insights"
2. We call the Graph API with the page's access token
3. We ask for these metrics: `page_follows`, `page_impressions`, `page_post_engagements`, `page_actions_post_reactions_total`
4. We set `period=total_over_range` so it gives us total numbers (not daily breakdowns)
5. If user picks a date range, we also send `since` and `until` params
6. The response comes back with each metric's value
7. We display each metric in a card with an icon and the number

## Challenges I faced

- The Facebook SDK loading is async so I had to handle the case where it hasn't loaded yet
- Page tokens vs user tokens was confusing at first - you NEED the page token for insights
- Some metrics return objects instead of numbers (like reactions broken down by type) so I had to sum them up
- Date validation was important - can't have end date before start date
- Had to handle lots of edge cases (no pages, API errors, loading states)

## How to run

1. Clone this repo
2. Run `npm install`
3. Copy `.env.example` to `.env` and put your Facebook App ID there
4. Make sure your Facebook App has the right permissions configured
5. Run `npm run dev`
6. Open `http://localhost:5173` in your browser
7. Click login and connect your Facebook account

**Note**: You need a Facebook App with proper permissions set up in the Facebook Developer Console for this to work. The app also needs to be in development mode or have your account added as a test user.
