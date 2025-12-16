# replit.md

## Overview

EzStorage is a React-based web application for a storage services company. The platform helps users find storage locations, estimate prices, and manage their storage needs. The application features product listings for storage containers (trolley bags, suitcases, boxes, etc.), customer reviews, and integrates with Supabase for backend services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with Vite as the build tool
- **Language**: Mixed JavaScript/TypeScript (JSX files with TypeScript configuration available)
- **Routing**: React Router DOM v7 for client-side navigation
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer for utility-first styling
- **Icons**: Lucide React for iconography

### Build Configuration
- Vite configured for development with HMR (Hot Module Replacement)
- Server runs on port 5000 with Replit-specific HMR configuration for cloud development
- ESLint with TypeScript and React Hooks plugins for code quality

### Data Management
- Static data files in `/src/data/` for products and reviews (currently hardcoded)
- Product catalog includes storage items with pricing, descriptions, and images
- Customer reviews with ratings stored as JavaScript exports

### Design Decisions
- **Single Page Application**: Client-side routing for smooth user experience
- **Static Data First**: Product and review data stored as static files, with Supabase integration available for dynamic features
- **Utility-First CSS**: Tailwind CSS chosen for rapid UI development and consistent styling

## External Dependencies

### Backend Services
- **Supabase**: Backend-as-a-Service for authentication, database, and potentially file storage
  - Package: `@supabase/supabase-js` v2.57.4
  - Used for user authentication and data persistence

### Third-Party Assets
- **Unsplash**: Product images sourced from Unsplash CDN (external image URLs)

### Development Tools
- Vite for bundling and development server
- TypeScript for type checking (optional, files currently in JSX)
- ESLint with React-specific plugins for linting