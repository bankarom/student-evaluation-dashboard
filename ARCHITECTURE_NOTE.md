# Architecture & Scalability Note

## 1. State-Management and Data-Fetching Approach

For this application, I opted for a combination of native React Hooks (`useState`, `useEffect`, `useMemo`) alongside the Next.js App Router for routing and layout management. Because the scope involves a relatively lightweight dataset (20 records) and a single primary view (the dashboard) with detail sub-views, introducing heavy global state management libraries like Redux, Zustand, or even React Query would have added unnecessary complexity and boilerplate. 

React Context was strictly utilized where appropriate—specifically for global Authentication state—ensuring that user session data can be securely and cleanly accessed across the component tree without excessive prop-drilling. For data fetching, I built a modular mock API service (`src/lib/api.ts`) that simulates network latency and potential errors. `useEffect` acts as the data loader on component mount, populating local state. Filtering operations were then delegated to `useMemo` to ensure performant client-side derived state without triggering unnecessary re-renders. This native approach keeps the bundle size small, architecture clean, and is easily understandable for any React engineer.

## 2. Intentional Simplifications (Time Box Considerations)

Given the time constraints, several features were intentionally simplified or mocked:

- **Authentication:** A hardcoded email/password check against `localStorage` is used rather than integrating with a secure identity provider (e.g., Auth0, NextAuth) or dealing with JWT validation.
- **Backend & Database:** Instead of spinning up a full Node/Express API with a PostgreSQL database, the application relies on a static JSON file serving as a "mock database," piped through asynchronous functions to simulate server interactions.
- **Form Validations:** The login form utilizes basic HTML5 validation rather than robust client-side validation libraries like React Hook Form paired with Zod. 
- **Testing:** Comprehensive unit and end-to-end testing (Jest/Cypress) were omitted in favor of manual verification and strict TypeScript typing to ensure basic stability.

## 3. Scaling to 10,000 Sessions

If the application needed to support 10,000 sessions, processing the data entirely on the client side would severely degrade browser performance and user experience. The architecture would need to evolve significantly:

- **Server-Side Pagination & Filtering:** Instead of fetching the entire dataset and filtering via `useMemo` on the client, the API endpoints would accept query parameters (e.g., `?page=1&limit=50&studentName=Alex`). The database (using indexed columns for dates and student names) would perform the filtering and return only the relevant slice of data.
- **Caching & State Libraries:** We would implement a data-fetching library like React Query (TanStack Query) or Apollo Client. This would handle caching, background refetching, and stale-data invalidation automatically, drastically reducing unnecessary network requests.
- **Virtualization:** For long lists or tables where users might want to scroll through hundreds of records smoothly, a library like `react-window` or `react-virtualized` would be implemented to render only the DOM nodes currently visible on the screen.
- **Server Components:** We would migrate data-heavy components to React Server Components (RSC) native to Next.js 14+, allowing data fetching to occur securely on the edge or server without sending the JavaScript logic to the client.
