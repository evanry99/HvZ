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

## Contributing

* [Håvard Madland](https://gitlab.com/havardmad/ "Håvard gitlab")
* [Erlend Halsne Dahl](https://gitlab.com/Erlend-Halsne-Dahl "Erlend gitlab")
* [Sondre Eftedal](https://gitlab.com/SondreEftedal "Sondre gitlab")
* [An Binh Nguyen](https://gitlab.com/anbinhnguy/ "An gitlab")
* [Vilhelm Assersen](https://gitlab.com/Vilhelm-Assersen "Vilhelm gitlab")





## Project Description
The goal of this project is to design and implement a software solution for managing the state and communication of one or more concurrent games of HvZ. For the backend, a suitable database has been created using a code-first approach, and a RESTful API service has been developed to allow the frontend to interact with the database. To ensure the security of the backend, a Keycloak instance has been implemented. The database and API are deployed in Azure.

The RESTful API includes seven main API fields: Chat, Game, Kill, Mission, Player, Squad, and User. Documentation for each API endpoint and instructions on how to use them are provided in the GitLab project.

## Usage
Usage guide:

1. Clone this repository with: 
```
git clone git@gitlab.com:experis-case/hvz-frontend.git
```
