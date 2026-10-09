# 📜 Documentation Maintenance & Synchronization Protocol
## Project: A-Cube Academy Platform
**Enforcement Level:** Mandatory across all development phases & AI agent interactions

---

## 1. The Core Rule

> **Whenever any modification, addition, deletion, or refactoring is performed in this repository, the corresponding documentation files in `/docs` and `README.md` MUST be updated in the same turn/commit to reflect the current state of the codebase.**

Code and documentation must never drift apart. Outdated documentation is treated as a technical defect.

---

## 2. Change-to-Document Mapping Matrix

Use the matrix below to identify which document(s) must be updated based on the type of change:

| Change Category | Examples of Changes | Mandatory Documents to Update |
| :--- | :--- | :--- |
| **Feature / Requirements** | Adding a new student feature, modifying approval rules, changing role permissions. | • [`docs/PRD.md`](file:///g:/A_Cube/docs/PRD.md)<br>• [`docs/SRS.md`](file:///g:/A_Cube/docs/SRS.md) |
| **Technical Stack & APIs** | Adding npm packages, altering Express middleware, changing S3/R2 storage logic, creating/editing REST endpoints. | • [`docs/TRD.md`](file:///g:/A_Cube/docs/TRD.md)<br>• [`README.md`](file:///g:/A_Cube/README.md)<br>• [`.env.example`](file:///g:/A_Cube/.env.example) |
| **Navigation & Flow** | Adding/renaming routes, modifying redirects, changing route guards, altering user journeys. | • [`docs/APP_FLOW.md`](file:///g:/A_Cube/docs/APP_FLOW.md)<br>• [`client/src/App.tsx`](file:///g:/A_Cube/client/src/App.tsx) |
| **UI/UX & Design** | Modifying color tokens in Tailwind, changing typography, updating component variants, redesigning screens. | • [`docs/UI_UX_DESIGN_BRIEF.md`](file:///g:/A_Cube/docs/UI_UX_DESIGN_BRIEF.md)<br>• [`client/src/index.css`](file:///g:/A_Cube/client/src/index.css) |
| **Database Schema** | Adding Mongoose models, adding/removing fields, altering data types, changing indexes, updating relationships. | • [`docs/BACKEND_SCHEMA.md`](file:///g:/A_Cube/docs/BACKEND_SCHEMA.md)<br>• [`server/src/seed/seed.ts`](file:///g:/A_Cube/server/src/seed/seed.ts) |
| **Phases & Milestones** | Completing build tasks, adding new technical phases, changing development sequences. | • [`docs/IMPLEMENTATION_PLAN.md`](file:///g:/A_Cube/docs/IMPLEMENTATION_PLAN.md) |
| **Brand / Leaflet Context** | Updating faculty credentials, phone numbers, location, teaching philosophy, official fees. | • [`docs/PROJECT_CONTEXT.md`](file:///g:/A_Cube/docs/PROJECT_CONTEXT.md)<br>• [`docs/PRD.md`](file:///g:/A_Cube/docs/PRD.md)<br>• [`README.md`](file:///g:/A_Cube/README.md) |

---

## 3. Standard Developer & Agent Verification Checklist

Before considering any task or feature complete, verify:
- [ ] Code compiles cleanly with zero errors (`npm run build`).
- [ ] Any schema or database changes are documented in [`docs/BACKEND_SCHEMA.md`](file:///g:/A_Cube/docs/BACKEND_SCHEMA.md).
- [ ] Any new route or flow is mapped in [`docs/APP_FLOW.md`](file:///g:/A_Cube/docs/APP_FLOW.md).
- [ ] Any new API endpoint or configuration is documented in [`docs/TRD.md`](file:///g:/A_Cube/docs/TRD.md) and [`README.md`](file:///g:/A_Cube/README.md).
- [ ] Functional changes are aligned with [`docs/PRD.md`](file:///g:/A_Cube/docs/PRD.md) and [`docs/SRS.md`](file:///g:/A_Cube/docs/SRS.md).
