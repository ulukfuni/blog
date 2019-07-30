---
title: Getting Started With GraphQL
date: '2019-07-30'
categories:
    - JavaScript
    - GraphQL
    - Learning
keywords:
    - javascript
    - nodejs
    - graphql
    - coding
    - apolloserver
    - learning
description: Trying to learn GraphQL. You probably have seen this buzzword around the Tech Interwebs sooner or later.
---

![graphs but we are dealing with code though](graph.jpeg)

So if you haven't heard, GraphQL is the newest kid on the block (I might just be late, it's the newest kid on MY block anyway).

So for those who do not know, GraphQL is a specification for building APIs just like REST (more familiar with this) and SOAP (no idea what this is). Whereas in REST you are using CRUD methods (HTTP GET, POST, PUT, DELETE), for GraphQL, you are using a query language to do your CRUD methods.

The reason I wanted to try GraphQL was because this very blog that you are looking at is running using GraphQL queries to serve this content. I wanted to understand the underlying parts.

I really just dove in and grabbed a [tutorial](https://letslearngraphql.com) (pretty good tutorial as there are videos and github code examples) and just started seeing what the code looked like and how it all works. It is a fairly different experience and paradigm to get used to.

I wrote some [code](https://github.com/ulukfuni/learn-graphql) in JS to mess around with GraphQL so lets break it down a little.

We will be using [ApolloServer](https://www.apollographql.com/docs/apollo-server/) because it includes the Apollo Playground (where you can enter queries) which is pretty awesome to test your API and it is well documented.

To create a server in Apollo Server is super simple:

```js
const { ApolloServer } = require('apollo-server')
const server = new ApolloServer({
    typeDefs, // will get to these in a second
    resolvers
})
server.listen().then(data => console.log(`server started at port ${data.port}`))
```

So first off, you have to type everything in GraphQL. The API will probably break if this is not done and not done properly. So setting up and understanding your schemas is pretty key. The `typeDefs` and `resolvers` will define a schema and methods to query your data.

To define your types, you will have to write in gql (graph query language) and luckily it's bundled with ApolloServer.

```js
const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type House {
        houseName: String!,
        members: [Member!]!
    }
    type Member {
        # member name
        name: String!,
        # whether they are the leader or not
        leader: Boolean,
        # to show how to add properties that are not in the info
        favorite: Boolean,
    }
    type Query {
        allHousesInfo: [House],
        member(name: String!): Member,
        getLeaders: [Member]
    }
`
```

It is seemingly like object notation in JS but you need to use the word `type` before each definition. The default scalar types you can use in GraphQL is `String`, `Int`, `Float`, `Boolean`, and `ID`.

To define an array, you can just wrap a scalar or a type  in a [] (i.e. [String]).

The ! you see defines that the property is non-nullable which means that a value will return that is not null and it is required in the schema.

So that is a little primer into the very basics of type definitions but looking through the [docs](https://graphql.org/learn/schema/), I haven't even touched the surface (interfaces, enums, inputs!?!?!).

After setting the type definitions, we will move onto the resolvers which are basically our methods to grab our data.

```js
const resolvers = {
    Query: {
        allHousesInfo: () => threeHouses,
        member: (parent, params, ctx) => {
            if (params.name) {
                const member = threeHouses.map(house => {
                    return house.members.filter(member => {
                        return member.name.includes(params.name)
                    })
                }).flat()[0]
                if (!member) return 'member'
                if (member) return member
            }
        },
        getLeaders: () => {
            return threeHouses.map(house => {
                return house.members.filter(member => {
                    return member.leader
                })
            }).flat()
        },
    },
}
```

So the `threeHouses` data is imported from another source but its an array of objects that contain an array of objects.

So the resolvers is just an object of functions that return the data that you want. The cool thing about Apollo Server or maybe other tooling around GraphQL does this as well, but you never call these functions. What you do instead is you pass a query object to specify which function you are going to use and then you further have to specify what fields of the schema that you want from the data that you want.

Here is an example query:
```js
query {
    allHousesInfo {
        houseName,
        members {
            name,
            leader
        }
    }
}
```
So you choose the function and then you specify the fields you want. So `houseName` is not necessary in this query but if you want it, you can have it. The query above is probably synonymous to sending a GET request to /api/allHousesInfo and returning a json of all the houses. What GraphQL can do is return only the data you are requesting. For example, if you only wanted the member's names of each house, the query object you would send is:

```js
query {
    allHousesInfo {
        members {
            name,
        }
    }
}
```
In REST, you would have to write some another route and another function to achieve this so therein lies the power of GraphQL.

The second function `member` returns a member by name and the query you would send is this:

```js
query {
    member(name: "Claude von Riegan") {
        name,
        leader
    }
}
```
Again, you can specify the fields you want to see.

So those are the very basics of getting a GraphQL server up and running and how to write the queries to get your data. It is a very interesting way to build APIs in my opinion as I have only had experience build REST APIs.

I did not get too far in yet as I have not touched on how to connect to databases or other APIs, how to POST or PUT data or even how to consume the API in the frontend space. Probably articles for another time as I build out this test API further to include those.

So for this particular mess-around of code, I wanted to use the newest [Fire Emblem game](https://www.nintendo.com/games/detail/fire-emblem-three-houses-switch/) as data because I have been playing it nonstop and it is the only thing on my mind as of right now. For those who do not know, Fire Emblem is a Nintendo strategy role-playing video game series with an emphasis on medieval fantasy with themes of war. I will playing around and updating this [repo](https://github.com/ulukfuni/learn-graphql) as time goes along with more data and more functions.

