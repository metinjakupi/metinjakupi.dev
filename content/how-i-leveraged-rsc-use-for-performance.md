---
title: "How I Leveraged React Server Components and the `use` Hook to Transform App Performance"
date: "2025-05-21"
description: "A journey into the world of React Server Components and the `use` hook"
---

## Introduction

I want to share my journey with React Server Components (RSC) and how adopting the `use` hook for passing promises to Client Components dramatically improved my application's performance.

---

## My Approach Before: Awaiting Data in Server Components

When I first started working with Next.js and React Server Components, I was immediately impressed by the ability to directly fetch data within a server component. My initial approach looked something like this:

```tsx
// app/products/page.tsx (Server Component)
import ProductList from '@/components/ProductList';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stockQuantity: number;
}

export default async function ProductsPage() {
  // Fetch data directly in the server component
  const response = await fetch('https://api.mystore.com/products');
  const products: Product[] = await response.json();
  
  return (
    <div className="products-container">
      <h1>Our Products</h1>
      <ProductList products={products} />
    </div>
  );
}
```

This approach already had significant advantages over client-side data fetching. The data was fetched on the server, and the page was rendered with the data already populated. This improved initial load times and SEO.

But as my application grew more complex, I started facing some challenges:

- **Waterfall queries:** When components needed multiple data sources, I had sequential awaits
- **Blocking rendering:** Server components would block rendering until all awaits resolved
- **All-or-nothing loading:** The entire component would wait for all data to be ready

---

## The Game-Changer: Passing Promises to Client Components with `use`

Then I discovered a pattern that completely changed how I approach data fetching: passing promises from Server Components to Client Components and resolving them with the `use` hook.

Here's how this transformed my code:

```tsx
// app/products/page.tsx (Server Component)
import { Suspense } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { FeaturedProduct } from '@/components/FeaturedProduct';
import { CategoryNav } from '@/components/CategoryNav';

import type { Product, Category } from '@/types';

export default function ProductsPage() {
  // Create promises for all data needs without awaiting them
  const productsPromise: Promise<Product[]> = fetch('https://api.mystore.com/products')
    .then(res => res.json());
    
  const categoriesPromise: Promise<Category[]> = fetch('https://api.mystore.com/categories')
    .then(res => res.json());
    
  const featuredPromise: Promise<Product> = fetch('https://api.mystore.com/products/featured')
    .then(res => res.json());
  
  return (
    <div className="products-page">
      <h1>Our Products</h1>
      
      <Suspense fallback={<div className="category-skeleton" />}>
        <CategoryNav categoriesPromise={categoriesPromise} />
      </Suspense>
      
      <div className="products-layout">
        <Suspense fallback={<div className="featured-skeleton" />}>
          <FeaturedProduct productPromise={featuredPromise} />
        </Suspense>
        
        <Suspense fallback={<div className="products-grid-skeleton" />}>
          <ProductGrid productsPromise={productsPromise} />
        </Suspense>
      </div>
    </div>
  );
}
```

Then in my client components, I use the `use` hook to resolve the promises:

```tsx
// components/ProductGrid.tsx (Client Component)
'use client'

import { use } from 'react';
import type { Product } from '@/types';

interface ProductGridProps {
  productsPromise: Promise<Product[]>;
}

export function ProductGrid({ productsPromise }: ProductGridProps) {
  const products = use(productsPromise);
  
  return (
    <div className="products-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
```

---

## The Performance Transformation

The performance improvements from this approach were significant:

1. **Parallel Data Fetching Without Blocking**
   - By creating promises in the server component without awaiting them, all database queries started in parallel. This eliminated the query waterfall problem completely.
2. **Progressive Loading with Suspense**
   - Wrapping client components with Suspense boundaries allowed different parts of the page to load as their data became available. The page felt much more responsive since users could see and interact with components as soon as their data was ready.
3. **Better User Experience**
   - The progressive loading pattern significantly improved perceived performance. Instead of users staring at a blank page or generic loading spinner, they could see the page structure and interact with parts of it as they became available.
4. **Simplified Error Handling**
   - With this pattern, I can handle errors more granularly. If one data fetch fails, it only affects the component using that data, not the entire page.

---

### Visualizing Waterfall vs Parallel Data Fetching

**Waterfall (Sequential) Data Fetching:**

```
Server Component
    |
    |-- fetch A (waits for A to finish)
    |      |
    |      v
    |-- fetch B (waits for B to finish)
    |      |
    |      v
    |-- fetch C (waits for C to finish)
    |      |
    |      v
  Render
```

- Each fetch starts only after the previous one finishes.
- Total time = A + B + C

**Parallel Data Fetching (with Promises and Suspense):**

```
Server Component
    |
    |-- fetch A (start)
    |-- fetch B (start)
    |-- fetch C (start)
    |      |
    |      v
  Pass Promises to Client Components
    |
    |-- <Suspense> for A
    |-- <Suspense> for B
    |-- <Suspense> for C
    |
  Render as soon as each is ready
```

- All fetches start at the same time.
- Each section of the UI can render as soon as its data is ready.
- Total time = max(A, B, C)

**Visual Comparison**

Waterfall:
```
[====A====][====B====][====C====][Render]
```

Parallel:
```
[====A====]
[====B====]
[====C====]
     |
   [Render]
```
- In parallel, rendering can happen as soon as the slowest fetch finishes.

---

## A Real-World Example: Product Detail Page

Let me share a concrete example from our e-commerce application's product detail page. This page has multiple data requirements:

- Product details
- Product reviews
- Related products
- Inventory information
- User's recently viewed items

Previously, all this data had to be fetched sequentially or in batches before rendering anything. With the new approach:

```tsx
// app/products/[id]/page.tsx
import { Suspense } from 'react';
import { ProductInfo } from './ProductInfo';
import { ProductReviews } from './ProductReviews';
import { RelatedProducts } from './RelatedProducts';
import { RecentlyViewed } from './RecentlyViewed';

import type { Product, Review, Inventory } from '@/types';

// Correctly type params as a Promise
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await the params Promise to get the id
  const { id } = await params;
  
  // Start all data fetches in parallel
  const productPromise: Promise<Product> = fetch(`https://api.mystore.com/products/${id}`)
    .then(res => res.json());
  
  const reviewsPromise: Promise<Review[]> = fetch(`https://api.mystore.com/products/${id}/reviews`)
    .then(res => res.json());
  
  const relatedPromise: Promise<Product[]> = fetch(`https://api.mystore.com/products/${id}/related`)
    .then(res => res.json());
  
  const inventoryPromise: Promise<Inventory> = fetch(`https://api.mystore.com/inventory/${id}`)
    .then(res => res.json());
  
  return (
    <div className="product-page">
      <Suspense fallback={<div className="product-info-skeleton" />}>
        <ProductInfo 
          productPromise={productPromise} 
          inventoryPromise={inventoryPromise}
        />
      </Suspense>
      
      <div className="product-page-layout">
        <div className="main-column">
          <Suspense fallback={<div className="reviews-skeleton" />}>
            <ProductReviews reviewsPromise={reviewsPromise} />
          </Suspense>
        </div>
        
        <div className="sidebar">
          <Suspense fallback={<div className="related-skeleton" />}>
            <RelatedProducts relatedPromise={relatedPromise} />
          </Suspense>
          
          <Suspense fallback={<div className="recently-viewed-skeleton" />}>
            <RecentlyViewed />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
```

---

## Tips From My Experience

After implementing this pattern across multiple projects, here are some practical tips I've learned:

### 1. Handle Loading States with Appropriate Skeletons

Create skeleton components that match the structure of your loaded content to minimize layout shifts:

```tsx
// ProductInfoSkeleton.tsx
export function ProductInfoSkeleton() {
  return (
    <div className="product-info-skeleton">
      <div className="image-skeleton skeleton-animation"></div>
      <div className="title-skeleton skeleton-animation"></div>
      <div className="price-skeleton skeleton-animation"></div>
      <div className="description-skeleton skeleton-animation"></div>
    </div>
  );
}
```

### 2. Implement Error Handling at Both Levels

Handle errors both at the server component level and the client component level:

**Server-side error handling with fallback data:**

```ts
const productsPromise: Promise<Product[]> = fetch('https://api.mystore.com/products')
  .then(res => res.json())
  .catch(error => {
    console.error('Failed to fetch products:', error);
    return []; // Return empty array as fallback
  });
```

**Client-side error handling:**

```tsx
'use client'
import { use } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ProductGrid({ productsPromise }) {
  return (
    <ErrorBoundary fallback={<p>Failed to load products</p>}>
      <ProductDisplay productsPromise={productsPromise} />
    </ErrorBoundary>
  );
}

function ProductDisplay({ productsPromise }) {
  const products = use(productsPromise);
  // Render products...
}
```

### 3. Consider Caching Strategies

For data that doesn't change frequently, consider implementing caching strategies at the server level to further improve performance.

---

## Conclusion: The Real Benefits of this Pattern

After thoroughly testing this pattern across multiple projects, I want to clarify what benefits are directly attributable to the pattern of passing promises from Server Components to Client Components with the `use` hook:

- **Parallel Data Fetching Without Blocking Server Components:** This is the most significant benefit. By creating promises in Server Components without awaiting them, and passing them to Client Components, the Server Component can render immediately without being blocked by data fetching. According to the React documentation, "Using await in a Server Component will block its rendering until the await statement is finished. Passing a Promise from a Server Component to a Client Component prevents the Promise from blocking the rendering of the Server Component."
- **Progressive Loading with Suspense:** Suspense boundaries allow different parts of the UI to load as their data becomes available. This creates a more responsive user experience.
- **More Granular Loading UI:** Instead of having a single loading state for the entire page, each section can have its own loading state wrapped in Suspense.
- **Independent Error Handling:** If one data fetch fails, it only affects the component using that data, not the entire page.



