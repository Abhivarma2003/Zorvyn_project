# Finance Dashboard

A responsive React finance dashboard built with Vite, designed to demonstrate clean UI, role-based behavior, transaction management, and data-driven insights.

## Features

- Dashboard overview with summary cards, balance trend, and spending breakdown
- Transactions page with search, filter, sort, and admin-only transaction creation
- Insights page with highest spending category, monthly comparison, and actionable observations
- Bills, Goals, and Recurring pages for a more complete finance experience
- Rich sidebar navigation with icons and role-based UI selector
- Theme toggle with local storage persistence
- Clean responsive layout and polished professional design

## Project Structure

- `src/App.tsx` — app routing and page composition
- `src/context/AppContext.tsx` — central state for transactions, role, theme, filters
- `src/pages/` — page views for Dashboard, Transactions, Insights, and Settings
- `src/components/` — reusable interface components
- `src/data/mockData.ts` — initial transaction dataset

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Notes

- The project uses local storage to persist role, theme, and transaction data.
- The admin role can add transactions, while the viewer role can only browse existing records.
- All interface logic is handled on the frontend with React state and context.
