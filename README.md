## "Ark"itecture

### Feature-Based Structure

My approach to this trial was to carefully organize code by domain rather than technical type.
This approach improves maintainability and makes the codebase more intuitive to navigate.
Essentially as I was build from scratch, I was able to make this decision.

So heres is a basic birdseye view of the my feature-based structure.

```
src/
├── app/                    # Next.js app router pages
├── features/              # Feature-based modules: This will only contain the features that are relevant to the project.
│   ├── layout/           # Layout components and logic: This will contain the layout components and logic for the project.
│   ├── signals/          # Trading signals feature: This will contain the trading signals feature.
│   └── wallet/           # Wallet integration: This will contain the wallet integration.
├── shared/               # Shared utilities and components: This will contain the shared utilities and components across the project.
└── components/           # UI component library: This will contain the UI component library for the project aka shadcn/ui.
```

So here is a modular flow:

#### 📊 Signals (Cards) (`/features/signals/`)

- Components: Modular signal display components
- Hooks: Custom hooks for data fetching and state
- Utils: Signal processing and filtering utilities

```typescript
// Example of feature organization
/features/signals/
├── components/           # UI Components
│   ├── SignalCard/      # Main signal display
│   └── SignalList/      # Signal list container
├── hooks/               # Feature-specific hooks
│   └── useSignals.ts    # Signal data management
└── utils/               # Utility functions
    └── filterSignals.ts # Signal filtering logic
```

#### Layout (`/features/layout/`)

- Components: Layout structure and navigation
- Hooks: Layout-specific custom hooks
- Constants: Layout configuration

```typescript
/features/layout/
├── components/          # Layout components
│   ├── FilterCard.tsx   # Filter UI component
│   └── Sidebar.tsx     # Sidebar navigation
├── hooks/              # Layout hooks
│   └── useFilterUpdate.ts # Filter state management
└── constants/          # Layout constants
    └── filters.ts      # Filter configurations
```

### State Management

- URL-based state for filters (shareable URLs): This is a key part of implementing proper filtering.
- React Query for server state
- React hooks for local state

## 🎯 Best Practices

1. **Component Organization**

   - One component per file
   - Clear component responsibilities

2. **Hook Usage**

   - Custom hooks for reusable logic
   - Memoization!!!!! for expensive calculations
   - Clear dependency management

## Now your turn

1. **Installation**

   ```bash
   npm install
   ```

2. **Development**

   ```bash
   npm run dev
   ```

3. **Build**
   ```bash
   npm run build
   ```

## PS

There is hidden treasure in the codebase.
