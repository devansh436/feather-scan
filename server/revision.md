- models/   → what data looks like  
- routes/   → how HTTP reaches the app  
- controllers/ (optional) → what happens  
- config/   → how app is wired  

---

## 0. src/middleware
- client => middleware => route handler  
- gateway that allows/denies access to backend apis  
- two jobs:  
  i. Verify client id token with firebase server  
  ii. Mount decoded token on HTTP request for downstream use  

---

## 1. src/config/
- code that wires the app together  
- configuration files are:  
  - loaded once and do not change after initial setup  
  - depend on env variables  
  - eg. connect db, init firebase
### i. db.ts
- connects to mongodb cluster using URI string via mongoose  
- exports the function -> used by index.ts
### ii. firebase.ts
- initalises firebase app (admin) using serviceAccountKey.json  
- exports 'admin' object -> used by middleware & services  

---

## 2. src/models/
- defines domain data (not behaviour)  
- blueprint of data  
- eg. db schema, interfaces, etc.  
- /History.ts => defines schema via mongoose & exports  
- exports used by routes to perform db operations (here)  

---

## 3. src/routes/
- contains files that define api endpoints  
- xyz.ts -> all apis related to xyz entity  
- src/routes/history.ts  
  - defines all endpoints related to history entity (post, del, get, etc.)  

---

## Pagination (v.imp)
- implemented in `src/routes/history.ts` get request  
- Simple: Instead of fetch 50 records at once, send in chunks of 10  
- Only show 10 records on a page and fetch only 10  
  - Next page -> next 10 records and so on  
- prevents unbounded DB reads & keeps APIs scalable  
- Pros: reduced latency, better UX, lower DB & server load  
