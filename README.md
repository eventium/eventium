# Eventium


## Team:
======
**Team Name**: 
Callback Hell
**Team Members**:
- Oleg Matvejev (omatveje@sfu.ca && omatveje@gmail.com)
- Eric Nummela (enummela@sfu.ca && enummela@gmail.com)
- Tian Lin Tan (tianlint@sfu.ca && cyrus9212@gmail.com)

## Usage:
======
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

## Comments
======
#### Overview:
For the most part we have achieved most of our original goals with core features being production ready. Having said that, we do have some bugs and additional features that we would have liked to fix or implement, but were unable due to the time constraint.

For more information on some of the outstanding issues please see our issue tracker located here: https://csil-git1.cs.surrey.sfu.ca/callback-hell/eventium/issues

#### Testing:
For complete testing guidelines (including test accounts) see README.MD inside /test/ folder.

#### Features:
* Server side rendering
* Stateful application through the use of Redux
* Real Time chat is achieved using Socket.IO
* Using debounce() function to provide a fluent real time UI feel when user invites a new member to an event
* The bundle.js is minified and compiled using Webpack
* Universal ES6 using babel
* Custom express middlewares to authenticate API calls
* Passwords are encrypted using Bcrypt
* Automatic Event and Profile image uploads which are then served using Nginx
* Persistent sessions with expiry set to 10 minutes
* Custom database provision tool that sets up data
* Code linting using ESlint

## Architecture Overview:
======
### Backend
* Node/Express
* React/Redux/React-Router - Server Side Rendering
* socket.io

### Frontend
* React/Redux/React-Router
* Bootstrap

### Minification
* Webpack
* Babel - To Provide Universal ES6 support

### ORM
* Sequalize

### Database
* PostgreSQL

### Static Content Server
* Nginx

## Development
======
1. `git clone git@csil-git1.cs.surrey.sfu.ca:callback-hell/eventium.git`
2. `vagrant plugin install vagrant-notify-forwarder` - Used to notify vagrant when file changes
3. `vagrant up`
4. Once vagrant done setup open two terminal windows.

#### Terminal Window #1:
1. cd eventium folder
2. `vagrant ssh`
3. `cd /home/eventium && npm run start:dev`

#### Terminal Window #2:
1. cd eventium folder
2. `vagrant ssh`
3. `cd /home/eventium && npm run build:dev:watch`

Doing this will ensure that your node server gets restarted on file save and a new bundle.js file is generated.

You might also want to install React browser dev tools which can be found here: http://bit.ly/1dGLkxb

#### Linting
We're using airbnb eslint style. The guide bellow will outline on how to install eslint in your Sublime Text

1. Install Package Control `https://packagecontrol.io/installation`
2. Press Command-Shift-P (Mac OS X) or Ctrl-Shift-P (Windows) to open the Command Palette.
3. Start typing Package Control until you see the appropriate commands.
4. Select Package Control: Install Package
5. Install SublimeLinter
6. Install SublimeLinter-contrib-eslint
7. Install eslint according to https://github.com/roadhump/SublimeLinter-eslint

To install eslint globally (works on windows), run npm install -g eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

If installing eslint in local project, make sure that your sublime eslint path points to node_modules/.bin/eslint




