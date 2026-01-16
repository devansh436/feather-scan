# Backend Architecture Revision

## Directory naming convention
- models/   → what data looks like  
- routes/   → how HTTP reaches the app  
- config/   → how app is wired  
- utils/    → utility functions
- controllers/  → what happens  

---

## 0. src/middleware
- client => middleware => route handler  
- gateway that allows/denies access to backend apis  
- two jobs:  
  a. Verify client id token with firebase server  
  b. Mount decoded token on HTTP request for downstream use  

---

## 1. src/config/
- contains & exports code that wires the app together  
- config files are:  
  - loaded once and do not change after initial setup  
  - depend on env variables  
  - eg. connect db, init firebase, etc.
  ### 1.1. db.ts
  - connects to mongodb cluster using URI string via mongoose  
  - exports the function -> used by index.ts
  ### 1.2. firebase.ts
  - initalises firebase app (admin) using serviceAccountKey.json  
  - exports 'admin' object -> used by middleware & services  

---

## 2. src/models/
- defines domain data (not behaviour)  
- blueprint of data  
- eg. db schema, interfaces, etc.  
- History.ts => defines schema via mongoose & exports  
- exports used by routes to perform db operations

---

## 3. src/routes/
- contains files that define api endpoints  
- xyz.ts -> all apis related to xyz entity  
- src/routes/history.ts  
  - defines all endpoints related to history entity (post, del, get, etc.)  

## 4. src/controllers/
- contains files that define business logic
- "what happens when this api is called?"
- read VALIDATED input -> apply rules -> talk to models/external services -> return responses
- pure logic, NO config/schema/middleware/auth/validation

---


# Frontend Best Practices

## 1. src/services/api.js
- contains all fetch calls and exports functions
- the only place that knows how to talk to backend
- single source of truth, single base url, DRY

---

# Other imp concepts

## Pagination (v.imp)
- implemented in `src/routes/history.ts` get request  
- Simple: Instead of fetch 50 records at once, send in chunks of 10  
- Only show 10 records on a page and fetch only 10  
  - Next page -> next 10 records and so on  
- ""prevents unbounded DB reads & keeps APIs scalable""
- Pros: reduced latency, better UX, lower DB & server load  


## Indexing
- server/models/History.ts
- index history entity on userId & time created
- frequently call: `History.find({ userId: "xyz" }).sort({ createdAt: -1 })`
- thus, indexing on userId -> fast retrieval


