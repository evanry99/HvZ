# Humans Vs Zombies (HvZ) backend part for Team HvZ.NET 


## Project Description
The goal of this project is to design and implement a software solution for managing the state and communication of one or more concurrent games of HvZ. For the frontend, an angular web application has been created to display all the different parts of the game and player states. The web application includes a landing page where all games are displayed, and a game detail page which displays the game info, a game map, a chat an functionality to register for a game and perform different actions. To ensure the security of the frontend, a Keycloak instance has been implemented.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Technologies
* Angular
* Typescript
* Visual Studio Code 2022
* SignalR
* Bootstrap
* Leaflet
* Keycloak

## Installation

Download and install:
* Visual Studio Code
* Node.js
* npm
* Angular Cli with:
```
npm install -g @angular/cli
```

## Usage
Usage guide:

1. Clone this repository with: 
```
git git@gitlab.com:experis-case/hvz-frontend.git
```

2. In the vs code terminal run:
```
npm install
```

3. To add your own API. Substitute the ApiURL in the environment folder, with your own ApiURLs

4. Then to run the program locally, in the vs code terminal run:
```
ng serve -o
```
+ This will open the webapp on http://localhost:4200/



## Contributing

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Technologies
* Typescript
* HTML
* CSS
* AutoMapper
* Keycloak
* Docker

## Installation

Download and install:
* Visual Studio Code
* Extensions
    * Angular
* Keycloak

In order to deploy keycloak run the following command in the terminal
```
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:21.0.1 start-dev
```
+ Now keycloak is running on docker an admin account has been created.

Go to [Admin Console](http://localhost:8080/) and login with username: admin, password: admin

After keycloak has been deployed, create a new Realm

Create a new client

In your newly created client, add "Valid Redirect URI" and "Web Origins". These can be set to the following link or your own websites links
```
http://localhost:4200/* and http://localhost:4200
```

In the same client, go to "Installation" and choose "Keycloak OICD JSON". Copy this and replace the keycloak.json files content with this code

## Contributing

* [Håvard Madland](https://gitlab.com/havardmad/ "Håvard gitlab")
* [Erlend Halsne Dahl](https://gitlab.com/Erlend-Halsne-Dahl "Erlend gitlab")
* [Sondre Eftedal](https://gitlab.com/SondreEftedal "Sondre gitlab")
* [An Binh Nguyen](https://gitlab.com/anbinhnguy/ "An gitlab")
* [Vilhelm Assersen](https://gitlab.com/Vilhelm-Assersen "Vilhelm gitlab")


