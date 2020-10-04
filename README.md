## LISTBOT

![build](https://travis-ci.org/pyymenta/spacecraft-cli.svg?branch=master)
[<img src="https://img.shields.io/github/contributors-anon/tomassirio/ListBot"/>](https://github.com/tomassirio/ListBot/graphs/contributors)
[<img src="https://img.shields.io/github/issues/tomassirio/ListBot"/>](https://github.com/tomassirio/ListBot/issues)
[<img src="https://img.shields.io/github/forks/tomassirio/ListBot"/>](https://github.com/tomassirio/ListBot/network/members)
![stars](https://img.shields.io/github/stars/tomassirio/ListBot)
![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-red)

A simple Discord Bot, written in Javascript to create Lists in every channel

Let's add everything we need on a community list!

![image](https://miro.medium.com/max/8512/0*1YAdWi5ruRiSQDas)


## Inspiration

![image](https://greatpeopleinside.com/wp-content/uploads/2017/09/inspiration-at-work.jpeg)

A couple of friends and me wanted to keep track of the movies 
we wanted to watch on our discord server, 
so I created ListBot to do that

# Getting started

## Installation

To get started locally, follow these instructions:

1.  Clone to your local computer using `git`.
2.  Make sure you have Node installed; see instructions [here](https://nodejs.org/en/download/).
3.  Make also sure that you have MongoDB installed; see instructions [here](https://docs.mongodb.com/manual/installation/).
4.  Create a copy of the `.env.example` file named `.env` and replace the placeholders with your bot token and MongoDB credentials
5.  Run `npm run` to install dependencies.

## Usage

Once the bot is running and connected to your discord channel and database
you can use the following commands

```sh
    * add <component>: adds a component to the list
    * help: shows you a message with the commands
    * list: lists all the components in the channel's list
    * log: a log of the versions
    * poll: creates a poll on all the lists components
    * random: gives you a random component
    * remove <component>: removes the desired component
```
## Docker

You can run ListBot using Docker and Docker Compose following this steps below:
- Adjust `.env` with yout bot token.
- Adjust `.env` by set the `USE_DOCKER_FOR_DEVELOP=true` config.
- Run `docker-composer up -d`. This will build all containers on the first run and will be in placed in background.
- If you want to see the logs, just type `docker-compose logs -f`
- If you want to stop, run `docker-compose down`

## Contribution Guidelines:

 -  ***fork*** and ***clone*** this repository
 - Make a new branch using `git checkout -b change/username`
 - Commit the desired changes to that branch
 - Sign off your commits using `git commit -s -m w/signoff`
 - Push your changes to the branch and open a pull request.
