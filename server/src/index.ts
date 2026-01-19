/*
  - src/index.ts
    - backend entry point
    - loads environment
    - initialises core services (db, auth)
    - wires middleware, routes
    - starts http server (app.listen)
    - fail fast if bootstrapping fails (fail fast = fast crash when critical err)
*/

import connectDB from "./config/db";
import env  from './config/env';
import app from './app';
import { initFirebase } from "./config/firebase";

connectDB();
initFirebase();

// LISTEN
const PORT = Number(env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
