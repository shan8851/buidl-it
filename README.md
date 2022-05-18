# 👷 BuidlIt 🛠️

## Motivation

Ever googled `Side project ideas`, `beginner app ideas` or some other version of those? Yeah, me too...

In fact this project come about because yet again I could not think of a project idea to build.

Well no more! **BuidlIt** is here.

_What's with Buidl?_

Buidl is pretty common in the web3 space, which is where I spend a lot of my time, plus good luck finding a build-it domain for under 5 figures...

## Built With

**BuidlIt** has a React frontend, styled with [Chakra UI](https://chakra-ui.com/) and uses [Apollo Client v3](https://www.apollographql.com/docs/react/) for managing all state and bits and pieces on the client.

I decided to use a graphql api, again leveraging apollo and nexus and it is in full typescript, which just makes developing a breeze. I should have definitely stuck with TS for the frontend too.

## Project Status

This is still very much a WIP and still in active development. Right now it has a very limited feature set, but, ship early and often they say!

Unauthenticated users can simply view all project ideas on the home page. At the moment each project is made up like so:

```
Difficulty (on of beginner, intermediate or advanced)
Title (required)
Description (required)
User stories (required)
```

Authenticated users can hit the `/my-projects` route and then have the ability to add project ideas. Once added the route will show any projects you have created and offer the option to delete.

## What's Coming?

Lots! I have a bunch of ideas and am all ears for anything else people would like to see. Here is some features I have in mind:

- Authenticated users should be able to edit their projects
- Any user should be able to upvote a project
- ~~Each project should have a difficulty rating~~ 🔫
- Sorting of projects by _date added_, _upvotes_
- Filtering of projects by _difficulty_

## Screenshots

![Screenshot 2022-05-17 at 13 06 48](https://user-images.githubusercontent.com/39712238/168807386-cc6cccda-a04e-44c9-8181-4c9d0242b208.png)
![Screenshot 2022-05-17 at 13 01 25](https://user-images.githubusercontent.com/39712238/168807407-08851348-0824-4229-bfe1-dd96ed884674.png)
![Screenshot 2022-05-17 at 13 00 30](https://user-images.githubusercontent.com/39712238/168807422-f06c40e7-7513-4572-a9de-f44d33ddbf8a.png)
![Screenshot 2022-05-17 at 13 06 59](https://user-images.githubusercontent.com/39712238/168807429-95c952ef-1bc8-406b-85f8-2b66b5a59d96.png)
![Screenshot 2022-05-17 at 13 12 23](https://user-images.githubusercontent.com/39712238/168808065-17e3380d-698f-47e3-8efe-715a366a974d.png)

## Reflection!

This started as a weekend project to get back in touch with the backend and building APIs after mostly focussing on the client side for the past few years. I really enjoyed getting my hands dirty there again, so have decided to put a bit more time into this and build out some more of the features above.

I want to continue the learning experience so I also plan to do some/all of the following:

- Migrate client to Typescript
- Tests
