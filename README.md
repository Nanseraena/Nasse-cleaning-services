# Nasse Cleaning Services Boilerplate

Nasse Cleaning Services is a modern platform for residential, commercial, post-construction, and facility cleaning. Customers can explore services, request quotations, and manage cleaning-service enquiries online.

The project began as a lean full-stack boilerplate extracted from the useful architecture patterns in the TASKMANAGEMENT application and refocused for a cleaning-company MVP.

## Kept from the original architectural approach

- Next.js App Router route groups
- TypeScript path aliases (`@/*`)
- Redux Toolkit state management
- Redux Saga for side effects
- Redux Persist (UI preferences only)
- Axios API client and centralized API errors
- Provider-based application composition
- Protected admin routing
- Django + Django REST Framework backend structure
- Environment-based configuration

## Added / simplified for Nasse

- TanStack Query configured for server-state caching
- Cookie-based admin authentication (HttpOnly JWT cookies)
- Public service catalogue
- Quote requests
- Corporate enquiries
- Contact messages
- Minimal admin dashboard and status management
- No payments, payroll, staff scheduling, inventory, performance, projects, approvals, institutions, branches, or task-management domain code

## Security decision

JWT access/refresh tokens are intentionally **not** stored in Redux or localStorage. The backend places them in HttpOnly cookies. Redux stores only safe session metadata (`user`, `isAuthenticated`, loading state). This keeps the original state architecture while reducing token exposure to client-side JavaScript.

## Run locally

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:8000

See `docs/ARCHITECTURE.md` for the folder map and extension plan.
