---
title: Getting Started with TypeScript and NextJs
date: '2019-04-22'
categories:
    - Dev
    - JavaScript
    - React
    - TypeScript
keywords:
    - developer
    - tech
    - javascript
    - typescript
description: My experience with trying to integrate TypeScript into a react application.
---

> TL;DR I am an amateur when it comes to type systems as I came from JavaScript and PHP background, so this new must-type-everything-before-running is tedious and new to me. Learned a few things and made a starter guide to Typescript as it pertains to writing React code. Check out all code [here]().

So I was always curious about TypeScript and I wanted to make something with it to see all the gains I can make to my coding if I were to add it in to a project. Typescript is a typed superset of Javascript and it compiles to plain Javascript. So prior knowledge of Javascript is required, first and foremost.

On top of the javascript that you are coding, you have to declare a type for everything. At first, this was super tedious to me. Things like:

```js
const str = 'hello world'
let num = 8
let isClicked = true
let dontWantToType = 'whatever'
let things = [ 'ball', 'string', 'wool' ]
let numList = [ 1, 2, 3, 4 ]
let notSameThings = [ 'ball', 5, true ]
let obj = { stuff: 'stuff' }
const doThis = (things) => calculateStuff() + things
```

turn into

```js
const str:string = 'hello world'
let num:number = 8
let isClicked:boolean = true
let dontWantToType:any = 'whatever'
let things:string[] = [ 'ball', 'string', 'wool' ]
let numList:number[] = [ 1, 2, 3, 4 ]
let notSameThings:[string, number, boolean] = [ 'ball', 5, true ]
let obj:object = { stuff: 'stuff' }
const doThis = (things:string):string => calculateStuff() + things
```

TypeScript won't yell at you for missing a type declaration though (unless you made your IDE yell at you). No type declaration means no type checking and all the good stuff Typescript will help you so it would benefit you to type everything.

Some of type declarations are pretty straightforward for your variable declarations. Basically, after declaring the variable you just follow the variable name with a colon and the type that the variable is going to be.

The `any` type is your get-out-of-jail-free card but you should only use it if you have no idea what the type is going to be. This is probably the type you will be using the most if adding TypeScript to an existing project.

The `notSameThings` variable is typed as a Tuple. A tuple type is a way to type an array that has a fixed number of elements that are all not the same type.

For functions, if there are arguments, you have to declare a type for each argument. If the argument returns a value, you also have to declare a type for the return value.

If you have a long list of arguments, it can become too cumbersome to declare types. You can use interfaces for that. Interfaces are like objects that declare types for multiple things. For instance:

```js
interface Things {
    ball: string
    wool: string
    id: string
}
```
and then you can use it as so:
```js
const doThis = (things:Things):string => calculateStuff() + things.ball
```

You can also denote if a property in an interface is optional by adding a ? to the property name right before the colon. Like so:

```js
interface Things {
    ball: string
    wool?: string
    id?: string
}
```

This is as deep as I got into TypeScript in order to start integrating or building stuff. You can look at the official docs [here](https://www.typescriptlang.org/).

Lets jump into seeing if our new-found prowess in typing can help us with React.

I started with the [boilerplate](https://www.vietnguyen.site/getting-started-with-nextjs-styled-components-and-rebass/) I made. Next, you should install TypeScript and the types that the other libraries would require. Luckily, since we are arriving to the TypeScript movement late, there have been type libraries already written for each library we are using. If you are using the boilerplate, you need to do this:

```bash
npm install --save @types/next @types/react @types/rebass @types/styled-components @zeit/next-typescript typescript
```

Make a new file at the root of the project and call it next.config.js

```js
const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript()
```

Make another new file at the root of the project and call it tsconfig.json

```json
{
    "compilerOptions": {
        "allowJs": true,
        "allowSyntheticDefaultImports": true,
        "jsx": "preserve",
        "lib": ["dom", "es2017"],
        "module": "esnext",
        "moduleResolution": "node",
        "noEmit": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "preserveConstEnums": true,
        "removeComments": false,
        "skipLibCheck": true,
        "sourceMap": true,
        "strict": true,
        "target": "esnext"
    },
    "include": [
        "components",
        "pages"
    ],
    "exclude": [
        "node_modules"
    ]
}
```
The include section is for folders that will have TypeScript that you wanna compile down to javascript. The exclude is for what you want to exclude for compilation.

Last new file at the root of the project and call it .babelrc

```
{
    "presets": [
        "next/babel",
        "@zeit/next-typescript/babel"
    ]
}
```

and now you are ready to integrate TypeScript into your react code.

Here is an example of what a component thats using styled components could look like.

```jsx
import { Flex as Base } from 'rebass'
import styled from 'styled-components'

interface FlexProps {
    boxShadow?: string
    height?: string
    center?: boolean
    border?: string
}

const Flex = styled(Base)<FlexProps>`
    ${props => (props.boxShadow ? `box-shadow: ${props.boxShadow};` : null)}
    ${props => (props.height ? `height: ${props.height};` : null)}
    ${props => (props.center ? `justify-content: center; align-items: center;` : null)}
    ${props => (props.border ? `border: ${props.border};` : null)}
`

export default (props:any) => (
    <Flex {...props}>
        {props.children}
    </Flex>
)
```

Pretty simple. Adding an interface will make sure that the props coming in will only be those props. As for why I added the `any` type to the props on the export function, [Rebass](https://rebassjs.org/) has more props that can be added to the Flex component that will allow it to be do more (i.e. m for margin, p for padding) and I have yet to account for that, so get-out-of-jail-free AKA the `any` type.

Here is an example of using async/await with TypeScript:

```js
const fetchStuff = async (url:string):Promise<object> => {
    const res:any = await fetch(url)
    const data:object = await res.json()
    return data
}
```

Declaring a function to be an async function will in turn make the function into a Promise so we can declare that a promise will be returned and since we are returning a value back we can type the returned promise as an object when it resolves.

I am sure I am just scratching the surface of TypeScript but I am enjoying the process and learning as I go. You can look at a recent (at the time of this writing) [project](https://github.com/ulukfuni/card-game) that I was able to incorporate Typescript into.



