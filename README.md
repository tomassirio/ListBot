<p align="center"><img src="https://cdn.pixabay.com/photo/2019/11/07/20/24/check-list-4609829_960_720.png" width="100" height="100" /></p>

<h1 align="center">LISTBOT</h1>

<p align="center">
  <a href="https://github.com/tomassirio/ListBot/graphs/contributors"><img src="https://img.shields.io/github/contributors-anon/tomassirio/ListBot"></a>
  <a href="https://github.com/tomassirio/ListBot/issues"><img src="https://img.shields.io/github/issues/tomassirio/ListBot"></a>
  <a href="https://github.com/tomassirio/ListBot/network/members"><img src="https://img.shields.io/github/forks/tomassirio/ListBot"></a>
  <a href="https://img.shields.io/github/stars/tomassirio/ListBot"><img src="https://img.shields.io/github/stars/tomassirio/ListBot"></a>
  <a href="https://img.shields.io/badge/Hacktoberfest-red"><img src="https://img.shields.io/badge/Hacktoberfest-red"></a>
</p>

A simple Discord Bot, written in Javascript to create Lists in every channel

Let's add everything we need on a community list!

![image](https://miro.medium.com/max/8512/0*1YAdWi5ruRiSQDas)


### :tada: Inspiration

![image](https://greatpeopleinside.com/wp-content/uploads/2017/09/inspiration-at-work.jpeg)

A couple of friends and me wanted to keep track of the movies 
we wanted to watch on our discord server, 
so I created ListBot to do that

### Add ListBot to your Discord Server

By clicking [here](https://discord.com/oauth2/authorize?client_id=747219085573750918&scope=bot) you can authorize ListBot to be used in your server


## Getting started

### Installation

Learn how create a Discord bot and get a valid token [here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).


### To get started locally, follow these instructions:

1.  Clone to your local computer using `git`.
2.  Make sure you have Node installed; see instructions [here](https://nodejs.org/en/download/).
3.  Make also sure that you have MongoDB installed; see instructions [here](https://docs.mongodb.com/manual/installation/).
4.  Create a copy of the `.env.example` file named `.env` and replace the placeholders with your bot token and MongoDB credentials
5.  Run `npm run` to install dependencies.


### Usage

Once the bot is running and connected to your discord channel and database
you can use the following commands

```sh
    * $add <component>: adds a component to the list
    * $help: shows you a message with the commands
    * $list: lists all the components in the channel's list
    * $log: a log of the versions
    * $poll: creates a poll on all the lists components
    * $random: gives you a random component
    * $remove <component>: removes the desired component
```

### Docker

For development, you can run ListBot using Docker and Docker Compose following this steps below:
- Adjust `.env` with yout bot token.
- Run `docker-composer up -d`. This will build all containers on the first run and will be in placed in background.
- If you want to see the logs, just type `docker-compose logs -f` or read all in **Portainer**
- If you want to stop, run `docker-compose down`

The docker-compose.yml file contain:
- **Mongo-express**: *For database manager.**
- **Mongo**: *The database itself*
- **Server**: *ListBot*
- **Portainer**: *To monitoring your container services, such as logs, restart and more.*
    - *You need to create a local user and password.*
    - *Next page you need to choose docker local environment and after that click connect.*

To connect on:
- Portainer: ***localhost:9000***
- Mongo-express: ***localhost: 8081***


### Contribution Guidelines:

 -  ***fork*** and ***clone*** this repository
 - Make a new branch using `git checkout -b change/username`
 - Commit the desired changes to that branch
 - Sign off your commits using `git commit -s -m w/signoff`
 - Push your changes to the branch and open a pull request.


### Contributors Hacktoberfest 2020:

 - [jledezma-mt](https://github.com/jledezma-mt)
 - [Fedelaus](https://github.com/Fedelaus)
 - [simonardejr](https://github.com/simonardejr)
 - [jsilvaigor](https://github.com/jsilvaigor)
 - [manishkrjha](https://github.com/manishkrjha)
 - [hpbonfim](https://github.com/hpbonfim)
 - [Akshansh99](https://github.com/Akshansh99)
 - [Aditya-ds-1806](https://github.com/Aditya-ds-1806)
 - [thelovekesh](https://github.com/thelovekesh)
 - [heyimalaap](https://github.com/heyimalaap)
 - [arthur-merlin](https://github.com/arthur-merlin)
 - [joy98](https://github.com/joy98)
 - [khai93](https://github.com/khai93)
 - [AkiaCode](https://github.com/AkiaCode)
 - [kojiadrianojr](https://github.com/kojiadrianojr)
 - [TheRealLunatite](https://github.com/TheRealLunatite)
 - [phamducquanptit](https://github.com/phamducquanptit)
 - [Carolini28](https://github.com/Carolini28)
 - [diogenesdauster](https://github.com/diogenesdauster)
 - [Add yours!](./CONTRIBUTING.md)
 
 
 ## Who Am I?
 Tomas Sirio
 
 Backend Dev at Ualá
 
 Buenos Aires, Arg
 
 [tomassirio@gmail.com](mailto:tomassirio@gmail.com?Subject=Tomas%20You%20Are%20Amazing!)
 
 [LinkedIn](linkedin.com/in/tomassirio)
