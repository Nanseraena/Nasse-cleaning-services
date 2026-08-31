# What was kept vs removed from TASKMANAGEMENT

## Kept conceptually
- Next.js App Router and route groups
- `src/store` separation with reducers/selectors/sagas
- Redux Toolkit + Saga + Persist composition
- provider composition at the root layout
- centralized Axios client/interceptors
- strict TypeScript/path aliases
- Django REST API separation
- authenticated admin area

## Removed for the cleaning MVP
- institutions and branches
- tasks/projects/performance/appraisal/approvals
- notices/reporting modules
- module-host integration layer
- notification streams/Celery/Channels
- multi-tenant permission machinery
- task-specific resource UUID headers
- embedded-module routing rewrites
- theme customization complexity
- large dashboard/chart dependencies

## Why
The removed parts are domain-specific or operationally expensive for a cleaning-company MVP. Reintroduce them only when the business actually needs them.
