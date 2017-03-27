
# Eventium


## Team:

**Team Name**: 
Callback Hell

**Team Members**:
- Oleg Matvejev
- Eric Numella
- Tian Ling (ultramailman)

## Usage:

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

Useful commands:
- `npm start` : Will start the node server
- `npm run build` : Will bundle the app into bundle.js
- `npm run populate` : Will populate db with basic data

## What we have done

Our application requires many services on the back end, so that's where the majority of our progress has been made. One big features that we want to pursue with this project is server side rendering to have the “universal javascript”. This ended up being a lot more challenging to set up as many individual components must be linked together to get the app running on both the frontend and backend. Finally, our group spent a lot of time learning React and Redux to understand this new convention of building web apps.


## App Structure & Dependencies

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


