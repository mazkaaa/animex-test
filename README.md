
# Anime Explorer

Anime Explorer is a web application that allows users to browse a list of anime, search for specific titles, and view detailed information about each anime. The app is built with Next.js (App Router) and utilizes the Jikan API.

## Features

-   **Anime List with Pagination**: Browse anime with client-side pagination.
    
-   **Search Functionality**: Find anime by title.
    
-   **Anime Detail Page**: View detailed information about an anime with server-side rendering.
    
-   **Optimized Performance**: Using Next.js App Router with server components.
    
-   **Clean & Scalable Code**: Follows best practices for maintainability.
    

## Tech Stack

-   **Framework**: Next.js (App Router)
    
-   **Styling**: TailwindCSS
    
-   **Data Fetching**: Fetch API with `cache: "force-cache"`
    
-   **Deployment**: Vercel
    

## Installation

### Prerequisites

-   Node.js (v18+ recommended)
    
-   npm or yarn
    

### Setup

1.  Clone the repository:
    
    ```
    git clone git@github.com:mazkaaa/animex-test.git
    cd animex-test
    ```
    
2.  Install dependencies:
    
    ```
    npm install  # or yarn install
    ```
    
3.  Start the development server:
    
    ```
    npm run dev  # or yarn dev
    ```
    
4.  Open your browser and visit `http://localhost:3000`
    

## Deployment

The application can be deployed on Vercel:

```
vercel
```

Or can be deployed on Docker:

 1. Build your container:
	 ```docker build -t animex-test .```
	 
 2. Run your container:
	 ```docker run -p 3000:3000 animex-test```

## API Reference

The application uses the [Jikan API](https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch) for fetching anime data.

## Folder Structure

```
app/
  ├── page.tsx  # Home Page (Anime List with Pagination)
  ├── layout.tsx  # Root Layout
  ├── anime/[id]/ # Dynamic route folder
      ├── page.tsx  # Anime Detail Page
  ├── globals.css  # Styling Files
components/
  ├── containers/  # Container or Wrapper for UI Component
  ├── hooks/  # Custom react hook
  ├── reusables/  # Reusable UI Components
  ├── services/  # API Endpoint services
  ├── types/  # Types and interfaces
  
```

## Contributing

1.  Fork the project
    
2.  Create a feature branch (`git checkout -b feature-name`)
    
3.  Commit changes (`git commit -m 'Add new feature'`)
    
4.  Push to the branch (`git push origin feature-name`)
    
5.  Open a Pull Request
    

## License

This project is licensed under the MIT License.