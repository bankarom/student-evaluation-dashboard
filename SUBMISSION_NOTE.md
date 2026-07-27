# Bodhrik Task Submission Note

**Candidate:** Om Bankar
**Role:** Frontend Engineer

---

### State-Management and Data-Fetching Approach

For this dashboard, I chose to handle state management using built-in React hooks (`useState`, `useMemo`, `useContext`) rather than introducing heavy external libraries like Redux or Zustand. The application state is inherently simple—primarily consisting of session lists, authentication tokens, and UI toggles (e.g., active filters, modals). Using `useContext` for the authentication layer allowed me to efficiently wrap the application in a `ProtectedRoute` without passing props deeply. 

For data fetching, I simulated a network request via an asynchronous mock API (`getSessions` in `src/lib/api.ts`). In a production scenario, I would migrate this to React Query (or SWR) combined with Next.js Server Components. However, for a mock JSON API without complex invalidation requirements, simply utilizing `useEffect` alongside `useState` to track `isLoading` and `error` states was the most pragmatic and lightweight approach. I utilized `useMemo` extensively on the frontend to compute aggregated metrics (like average engagement and clarity) and to filter the dataset in real-time, ensuring the UI remained perfectly responsive without unnecessary re-renders.

### Compromises and Time-Box Simplifications

Due to the time constraints, I made a few deliberate simplifications. First, the authentication system is entirely mocked using `sessionStorage`. While this successfully demonstrates route guarding and state persistence per tab session, a real application would require JWT validation and secure HttpOnly cookies. 

Second, the data filtering (searching by name and date) is performed entirely on the client side. Since our mock dataset only consists of 20 items, client-side filtering via `useMemo` is incredibly fast. I opted not to implement server-side pagination or debounced API searches, as the overhead of writing a mock query-param router outweighed the benefits for a small static dataset. 

Finally, while the application is fully responsive, I simplified the mobile table view by allowing horizontal scrolling on the data grid rather than collapsing rows into a complex card-based mobile layout. This ensured the core data remained accessible without over-engineering the CSS within the time limit.

### Scaling to 10,000 Sessions

If this dashboard needed to handle 10,000 sessions, the current client-side architecture would need to evolve significantly to maintain performance:

1. **Server-Side Pagination & Filtering:** Passing 10,000 records to the client at once would heavily bloat the initial payload. I would refactor the API to support offset/limit pagination and move the search and date filters to the backend (or Next.js Server Actions).
2. **Data-Fetching Libraries:** I would implement **React Query**. This would provide automatic caching, background refetching, and stale-while-revalidate strategies, making the pagination feel seamless to the user.
3. **Virtualized Lists:** If the users needed to scroll through thousands of rows in a single view, I would implement windowing (e.g., `@tanstack/react-virtual`) for the `SessionTable`. This ensures the browser only renders the rows currently visible on the screen, preventing DOM bloat and maintaining 60fps scrolling.
4. **Data Aggregation:** The "Quick Stats" and "Summary Cards" currently iterate over the entire array to calculate averages. For 10,000 records, these aggregations must be pre-computed by the database (or backend service) and returned as a separate metadata object to prevent the client's main thread from blocking during calculations.
