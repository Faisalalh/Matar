# Matar Bin Tartan Real Estate — Financial Workbench

A single-page bookkeeping tool for a property office. Drop in a bank statement
(Excel or CSV) and it categorises every line, reconciles paperwork against the
bank, shows the totals, and projects the next twelve months.

**Live:** https://faisalalh.github.io/Matar/

Everything runs in the browser. The ledger is stored in that browser's own
storage and never leaves the device — this repository contains the application
only, never any financial data.

Built from the workbench in the private RAKIB repository; `index.html` is the
compiled output of `scripts/build-app.mjs` (interface, engines, SheetJS,
Chart.js, Tailwind and the two typefaces, all inlined). It makes no network
requests.

Reading photographed or PDF invoices needs the desktop version, which holds an
API key; Excel and CSV statements are read here in the browser.
