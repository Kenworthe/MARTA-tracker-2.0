# Welcome to MARTA-Tracker!
By: [Kenneth Lin](https://github.com/Kenworthe), [Van Moncrieff](https://github.com/vanmoncrieff), and [Ramata Diallo](https://github.com/ramata).

### Description

MARTA-Tracker is a mobile-first, SPA built with Angular 1.5 and Node.js. This app uses MARTA's realtime rails API in order to track train ETAs, and allows users to save favorite stations, saving them time for their next trip!

  **Check it out on [Heroku](http://marta-tracker.herokuapp.com/)!**

### Features

* Mobile-first design: this app was built for commuters on the move!
* Search bar with station auto-filter
* Live-ticker showing realtime updates of train ETAs
* Quick Favorites - save stations then quick swap between Live-ticker views!
* User signup/login

### Upcoming Features

* Geolocation
* MARTA bus realtime location tracking with Google Maps API
* Alerts for any delays or rail incidents
* Forgot my password prompt

### Technologies Used

**Frontend Framework**
* Angular 1.5
* Angular UI Router

**Server**

* Node.js
* Express

**Database**
* MongoDB
* Mongoose

**Middleware**
* Passport and Bcrypt
* Request

**Third-party APIs**

* MARTA Rails Realtime API

**Hosting**
* Heroku
* mLab

**Source control & Project Management**
* Git/Github (https://github.com/Kenworthe/MARTA-tracker)
* Trello (https://trello.com/b/JWd3h5gV/marta-scheduler)

### Notes

* We envisioned this app to be a platform for users to track Marta's ETA and know exactly its schedule.
* Originally planned to use both MARTA rails AND bus API.  However, the bus API did not contain ETA, and proved to not be too useful.
   * Therefore, we had to cut MARTA bus from the project.
* Architected the app first by building services (each controller or component will rely on them!)
* Mongoose models: both a Favorite and a User Schema.
* Passport is currently used for authentication, but we would like to swap to JWT (better control over AuthZ during state changes).
* user-service.js contains a service which persists user info across controllers. However, it has been suggested to switch this to a factory. Looking into this.
* Initially wanted to front-load the app as much as possible. Testing limits of what Angular can do. 
   * Ran into major CORS error when Angular service was trying to directly call MARTA rails and bus API.
   * Resolved this error by building a "proxy" route in our Express server, which does the calling to MARTA rails server-side, then passes the data to Angular when Angular calls our "proxy" route.
* Also ran into a wall when we were trying to get User data from Express to Angular.
   * Resolved this by creating a "user route" which is essentially a custom API endpoint which authenticates and sends user info as a res.json.

* **IMPORTANT** If you want to fork and test this repo, you will need to add the following files in order to access MARTA Rails API:

              // in project directory:
              touch secret.js
              open secret.js
              
              // then add: 
              var secret = {
                API_KEY :   // add your Marta Realtime Rails API key here 
                            // OR contact me and I can send you mine!
              }
              
              module.exports = secret
              
