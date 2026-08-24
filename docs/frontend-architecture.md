# TRISHUL — `feature/frontend-shell` Architecture
**Owner:** Ujjwal (Frontend Lead) · **Scope:** shell, navigation, routing, providers, design system, tokens, shared components, API client, shared state, integration quality.

This document is implementation-ready but intentionally hackathon-scoped: no enterprise abstraction layers, no premature micro-frontend splitting, no speculative config. Every decision below is chosen so a teammate (or Codex) can start writing files immediately.

---

## 1. Route Hierarchy

```
/                         → redirect to /command-center
/command-center           → OWNED (shell renders real page)
/risk                     → OWNED (shell renders real page)
/cases/:caseId            → PLACEHOLDER (owned by cases feature branch)
/prediction/:caseId       → PLACEHOLDER (owned by prediction feature branch)
/resolution/:caseId       → PLACEHOLDER (owned by resolution feature branch)
/audit/:caseId            → PLACEHOLDER (owned by audit feature branch)
*                         → NotFoundPage (shell)
```

Notes:
- `/command-center` and `/risk` are **not** feature-owned; they are the two shell-native landing surfaces, so frontend-shell builds real (if minimal) content for them — an operational overview and a risk queue shell — since no other branch owns them.
- All `:caseId` routes share one investigation context (see §4, `CaseProvider`) so switching between prediction/resolution/audit for the same case doesn't refetch or reset shared case identity.
- Route ownership is documented in `src/routes/routeManifest.ts` (single source of truth — prevents two branches from touching `App.tsx` simultaneously).

---

## 2. Application Layout Hierarchy

```
<AppProviders>                     (all context providers, §4)
  <AppShell>                       (persistent chrome)
    <TopBar />                     (product identity, global status, env indicator)
    <SideNav />                    (primary navigation, collapsible)
    <CaseContextBar />             (visible only inside /cases|/prediction|/resolution|/audit/:caseId)
    <MainViewport>
      <ErrorBoundary>              (route-level, §15)
        <Suspense fallback={<RouteLoadingState />}>
          <Outlet />               (routed page)
        </Suspense>
      </ErrorBoundary>
    </MainViewport>
    <StatusFooter />               (system ABSTAIN/coverage indicator, non-intrusive)
  </AppShell>
</AppProviders>
```

Design intent: `AppShell` is the "one coherent workspace" — it never unmounts between route changes. `CaseContextBar` gives continuity across the four case-scoped routes (same caseId, tab-like switching between Prediction/Resolution/Audit/Case).

---

## 3. Folder Structure

```
src/
  app/
    AppProviders.tsx
    AppShell.tsx
    routes/
      routeManifest.ts
      AppRoutes.tsx
      PlaceholderRoute.tsx
  layout/
    TopBar/
    SideNav/
    CaseContextBar/
    MainViewport/
    StatusFooter/
    NotFoundPage/
  design-system/
    tokens/
      colors.ts
      spacing.ts
      typography.ts
      elevation.ts
      motion.ts
      index.ts
    components/
      Button/
      Badge/
      StatusPill/
      Card/
      Table/
      EmptyState/
      LoadingState/
      ErrorState/
      Tooltip/
      Modal/
      Tabs/
      Skeleton/
      ConfidenceMeter/
      EvidenceGapMarker/
      index.ts
  state/
    providers/
      QueryProvider.tsx
      CaseProvider.tsx
      NavigationStateProvider.tsx
      SystemHealthProvider.tsx
    hooks/
      useCaseContext.ts
      useSystemStatus.ts
      useBreakpoint.ts
  api/
    client.ts
    endpoints/
      cases.ts
      prediction.ts
      resolution.ts
      audit.ts
      risk.ts
    types/
      contracts.ts        (mirrors backend contract — never hand-authored guesses)
      status.ts           (canonical TRISHUL system-status contract)
    errors/
      ApiError.ts
  features/
    command-center/
      CommandCenterPage.tsx
    risk/
      RiskQueuePage.tsx
    cases/
      CasesPlaceholderPage.tsx
    prediction/
      PredictionPlaceholderPage.tsx
    resolution/
      ResolutionPlaceholderPage.tsx
    audit/
      AuditPlaceholderPage.tsx
  lib/
    utils/
    constants/
  styles/
    globals.css
  main.tsx
  App.tsx
```

Rule: **`features/*` folders owned by other branches contain ONLY the placeholder file listed.** Shell does not create subfolders (components/, hooks/, api/) inside feature modules it doesn't own — that's for the owning branch to scaffold, avoiding merge collisions.

---

## 4. Provider Hierarchy

```tsx
<QueryProvider>            // TanStack Query client — caching, retries, shared fetch state
  <SystemHealthProvider>    // global ABSTAIN/coverage/degraded-mode banner state
    <NavigationStateProvider> // sidebar collapse, active section, breadcrumbs
      <CaseProvider>        // active caseId, case-scoped route state — no-op outside case routes
        {children}
      </CaseProvider>
    </NavigationStateProvider>
  </SystemHealthProvider>
</QueryProvider>
```

Ordering rationale: Query must wrap everything (all providers may fetch). SystemHealth sits above Navigation because a degraded/ABSTAIN system state can affect what navigation renders. CaseProvider is innermost because it is the narrowest-scoped state. Dark mode is not part of this branch.

Each provider is a thin context + hook pair (`useX()`), no reducers unless state genuinely branches (CaseProvider may warrant `useReducer` because of tab + fetch-status combos).

---

## 5. Design-Token Architecture

CSS custom properties in `styles/globals.css` are the canonical token values. They implement the Calm Scholar palette: deep navy, soft sky blue, crisp white, warm beige, and restrained semantic colours. `tokens/colors.ts` and `tokens/index.ts` export references to those same CSS variables for JavaScript-side consumers, so TypeScript and CSS cannot drift.

Spacing, radii, elevation, typography, and motion exports mirror the canonical CSS values. Red is reserved for `CRITICAL` operational urgency; `WATCH` and `SUSPECTED` use non-red semantic treatments, and `ABSTAIN` stays neutral/informational.

---

## 6. Shared Component Architecture

All in `design-system/components/`, each folder: `ComponentName.tsx`, `ComponentName.types.ts` (if props >3), `index.ts`. No Storybook, no visual regression tooling — hackathon scope.

Priority components (build in this order, others can be added by feature branches later):

| Component | Purpose |
|---|---|
| `Badge` / `StatusPill` | Renders the canonical TRISHUL system-status contract — see §8 |
| `ConfidenceMeter` | Visualizes model confidence without implying certainty |
| `EvidenceGapMarker` | Explicit "missing evidence" visual — never blank/absent |
| `Card` | Base investigation-surface container |
| `Table` | Case lists, risk queues |
| `EmptyState` / `LoadingState` / `ErrorState` | See §9 |
| `Tabs` | Case-context switching (Prediction/Resolution/Audit/Case) |
| `Modal`, `Tooltip`, `Skeleton`, `Button` | Standard utility primitives |

Composition rule: feature modules **consume** design-system components, never fork/copy them. If a feature needs a variant, it extends via props, not duplication.

---

## 7. Navigation Model

- **Primary nav (`SideNav`)**: Command Center, Payment Risk, Cases — flat, no nested menus (hackathon judges should get the mental model in 3 seconds).
- **Contextual nav (`CaseContextBar`)**: appears only when a `:caseId` is present; tab-style switch between Case / Prediction / Resolution / Audit, preserving `caseId` across tabs.
- **Breadcrumbs**: derived, not hand-maintained — computed from `routeManifest.ts` + active case, shown in `TopBar`.
- **State**: `NavigationStateProvider` holds `{ sidebarCollapsed, activeSection }`. Active route highkeyed from React Router location, not duplicated in state.
- **Deep-linkability**: every nav transition is a real route change (no client-only view-swapping) so URLs stay shareable — important for investigation handoff between analysts.

---

## 8. Status / Badge Architecture

Single enum, defined once in `api/types/status.ts`, consumed everywhere:

```ts
export type SystemStatus =
  | 'NORMAL'
  | 'ANOMALOUS'
  | 'WATCH'
  | 'SUSPECTED'
  | 'ACTIVE'
  | 'MONITORING'
  | 'PREDICT'
  | 'ABSTAIN'
  | 'CRITICAL'
  | 'CLOSED';
```

`StatusPill` is the **only** component allowed to map `SystemStatus → color`. This centralizes the domain rule ("never label WATCH/SUSPECTED as confirmed, red reserved for critical operational urgency") into one file (`StatusPill.tsx`) instead of scattering color logic across features.

```tsx
<StatusPill status="WATCH" />        // amber, label: "Watch"
<StatusPill status="SUSPECTED" />    // blue,  label: "Suspected"
<StatusPill status="ABSTAIN" />      // slate, label: "Abstained — insufficient evidence"
<StatusPill status="CRITICAL" />    // red, label: "Critical"
```

`ABSTAIN` always renders with an icon + explicit label — never a bare dash or empty cell, so it reads as intentional, not broken (also satisfies "MONITORING must look intentional").

A second small enum `MonitoringState = 'ACTIVE' | 'PAUSED' | 'DEGRADED'` drives a distinct `MonitoringIndicator` (pulsing dot + label), separate from `StatusPill`, so operational monitoring health is never visually confused with fraud-risk status.

---

## 9. Loading / Error / Empty-State Architecture

Three dedicated primitives, used uniformly across all features (feature branches import, don't reinvent):

- **`LoadingState`**: skeleton-based, not spinners, for content areas (`Skeleton` primitives shaped to the content they replace). Route-level fallback uses a lightweight `RouteLoadingState` (shell skeleton, not full-page spinner) to preserve "coherent workspace" feel during code-split loads.
- **`EmptyState`**: for legitimate zero-data (e.g., no cases match filter). Always includes explanation + next action. Distinct visually and textually from ABSTAIN (empty = nothing to show; ABSTAIN = system deliberately declined to conclude).
- **`ErrorState`**: for fetch/API failures. Shows `ApiError.message` (never a stack trace), a retry action wired to the query's `refetch`, and a correlation/request id if the API returns one — critical for a fraud platform's audit trail.

Query-driven pages follow one fixed pattern:
```tsx
if (isPending) return <LoadingState variant="table" />;
if (isError)   return <ErrorState error={error} onRetry={refetch} />;
if (!data?.length) return <EmptyState title="No matching cases" />;
return <RealContent data={data} />;
```

---

## 10. API-Client Architecture

Single shared client, one fetch layer, thin wrapper — no premature repository/service-layer abstraction.

```
api/client.ts        → configured fetch wrapper (base URL, auth header injection, JSON parsing, ApiError normalization)
api/endpoints/*.ts   → one function per backend operation, typed request/response, e.g.:
                        getCase(caseId): Promise<CaseContract>
                        getRiskQueue(params): Promise<RiskQueueContract>
api/types/contracts.ts → types generated from / matching backend contract docs (source of truth = backend)
api/errors/ApiError.ts → normalized error shape { status, code, message, requestId? }
```

- All data fetching goes through **TanStack Query** (`useQuery`/`useMutation`) wrapping these endpoint functions — gives caching, retry, and shared loading/error semantics for free, matching §9.
- Feature branches call `api/endpoints/*` functions via their own query hooks (e.g. `usePredictionQuery(caseId)` lives in the prediction feature folder once that branch exists) — shell does not pre-build feature-specific hooks, only the endpoint function signatures + types, since contracts are the source of truth and shell shouldn't guess at feature-specific query shaping.
- **Never fabricate data**: if an endpoint isn't ready, the endpoint function throws/returns a typed "not implemented" rejection rather than mock data baked into shell code — placeholders (§ below) show `EmptyState`/"Coming online" copy, not fake payment graphs or invented case data.

---

## 11. Shared TypeScript Type Strategy

- **Single source**: `api/types/contracts.ts` mirrors backend contract exactly (field names, nullability) — if backend changes, this file changes, nothing else guesses independently.
- **Domain enums** (`status.ts`) are shared, imported everywhere status is displayed.
- **No duplicated ad-hoc interfaces** in feature folders for shared entities (Case, RiskSignal, EvidenceItem) — those live in `contracts.ts`. Feature-local types (UI-only state, form state) stay in the feature folder.
- Use `type` for data shapes, `interface` only for component props (project convention, not a hard rule).
- Strict mode on (`strict: true` in tsconfig) — catches accidental `any` creeping into contract-adjacent code, important given "never fabricate evidence" domain rule extends to types (no optional-chaining-into-fake-defaults for missing evidence — represent it explicitly, e.g. `evidence: EvidenceItem[] | 'INSUFFICIENT'`).

---

## 12. Feature-Module Boundaries

- Shell owns: `app/`, `layout/`, `design-system/`, `state/`, `api/` (client + type contracts + endpoint signatures), and the two shell-native pages (`command-center`, `risk`).
- Each other feature folder (`cases/`, `prediction/`, `resolution/`, `audit/`) contains **only** a placeholder page file until its branch lands. Owning branches will add their own subfolders (`components/`, `hooks/`, `api/` query hooks) — shell does not pre-scaffold those, to avoid merge conflicts and false ownership signals.
- Cross-feature imports only through `design-system/`, `state/`, and `api/` — features never import from each other directly.
- `routeManifest.ts` is the only place route ownership + path is declared — new features register here, shell reviews via PR.

---

## 13. Accessibility Rules

- All status/badge color coding is paired with text label + (where compact) icon — never color-only signaling (critical given red/amber/blue semantic overload risk).
- Keyboard nav: `SideNav`, `CaseContextBar` tabs, and `Table` rows are fully tab/enter operable; visible focus ring uses `border.focus` token, not browser default removal.
- `aria-live="polite"` region in `SystemHealthProvider`'s banner for ABSTAIN/degraded-mode announcements, so state changes are announced without stealing focus.
- Semantic HTML first (`<nav>`, `<main>`, `<table>`, `<button>`) before ARIA patching.
- Contrast: all semantic status colors checked against WCAG AA on both light surface tokens before lock-in (amber/blue especially, since red is intentionally the only "loud" color).
- `prefers-reduced-motion` respected in `tokens/motion.ts` — MonitoringIndicator's pulse falls back to a static dot.

---

## 14. Responsive Strategy

Laptop-first, mobile fallback (not mobile-first, not full mobile parity):

- Breakpoints: `desktop (≥1024px)` — primary target, full layout; `tablet (768–1023px)` — collapsed `SideNav` to icon rail; `mobile (<768px)` — fallback mode: `SideNav` becomes a slide-over drawer, `CaseContextBar` tabs become a dropdown, dense tables switch to stacked-card layout via existing `Card`/`Table` components (no separate mobile-only components — same components, responsive props/CSS).
- `useBreakpoint()` hook (in `state/hooks/`) as the single source of breakpoint truth, backed by CSS `matchMedia`, not re-derived per component.
- Mobile is explicitly a **fallback for checking status on the go**, not a target for deep investigation work — document this expectation in the README so nobody over-invests in mobile interaction design during the hackathon.

---

## 15. Error Boundary Strategy

Two-tier:
1. **Root boundary** (in `AppProviders` or `main.tsx`) — catches catastrophic render failures, shows a full-page `ErrorState` with reload action. Last resort only.
2. **Route-level boundary** (wrapping `<Outlet/>` in `AppShell`, per §2) — catches errors thrown by an individual page/feature without tearing down the persistent shell (TopBar/SideNav stay mounted) — preserves "coherent workspace" feel even when one feature crashes.

Implementation: a single reusable `ErrorBoundary` component (class component, since that's still required for React error boundaries) parameterized by a `fallback` render prop, reused at both tiers with different fallback UIs. No per-feature custom boundaries needed at shell stage — feature branches may add finer-grained boundaries later if needed (e.g. around a risky chart).

---

## 16. Naming Conventions

- Components: `PascalCase` file + export name, one component per file (`StatusPill.tsx`).
- Hooks: `useCamelCase.ts`, always start with `use`.
- Types/interfaces: `PascalCase`, contract types suffixed `Contract` (e.g. `CaseContract`) to visually distinguish backend-sourced shapes from UI-local types.
- Enums/unions for domain status: `SCREAMING_SNAKE` values (`WATCH`, `ABSTAIN`) matching backend contract casing exactly — no frontend-side relabeling of the enum values themselves (display labels are a separate mapping in `StatusPill`).
- Folders: `kebab-case` for feature/route folders (`command-center`), `PascalCase` for component folders.
- API endpoint functions: verb-first, resource-named (`getCase`, `getRiskQueue`, `getPredictionSummary`).
- CSS variables: `--color-status-watch`, `--space-4`, `--radius-md` — semantic-first naming, not primitive-value naming.

---

## 17. Exact Files to Exist After `feature/frontend-shell` Is Complete

```
src/main.tsx
src/App.tsx

src/app/AppProviders.tsx
src/app/AppShell.tsx
src/app/routes/routeManifest.ts
src/app/routes/AppRoutes.tsx
src/app/routes/PlaceholderRoute.tsx

src/layout/TopBar/TopBar.tsx
src/layout/SideNav/SideNav.tsx
src/layout/CaseContextBar/CaseContextBar.tsx
src/layout/MainViewport/MainViewport.tsx
src/layout/StatusFooter/StatusFooter.tsx
src/layout/NotFoundPage/NotFoundPage.tsx

src/design-system/tokens/colors.ts
src/design-system/tokens/spacing.ts
src/design-system/tokens/typography.ts
src/design-system/tokens/elevation.ts
src/design-system/tokens/motion.ts
src/design-system/tokens/index.ts

src/design-system/components/Button/Button.tsx
src/design-system/components/Badge/Badge.tsx
src/design-system/components/StatusPill/StatusPill.tsx
src/design-system/components/Card/Card.tsx
src/design-system/components/Table/Table.tsx
src/design-system/components/EmptyState/EmptyState.tsx
src/design-system/components/LoadingState/LoadingState.tsx
src/design-system/components/ErrorState/ErrorState.tsx
src/design-system/components/Tooltip/Tooltip.tsx
src/design-system/components/Modal/Modal.tsx
src/design-system/components/Tabs/Tabs.tsx
src/design-system/components/Skeleton/Skeleton.tsx
src/design-system/components/ConfidenceMeter/ConfidenceMeter.tsx
src/design-system/components/EvidenceGapMarker/EvidenceGapMarker.tsx
src/design-system/components/ErrorBoundary/ErrorBoundary.tsx
src/design-system/components/index.ts

src/state/providers/QueryProvider.tsx
src/state/providers/CaseProvider.tsx
src/state/providers/NavigationStateProvider.tsx
src/state/providers/SystemHealthProvider.tsx
src/state/hooks/useCaseContext.ts
src/state/hooks/useSystemStatus.ts
src/state/hooks/useBreakpoint.ts

src/api/client.ts
src/api/endpoints/cases.ts
src/api/endpoints/prediction.ts
src/api/endpoints/resolution.ts
src/api/endpoints/audit.ts
src/api/endpoints/risk.ts
src/api/types/contracts.ts
src/api/types/status.ts
src/api/errors/ApiError.ts

src/features/command-center/CommandCenterPage.tsx
src/features/risk/RiskQueuePage.tsx
src/features/cases/CasesPlaceholderPage.tsx
src/features/prediction/PredictionPlaceholderPage.tsx
src/features/resolution/ResolutionPlaceholderPage.tsx
src/features/audit/AuditPlaceholderPage.tsx

src/lib/utils/index.ts
src/lib/constants/index.ts

src/styles/globals.css

design-system/README.md   (token usage rules, "red reserved" rule documented explicitly)
```

---

## Implementation Order (for Codex)

1. **Tokens first** — `design-system/tokens/*` (colors, spacing, typography, elevation, motion) + `globals.css` variables. Nothing else can be styled correctly without this.
2. **`api/types/status.ts` + `api/types/contracts.ts` + `api/errors/ApiError.ts`** — domain types before any component that displays them.
3. **`api/client.ts` + `api/endpoints/*`** — shared fetch layer.
4. **Core design-system primitives**: `Badge`/`StatusPill` → `Card` → `Table` → `Skeleton` → `LoadingState`/`EmptyState`/`ErrorState` → `Button`/`Tooltip`/`Modal`/`Tabs` → `ConfidenceMeter`/`EvidenceGapMarker` → `ErrorBoundary`.
5. **State providers**: `QueryProvider` → `SystemHealthProvider` → `NavigationStateProvider` → `CaseProvider`, then `AppProviders.tsx` composing them in order. Theme infrastructure is deferred until a product requirement exists.
6. **Layout shell**: `TopBar` → `SideNav` → `MainViewport` → `StatusFooter` → `NotFoundPage` → `CaseContextBar` → `AppShell.tsx` assembling all of it with `ErrorBoundary` + `Suspense` wrapping `<Outlet/>`.
7. **Routing**: `routeManifest.ts` → `PlaceholderRoute.tsx` → `AppRoutes.tsx` → wire into `App.tsx`/`main.tsx`.
8. **Shell-owned pages**: `CommandCenterPage.tsx`, `RiskQueuePage.tsx` (real, minimal, using the primitives above).
9. **Placeholder pages**: `CasesPlaceholderPage.tsx`, `PredictionPlaceholderPage.tsx`, `ResolutionPlaceholderPage.tsx`, `AuditPlaceholderPage.tsx` — each just renders `EmptyState`-style "feature pending" content using shared components, proving the shell/route/provider wiring end-to-end.
10. **Responsive pass**: apply `useBreakpoint`, verify `SideNav` drawer collapse, table-to-card fallback at mobile widths.
11. **Accessibility pass**: keyboard nav check, `aria-live` region, contrast check on status tokens, `prefers-reduced-motion`.
12. **`design-system/README.md`** — document the canonical CSS-variable token source and the red-reserved-for-critical rule so other branches do not violate it later.

This order guarantees that at every step, the app is runnable and visibly progressing — tokens → types → client → components → state → shell → routes → pages — with no step depending on something built later.
