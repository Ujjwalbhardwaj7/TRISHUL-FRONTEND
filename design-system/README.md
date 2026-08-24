# TRISHUL design system

This folder contains the shared TRISHUL frontend design system. Its visual direction is an editorial intelligence dossier: deep navy, warm paper surfaces, restrained rules, editorial headings, and compact operational text.

CSS custom properties in `src/styles/globals.css` are authoritative. Reuse shared components and tokens before adding variants. `StatusPill` owns domain status presentation; red is reserved for `CRITICAL`, while `ABSTAIN` is intentional and explicit.

The application is laptop-first. Mobile keeps one navigation drawer and converts dense tables into readable structured rows.
