# Project Negative Impact
## Overview
Team Name: Negative Impact. \
Socially conscious travel website.
* Calculation of pollution based on distance traveled/planned to travel, and by type of travel.
* Propose alternative travel methods that cause less pollution to user based on type input (plane worse than car, etc).
* User inputs destination/departure area, distance calculated by program.
## Team Members
* [Colin (asymmetriad)](team/colin.md)
* [Qian](team/qianwenhu.md)
* [Jiachao](team/Jiachao_Chen.md)
* [Nathan Duarte](team/nathan_duarte.md)
## Topic Requirements
1. Database (MongoDB)
2. HTTP Server (Express.js)

# Setup
You need the latest stable versions of these programs:
* MongoDB
* npm
* node

In addition, you need access to the auth0 API and the HERE API.

# Instructions
Open up a terminal in the root directory of the project and
type this in to install the dependencies locally.

```
npm install
```

Create a file called .env and do not check it into git.
Type in something like this:

```
AUTH0_CLIENT_ID=YOUR_CLIENT_ID
AUTH0_DOMAIN=localhost:3000
AUTH0_CLIENT_SECRET=YOUR_CLIENT_SECRET
CUST_SECRET='veryrandomsecret'
```

Now in the same directory type this in to launch the server:

```
npm run devStart
```

Now, open up a web browser and enter http://localhost:3000 in the URL bar.
