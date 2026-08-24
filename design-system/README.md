# TRISHUL design system

CSS custom properties in `src/styles/globals.css` are the authoritative token values. TypeScript token exports reference those variables for JavaScript-side presentation needs, so feature branches receive the same palette, surfaces, radii, and elevation values through either consumption path.

`StatusPill` is the single owner of domain status-to-colour presentation. Red is reserved for `CRITICAL` operational urgency only. `ABSTAIN` is an intentional, explicitly labelled state, never an empty value or error treatment.

The interface is laptop-first. On mobile, navigation becomes a drawer, case navigation becomes a select control, and the shared data table becomes a stacked layout for quick status checking.
