# Twitter clone or something
>[!IMPORTANT]
>Deployments to github-pages don't work, so to try my code you have to run it on your own machine.

## About

My project tries to be a some sort of clone for twitter. Main idea is that users can post tweets, comment them and like them. This is also the only implemented feature, and other features like, chat, friends,... will be probably added later.
I have created several users beforehand and with these you can only go through login.

| Email | Password | 
|----------|----------|
| eero@example.com | eero |
| william@example.com | william | 
| tuomas@example.com | tuomas | 

>[!NOTE]
>Server shutdowns itself when being unused -> loading during the login might take a while, about 2-4min



Techonologies used in this project are React, Typescript, Material UI, React Query. 

Backend code can be found [here](https://github.com/williamlempinen/tweets-java)

## Running locally

- Clone project
- Run `npm install`
- In the project's root directory create a file `.env`
- Add this to the `.env`-file : `VITE_API_URL=https://tweets-qmda.onrender.com/api`
- Run `npm run dev` to start project locally.
