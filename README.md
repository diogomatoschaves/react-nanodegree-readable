# Readable Project - Udacity's React Nanodegree 2nd Project

This project is a fork of the Readable starter repo (https://github.com/udacity/reactnd-project-readable-starter),
and encompasses the implementation of all the functionality as per the project's requirements.

The app is a user interface for viewing, adding, editing and deleting posts pertaining to particular categories, as well as
viewing, adding, editing and deleting comments of existing posts. It also has a vote system where the user can vote or
upvote particular posts or comments. The app presents a main view that lists all exisiting posts, and has a side menu
where the user can choose to view posts of a particular category. The posts can be sorted by date or by vote score.

The app's functionality was implemented with React and Redux.

## Prerequisites

You need to have npm installed on your computer.

## Installing & Usage

This repo is split between the server api and the frontend. In order to run the app you'll need to run npm install
on each subdirectory (api-server and frontend). You can check out the README on the api-server directory for more
details about the server.

### Install Server dependencies and run server

In order to install the server dependencies as per `api-server/package.json`, run the following commands on your terminal:

`cd api-server`
`npm install`

In order to start the server, run:

`node server`

### Install Frontend (React App) dependencies

In order to install the frontend dependencies as per `frontend/package.json`, run the following commands on your terminal:

`cd frontend`
`npm install`.

In order to start the development server, run:

`npm start`

## Authors

* Diogo Matos Chaves