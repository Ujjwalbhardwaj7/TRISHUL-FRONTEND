# TRISHUL — Frontend Design & Engineering Blueprint

**Project:** TRISHUL  
**Purpose:** Predictive Financial Cyber-Fraud Intelligence & Intervention Platform  
**Document Owner:** Frontend Lead  
**Status:** Frontend Design Contract  
**Applies To:** Every frontend contributor and AI coding agent

---

# 1. Purpose

This document defines the common frontend language for TRISHUL.

Every frontend screen—regardless of who implements it—must feel like part of the same investigation workspace.

This document controls:

- visual language
- color system
- typography
- spacing
- layout
- navigation
- cards and surfaces
- tables
- status representation
- loading/error/empty states
- responsive behavior
- accessibility
- motion
- frontend terminology
- shared component usage
- AI-generated UI constraints

Individual feature owners may determine the internal layout of their feature, but they must not create a separate visual system.

---

# 2. Product Character

TRISHUL is not a consumer fintech application.

It is not a cryptocurrency dashboard.

It is not a generic admin template.

It is not a futuristic "hacker" interface.

It is an operational financial-intelligence workspace intended to help authorised users understand evolving evidence and make informed decisions.

The interface should communicate:

**Calm. Precise. Trustworthy. Evidence-driven. Operational.**

The system should feel sophisticated because of its information architecture—not because of decorative effects.

---

# 3. Core Design Philosophy

## Evidence Before Decoration

Every important visual element should help the user understand one of the following:

- What happened?
- What is currently known?
- What is uncertain?
- What changed?
- Why did the system reach this state?
- What evidence supports it?
- What requires attention?
- What action can an authorised user take?

If a visual element does not help answer one of these questions, reconsider whether it belongs.

---

# 4. Visual Direction — "The Calm Scholar"

TRISHUL uses a restrained visual identity called:

## The Calm Scholar

The palette combines:

- soft sky blue
- deep navy
- crisp white
- warm beige

The visual language should feel calm and intelligent rather than aggressive or futuristic.

---

# 5. Color Palette

The entire product should derive its primary interface colors from this palette.

### Deep Navy

Primary text, navigation, strong headings and important controls.

Suggested starting token:

`#14213D`

### Soft Sky Blue

Primary interactive color and selected/navigation states.

Suggested starting token:

`#8EC5E8`

### Crisp White

Primary workspace surface.

`#FFFFFF`

### Warm Beige

Secondary surface/background used to soften large white interfaces.

Suggested starting token:

`#F4EFE6`

### Muted Secondary

Only one additional muted neutral may be introduced if required for borders, disabled states or secondary text.

Do not introduce arbitrary accent colors.

---

# 6. Semantic Colors Are an Exception

Operational states require semantic distinction.

These colors are functional, not branding colors.

They should appear primarily inside:

- badges
- small indicators
- alerts
- icons
- borders
- compact state elements

They must not become large decorative backgrounds.

Required states include:

- NORMAL
- ANOMALOUS
- WATCH
- SUSPECTED
- ACTIVE
- MONITORING
- PREDICT
- ABSTAIN
- CRITICAL
- CLOSED

## Critical Rule

**Red is reserved for genuine operational urgency or confirmed critical states.**

Do not make ordinary risk scores, navigation elements, decorative graphics or generic warnings red.

WATCH and SUSPECTED must not visually imply confirmed criminality.

ABSTAIN should use a calm neutral/informational treatment.

MONITORING should appear intentional and stable.

---

# 7. Avoid the "Vibecoded" Look

TRISHUL must intentionally avoid common AI-generated UI clichés.

Do NOT default to:

- harsh gradients
- rainbow coloring
- neon colors
- purple-and-black AI styling
- excessive drop shadows
- excessive glassmorphism
- liquid-glass effects
- glowing cards
- radial glow backgrounds
- decorative dot grids
- Bento layouts used without information purpose
- excessive rounded cards
- three/four/five identical feature cards simply to fill space
- terminal windows used decoratively
- sparkle icons
- animated arrows
- unnecessary emojis
- huge floating numbers
- decorative charts without real information
- excessive hover animations
- excessive pill-shaped elements
- generic AI-generated marketing patterns

Avoid the mentality:

> "Everything needs to be a card."

Use whitespace, typography, separators and hierarchy before introducing another container.

---

# 8. Surface Philosophy

Prefer:

**page → section → content**

instead of:

**page → card → card → card → card**

Use cards when content genuinely represents a self-contained object, such as:

- a case
- a metric
- an alert
- a risk assessment
- an intervention state

Do not wrap every heading, table, description or piece of text in a card.

---

# 9. Corner Radius

Use restrained corner radii.

Recommended system:

- small controls: 6px
- standard containers: 8px
- large panels/dialogs: 10–12px

Avoid excessive 20–30px rounded SaaS cards.

Pills should primarily be reserved for:

- statuses
- filters
- compact metadata

---

# 10. Shadows

Use shadows sparingly.

Most structure should come from:

- borders
- surface contrast
- whitespace
- typography

Default cards should generally use subtle borders rather than dramatic shadows.

Strong shadows should be reserved for floating UI such as:

- dialogs
- menus
- popovers

---

# 11. Typography

Typography should optimize information density and readability.

Use one primary sans-serif family already supported by the project.

Avoid introducing multiple decorative font families.

Hierarchy:

### Display / Page Title

Used sparingly.

### H1

Major workspace/page title.

### H2

Major section heading.

### H3

Panel or content heading.

### Body

Primary readable information.

### Small

Metadata, timestamps and supporting information.

### Mono

Only when displaying genuinely technical identifiers such as:

- transaction IDs
- hashes
- case IDs
- reason codes

Do not use monospace fonts decoratively.

---

# 12. Application Structure

TRISHUL should use one persistent application shell.

Desktop structure:

```text
┌────────────────────────────────────────────────────────────┐
│                    GLOBAL HEADER                           │
├──────────────┬─────────────────────────────────────────────┤
│              │                                             │
│   SIDEBAR    │              WORKSPACE                      │
│              │                                             │
│              │                                             │
│              │                                             │
└──────────────┴─────────────────────────────────────────────┘
```

The shell must not change dramatically between modules.

---

# 13. Primary Navigation

The shared navigation should provide access to the major TRISHUL workspaces.

Expected destinations:

- Command Center
- Payment Risk
- Case Intelligence
- Prediction
- Secure Resolution
- Audit / Outcomes

Navigation labels must remain concise.

Do not add decorative navigation categories simply to fill the sidebar.

---

# 14. Route Ownership

Expected route structure:

`/command-center`

Owner: Ujjwal

`/risk`

Owner: Ujjwal  
Shared integration: Vatsal

`/cases/:caseId`

Owner: Sandhya

`/prediction/:caseId`

Owner: Vanshika

`/resolution/:caseId`

Owner: Vatsal

`/audit/:caseId`

Shared ownership according to project architecture.

All screens must use the common shell and design system.

---

# 15. Command Center

The Command Center is the operational landing workspace.

It should prioritize:

1. urgent intervention
2. active cases
3. WATCH activity
4. exposure state
5. forecast state
6. alerts
7. recent operational changes

It should not become a collection of meaningless KPI cards.

Possible high-level structure:

```text
COMMAND CENTER

Operational summary

Active Cases | Watch Events | Intervention | Alerts

────────────────────────────────────────────

Cases requiring attention

Case       Exposure       Risk       Forecast       State

────────────────────────────────────────────

Active Intervention
Case information
Exposure
Exit mode
Evidence state
Forecast

────────────────────────────────────────────

Recent Watch / Alert Activity
```

---

# 16. Payment Risk / Verify

This screen must visually separate:

## TRUST

What can be verified?

from

## RISK

What observable behaviour/network evidence exists?

A verified identity does NOT mean a transaction is safe.

The interface should communicate:

```text
PAYMENT ASSESSMENT

Transaction

₹50,000
Sender → Receiver

────────────────────────────

Trust
Receiver verification

Risk
Transaction anomaly
Receiver behaviour
Network risk

────────────────────────────

Reasons

• New beneficiary
• Amount above payer baseline
• Receiver inflow spike
• Pass-through behaviour

────────────────────────────

Decision

STEP-UP
```

The separation between trust and risk must remain obvious.

---

# 17. Case Intelligence

Owner: Sandhya.

Must still use the shared system.

Expected information includes:

- complaint
- transaction anchor
- money-flow graph
- node details
- exposure
- evidence timeline
- provenance

Graph visuals must represent real backend/deterministic fixture relationships.

Never create decorative graph edges.

Clicking an edge should expose relevant provenance information where available.

---

# 18. Prediction Workspace

Owner: Vanshika.

Expected concepts:

- Exit Mode
- Evidence Gate
- Evidence Coverage
- Top-K zones
- Time horizon
- Reasons
- ABSTAIN

Prediction confidence and evidence must be more visually prominent than decorative mapping.

If geographic prediction is withheld:

**do not display a misleading map.**

---

# 19. Secure Resolution

Owner: Vatsal.

Expected concepts:

- role
- purpose
- credential
- access state
- identity-resolution request
- resolution result

Sensitive information must not appear simply because the route exists.

Access state must be visually obvious.

---

# 20. Status Language

Frontend copy is part of system correctness.

Allowed language includes:

- NORMAL
- ANOMALOUS
- WATCH
- SUSPECTED
- REPORTED
- ACTIVE
- MONITORING
- ABSTAIN
- CASH-OUT LIKELY
- CLOSED
- OUTCOME KNOWN

Avoid unsupported statements such as:

- "Fraudster detected"
- "Criminal account"
- "Intent detected"
- "This user intends fraud"
- "Guaranteed cash-out"
- "Exact ATM predicted"

TRISHUL reports evidence-supported states, not fictional certainty.

---

# 21. ABSTAIN

ABSTAIN is one of the most important states in TRISHUL.

It means the evidence does not currently justify a defensible prediction.

It is NOT:

- an error
- a crashed model
- missing UI
- failed prediction

Recommended presentation:

```text
Prediction withheld

Current evidence is insufficient for a defensible
location forecast.

Missing / weak evidence

• Limited account history
• Low network history
• Insufficient comparable outcomes

Status
ABSTAIN

Continue monitoring for new evidence.
```

This state should look deliberate and trustworthy.

---

# 22. MONITORING

MONITORING means the system is intentionally waiting for stronger/new evidence or further events.

It should visually communicate:

**stable observation**

rather than:

**failure or inactivity**

---

# 23. Confidence

Never show a confidence percentage without context.

Prefer:

```text
Evidence Coverage

HIGH

Supported by:
✓ account history
✓ network history
✓ graph confidence

Limited by:
— historical sample depth
```

over:

```text
AI Confidence: 87%
```

unless 87% is genuinely returned by the relevant backend/model contract.

---

# 24. Provenance

Where appropriate, users should be able to understand where information came from.

Examples:

- transaction event
- complaint
- provider event
- graph relationship
- trusted intelligence
- historical outcome
- analyst action

Provenance should be discoverable without overwhelming the default view.

---

# 25. Tables

TRISHUL is data-heavy.

Tables are preferred over arbitrary card grids for structured collections.

Tables should support:

- readable column hierarchy
- compact density
- clear status cells
- sorting where useful
- filtering where useful
- row selection/click
- loading skeleton
- empty state
- error state

Avoid horizontal overflow at standard laptop resolutions.

---

# 26. Icons

Icons must have semantic purpose.

Use icons for:

- navigation
- actions
- statuses where useful
- alerts
- information hierarchy

Do not decorate every heading with an icon.

Do not introduce several different icon libraries.

Use one icon system consistently.

---

# 27. Motion

Motion should explain state change, not entertain.

Allowed examples:

- sidebar transition
- dialog opening
- row update
- subtle loading state
- notification arrival
- expanding evidence details

Avoid:

- floating objects
- animated arrows
- continuous glowing
- bouncing icons
- unnecessary page entrance animations
- animated gradients

---

# 28. Loading

Every asynchronous workspace must have an intentional loading state.

Use skeletons where the eventual structure is predictable.

Do not display:

`Loading...`

in the middle of otherwise finished production screens unless appropriate.

---

# 29. Empty State

Empty states should explain:

1. what is empty
2. why it may be empty
3. what the user can do next, if anything

Example:

```text
No active interventions

There are currently no cases inside an active
intervention window.

Cases being monitored remain available in the
case workspace.
```

---

# 30. Error State

Errors must distinguish between:

- network failure
- unavailable service
- unauthorized access
- missing resource
- unexpected application error

Do not represent ABSTAIN or missing prediction evidence as application errors.

---

# 31. Responsive Behaviour

Primary target:

**Laptop / desktop investigation workspace**

Secondary:

**Tablet**

Fallback:

**Mobile**

Mobile should preserve access to important information but does not need to replicate the exact desktop density.

Tables may transform into appropriate compact representations when necessary.

Navigation should collapse intentionally.

---

# 32. Accessibility

Every contributor must preserve:

- keyboard navigation
- visible focus indicators
- sufficient contrast
- semantic HTML
- accessible forms
- meaningful labels
- non-color-only status communication
- appropriate ARIA where necessary

Risk cannot be communicated through color alone.

For example:

Bad:

`●`

Better:

`● WATCH`

---

# 33. Shared Components

Feature teams should use shared components before creating new variants.

Expected shared primitives may include:

```text
AppShell
Sidebar
Header
PageHeader

Button
IconButton

Card
Panel

Badge
StatusBadge

Metric
MetricCard

DataTable

AlertBanner

Skeleton
EmptyState
ErrorState

Modal
Drawer

EvidenceIndicator
ConfidenceIndicator
```

Only add components when there is a genuine reuse case.

---

# 34. Component Ownership Rule

Before creating a new component, ask:

**Does an equivalent shared component already exist?**

If yes, extend/reuse it.

Do not create:

`RiskCard`

`RiskInfoCard`

`RiskDetailsCard`

`RiskSummaryCard`

when one composable `Card`/`Panel` system can solve the problem.

---

# 35. API Boundary

Frontend components should not directly scatter backend calls throughout the UI.

Use the project's shared API layer.

Conceptually:

```text
UI
 ↓
Feature hooks/services
 ↓
Shared API client
 ↓
Shared contracts
 ↓
Backend
```

Do not hard-code localhost URLs inside React components.

Do not invent production responses.

---

# 36. Demo Data

Deterministic demo fixtures are allowed.

They must remain separate from production API code.

Preferred conceptual structure:

```text
fixtures/
    golden-case.ts

services/
    cases.api.ts

components/
    CaseTable.tsx
```

Not:

```text
CaseTable.tsx

const fakeCases = [...]
```

---

# 37. AI Coding Rules

Every AI coding agent working on TRISHUL must follow these rules.

Before changing code:

1. inspect the repository
2. read this blueprint
3. inspect shared components
4. inspect shared contracts
5. inspect existing feature architecture

AI agents must NOT:

- replace the frontend framework
- introduce another design system
- introduce another icon library without justification
- create arbitrary colors
- create arbitrary gradients
- fabricate backend data
- invent API contracts
- rewrite unrelated modules
- perform Git operations unless explicitly instructed
- change another teammate's feature ownership
- label suspicion as confirmed fraud

---

# 38. Git Ownership

Frontend contributors work through feature branches.

Examples:

```text
feature/frontend-shell
feature/payment-risk-ui
feature/command-center
feature/case-intelligence
feature/geo-prediction
feature/trust-access
```

Feature work should reach main through review rather than direct development on main.

---

# 39. Frontend Review Checklist

Before any frontend PR is considered complete:

- [ ] Uses the shared AppShell.
- [ ] Uses approved color tokens.
- [ ] Introduces no arbitrary accent colors.
- [ ] Introduces no unnecessary gradients.
- [ ] Does not overuse cards.
- [ ] Does not overuse shadows.
- [ ] Uses shared status semantics.
- [ ] Does not equate WATCH with confirmed fraud.
- [ ] Does not infer user intent.
- [ ] Handles loading state.
- [ ] Handles error state.
- [ ] Handles empty state where relevant.
- [ ] Handles partial/missing data.
- [ ] Handles ABSTAIN where relevant.
- [ ] Works at laptop resolution.
- [ ] Has usable mobile fallback.
- [ ] Supports keyboard interaction.
- [ ] Does not rely on color alone.
- [ ] Does not hard-code production API responses.
- [ ] Uses shared contracts where available.
- [ ] Passes lint/typecheck/build.
- [ ] Does not modify another owner's feature unnecessarily.

---

# 40. Final Design Rule

When choosing between:

**more impressive**

and

**more understandable**

choose **more understandable**.

When choosing between:

**more colorful**

and

**clearer hierarchy**

choose **clearer hierarchy**.

When choosing between:

**pretending certainty**

and

**showing uncertainty**

show **uncertainty**.

TRISHUL should earn trust by clearly communicating what the evidence supports—and what it does not.