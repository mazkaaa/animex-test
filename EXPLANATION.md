
# Explanation of Implementation

## **Overview**

This document provides a detailed explanation of how the Anime Explorer web application is implemented using Next.js App Router, focusing on SSR, caching strategies, pagination, and search functionality.

----------

## **1. Data Fetching Strategy**

### **Client-Side Fetching for Anime List & Pagination**

-   The application fetches the anime list on the client side using React's `useEffect` and `useState`.
    
-   Pagination is handled entirely on the client side using state management without modifying the URL.
    
-   This approach allows for a faster user experience with smooth page transitions.
    

#### **Anime Content Section Component:**  `src/components/containers/anime-content-section.tsx`

```typescript
const [isLoading, setIsLoading] = useState(false);
const [response, setResponse] = useState<IResponses<IAnimeResponse> | undefined>(undefined);
const [search, setSearch] = useState<string>("");
const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
const [pagination, setPagination] = useState({ page: 1, limit: 10 });

const fetchData = useCallback(async () => {
  const { getAnimeList } = AnimeService();
  setIsLoading(true);
  try {
    const response = await getAnimeList({
      limit: pagination.limit,
      page: pagination.page,
      q: search,
    });
    setResponse(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setIsLoading(false);
  }
}, [pagination.limit, pagination.page, search]);

useEffect(() => {
  fetchData();
}, [page]);
```

----------

## **2. Pagination Implementation**

### **Approach**

-   The pagination is handled entirely on the client side by managing the current page state and page size state.
-   Clicking on the next or previous page updates the `page` state, triggering a re-fetch of the anime list.
-  Changing the page size updates the `limit` state, triggering a re-fetch of the anime list based on the page size.
    

#### **Pagination Component:**

```typescript
<Pagination
  onPageSizeChange={handlePageSizeChange}
  onPageChange={handlePageChange}
  currentPaginationState={pagination}
  currentPaginationResponse={response.pagination}
/>
```

----------

## **3. Search Functionality**

### **Approach**

The search feature uses React useState to update the query dynamically with debounced or delayed re-fetch.    

#### **Example:**  `src/components/containers/anime-content-section.tsx`

```typescript
const [search, setSearch] = useState<string>("");
const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  setDebouncedSearch(value);
}, []);

const defineClearSearchButton = useMemo(() => {
  if (debouncedSearch) {
    return (
      <Button
        onClick={() => {
          setDebouncedSearch("");
          setSearch("");
        }}
        variant="secondary"
      >
        Clear
      </Button>
    );
  }
  return null;
}, [debouncedSearch]);

useEffect(() => {
  const handler = setTimeout(() => {
    setSearch(debouncedSearch);
  }, 500);
  return () => {
    clearTimeout(handler);
  };
}, [debouncedSearch]);

return (
  <section className="space-y-4">
    <div className="flex flex-row items-center space-x-2">
      <Input
        onChange={handleSearch}
        value={debouncedSearch}
        placeholder="Search"
        type="text"
        className="w-full md:w-72"
      />
      {defineClearSearchButton}
    </div>
    {defineListSection}
  </section>
);
```

-   The input field updates the debounce search state.
-   The useEffect run the delayed code to update the query search parameter.
-   The client component fetches filtered data based on the `q` parameter from search state.
    

----------

## **4. Server-Side Rendering (SSR) for Anime Detail Page**

### **Approach**

-   The detail page is handled using dynamic routes (`app/anime/[id]/page.tsx`).
    
-   The anime ID is extracted from `params`,  and a fetch request is made on the server side to retrieve details.
    

#### **Example:**  `app/anime/[id]/page.tsx`

```typescript
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { getAnimeById } = AnimeService();

  const response = await getAnimeById(id);
  const data = response.data;

  return (
    <main className="container mx-auto space-y-8 px-4 py-12">
      <header className="flex items-center space-x-2 text-lg font-bold">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
        </Link>
        <span>{data.title}</span>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Image
          priority
          src={data.images.jpg.large_image_url}
          alt={data.title}
          className="h-full w-full rounded-lg shadow-lg"
          width={700}
          height={700}
        />
        <p className="text-zinc-500">{data.synopsis}</p>
        <div className="flex justify-center space-x-4 md:flex-col md:justify-start">
          <span>Score: {data.score}</span>
          <span>Episodes: {data.episodes}</span>
          <span>Status: {data.status}</span>
        </div>
      </section>
    </main>
  );
}
```

----------

## **5. Additional Enhancements**

### **Containerization with Docker**

-   The application is containerized using Docker for easy deployment and environment consistency.
    
-   A `Dockerfile` is provided by Next.js template to build and run the application in a containerized environment.
    

#### **Example:**  `Dockerfile`

```
# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

### **Caching Strategies**

-   `force-cache` is used to optimize repeated data requests by storing fetched responses.
    
-   This improves performance and reduces API load.
    

### **Styling with BEM Standardization**

The application follows BEM Standarization (Block, Element, Modifier) methodology to ensure less coupling and better maintainability by creating a reusable and a wrapper of a reusable component.
    

### **Responsive Design**

-   The application is fully responsive and optimized for various screen sizes.
    
-   TailwindCSS media queries, flexible, and grid layouts ensure a seamless experience on mobile and desktop


### **Unit Tests and Pre-Commit Tests**

-   Testing the units or components to ensure their functionality works correctly.
    
-   Run the pre-commit script to run unit tests before the system saving the commit message.

----------

## **Conclusion**

-   **Client-side fetching** is used for the anime list and pagination for a smoother user experience.
    
-   **Pagination** is handled on the client side using state instead of modifying the URL.
    
-   **Search functionality** updates the query dynamically without reloading.
    
-   **SSR with** `**force-cache**` is used for the anime detail page to optimize performance by prioritize the cache first if its available.
    
-   **Dynamic routing** is used for anime details with SSR to fetch the data from API.

-   **Containerization with Docker** ensures portability and easier deployment.
    
-   **Caching strategies** improve performance and reduce API calls.
    
-   **BEM styling standardization** enhances maintainability and reduces coupling.
    
-   **Responsive design** ensures usability across all devices.

-   **Unit Testing** ensures the unit or component functionality is working as intended.

-   **Pre-Commit Test** run the unit tests before saving the commit message in Git.
    

This implementation follows Next.js App Router best practices for an optimized and scalable experience.