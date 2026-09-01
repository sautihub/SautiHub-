# SautiHub

A mobile-first artist promotion website prototype.

## Run locally
Open `index.html` directly, or use a simple local server.

For the Node starter:
1. Install Node.js.
2. `npm install express axios dotenv`
3. Copy `.env.example` to `.env`.
4. Add your own Safaricom Daraja credentials.
5. Complete `/api/stkpush` and the callback handler with your approved Daraja setup.
6. Run `node server.js`.

The frontend currently shows an STK Push demo message; it does not send real payment requests until the backend is configured.
