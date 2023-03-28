# Humans Vs Zombies (HvZ) frontend part for Team HvZ.NET 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Table of content
- [Background](#background)
- [Development server](#development-server)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)


## Background

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

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

Now keycloak is running on docker an admin account has been created.

Go to [Admin Console](http://localhost:8080/) and login with username: admin, password: admin

After keycloak has been deployed, create a new Realm

Create a new client

In your newly created client, add "Valid Redirect URI" and "Web Origins". These can be set to the following link or your own websites links
```
http://localhost:4200/* and http://localhost:4200
```

In the same client, go to "Installation" and choose "Keycloak OICD JSON". Copy this and replace the keycloak.json files content with this code

## Usage

To add your own API. Substitute the ApiURL in the environment folder, with your own ApiURLs

## Contributing

* [Håvard Madland](https://gitlab.com/havardmad/ "Håvard gitlab")
* [Erlend Halsne Dahl](https://gitlab.com/Erlend-Halsne-Dahl "Erlend gitlab")
* [Sondre Eftedal](https://gitlab.com/SondreEftedal "Sondre gitlab")
* [An Binh Nguyen](https://gitlab.com/anbinhnguy/ "An gitlab")
* [Vilhelm Assersen](https://gitlab.com/Vilhelm-Assersen "Vilhelm gitlab")


