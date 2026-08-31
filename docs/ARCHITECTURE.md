# Nasse Architecture

## User flow

```text
Visitor
  -> Services
  -> Quote / Corporate Enquiry / Contact
  -> Django REST API
  -> Database
  -> Admin Dashboard
```

## Frontend routing

```text
src/app/
├── (public)/
│   ├── page.tsx
│   ├── services/page.tsx
│   ├── quote/page.tsx
│   ├── corporate/page.tsx
│   └── contact/page.tsx
├── (auth)/admin/login/page.tsx
└── (admin)/admin/
    ├── layout.tsx
    ├── page.tsx
    ├── quotes/page.tsx
    ├── corporate-enquiries/page.tsx
    └── contact-messages/page.tsx
```

Route groups keep public/auth/admin concerns separated without adding group names to URLs.

## State ownership

### Redux (client/global state)
Use Redux only for long-lived client state:
- authenticated admin metadata
- sidebar/menu state
- UI preferences

### TanStack Query (server/cache state)
Use Query for API data:
- services
- quotes
- corporate enquiries
- contact messages
- dashboard counts

Do not duplicate API collections into Redux.

### Redux Saga
Saga remains available for cross-cutting async workflows. Authentication bootstrap/logout are represented there. Feature CRUD should normally use TanStack Query mutations.

## Backend apps

`cleaning` is the first business-domain app and owns:
- Service
- QuoteRequest
- CorporateEnquiry
- ContactMessage

As the business grows, split domains only when needed (for example `bookings`, `customers`, `content`).

## Future modules, deliberately excluded now

- Payments
- Staff management
- Payroll
- Attendance
- Inventory
- Fleet / route tracking
- Automated pricing
