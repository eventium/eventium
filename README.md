# Eventium


## Team:
---
**Team Name**: 
Callback Hell
**Team Members**:
- Oleg Matvejev
- Eric Nummela
- Tian Lin Tan (ultramailman)

## Usage:
---
#### Windows
1. Install Git Bash (https://git-scm.com/download/win)
2. **IMPORTANT**: Run Git Bash in Administrative mode!
3. `git clone git@csil-git1.cs.surrey.sfu.ca:callback-hell/eventium.git`
4. `git checkout checkpoint`
5. `vagrant up`
 
#### OSX/Linux:
1. `git clone git@csil-git1.cs.surrey.sfu.ca:callback-hell/eventium.git`
2. `git checkout checkpoint`
3. `vagrant up`

Access the website at: `http://locahost:3000/`

## Development
---
1. `git clone git@csil-git1.cs.surrey.sfu.ca:callback-hell/eventium.git`
2. `vagrant plugin install vagrant-notify-forwarder` - Used to notify vagrant when file changes
3. `vagrant up`
4. Once vagrant done setup open two terminal windows.

Terminal Window #1:
1. cd eventium folder
2. `vagrant ssh`
3. `cd /home/eventium && npm run start:dev`

Terminal Window #2:
1. cd eventium folder
2. `vagrant ssh`
3. `cd /home/eventium && npm run build:dev:watch`

Doing this will ensure that your node server gets restarted on file save and a new bundle.js file is generated.

You might also want to install React browser dev tools which can be found here: http://bit.ly/1dGLkxb

## What we have done
---
Our application requires many services on the back end, so that's where the majority of our progress has been made. One big features that we want to pursue with this project is server side rendering to have the “universal javascript”. This ended up being a lot more challenging to set up as many individual components must be linked together to get the app running on both the frontend and backend. Finally, our group spent a lot of time learning React and Redux to understand this new convention of building web apps.


## App Structure & Dependencies
---
#### App:
* Redux - To store states
* React Routes - To make routing easier and have history
* React-Redux - To connect react with redux
* React-dom - To render react components on the server
* Webpack - To bundle everything together in a bundle.js
* Babel - To have both react and ES6 on the frontend
* Express - For server side rendering and API
* Sequalize - ORM
* Bootstrap - For the frontend css

#### Database:
* PostgreSQL

#### HTTP Server:
* Nginx - We’re not actually using this yet.


