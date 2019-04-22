---
title: Getting Started with NextJS, Styled Components and Rebass
date: '2019-04-10'
categories:
    - Dev
    - JavaScript
    - React
    - CSSinJS
    - Boilerplate
    - NextJS
keywords:
    - developer
    - tech
    - javascript
    - react
    - nextjs
    - styled components
    - rebass
    - web development
description: A look into the inner workings of a boilerplate that was made with NextJS, Styled Components and Rebass.
---
> TL;DR I made a starter pack for someone who wants to get started with a server rendered [React](https://nextjs.org/) framework with the power of [Styled Components](https://www.styled-components.com/) and a standard component library in [Rebass](https://rebassjs.org/) to work with. You can fork or download this boilerplate [here](https://github.com/ulukfuni/nextjs-boilerplate) and jump right in and start coding.

This write up is going to be targeted at people who have experience already using React and want to write server-side rendered apps in React while using the styled components system of writing css-in-js and also using a primitive UI component library as a base for all components. I just word-vomited all the buzzwords and trends in the intro alone, so if I have not scared you off already, let's continue.

### Why Server Side Rendering

I learned about server side rendering when I first started learning to use the [Express](https://expressjs.com/) library in NodeJS. So I will try to put in my own words what I think it is from my own experience but everyone is welcome to google it and find out themselves.

Server side rendering is when the server that you are communicating with actually sends you the HTML and its fully rendered already, no need for the browser that you are using to do anything to get what it needs to show you. For example, when you get to your Facebook feed (first page after you login), you get the navigation bar at the top and some other navigation menus on the side before you even see any of your friends' post or ads that Facebook has targeted you with. The navigation stuff has been rendered on the server and sent to you first and that is why its the first for you to see and then the browser takes care of grabbing your friends' post for you to see.

So server side rendering helps with speed of delivering the content you want your users to see quickly. Another reason to use server side rendering is search engine optimization. Server side rendered sites are more easily crawlable by search engines like Google so your search rank should be a little higher (although I need to learn more about SEO to confirm this).

### Why [Styled Components](https://www.styled-components.com/)

Before React and the componentization of the web, I was doing CSS the old-fashioned way: writing all my css in one separate file for entire web applications. I did not know how much it sucked until I started implementing [SASS](https://sass-lang.com/) in my application. What a game-changer! Separate files can be imported into one file, mixins, nesting, variables. SASS made CSS so much more fun to write and solved the monolith of CSS in monolithic projects. And then came React and ways to write CSS in JS. Sure, there was a whole battle of inline-styles in JS vs. separate file of CSS vs. splitting out the CSS in the same file of the component but I really enjoy that there are all these different ways to style your application. Many more ways than just writing all your css into one file. So now we get to use another nuanced way to write css in your application: Styled Components. I enjoy this way of styling the most right now because you basically build in the styling into the component itself. No .css files needed. Here is an example:

```js
import styled from 'styled-components'

const Flex = styled(div)`
    display: flex;
    ${props => (props.boxShadow ? `box-shadow: ${props.boxShadow};` : null)}
    ${props => (props.height ? `height: ${props.height};` : null)}
    ${props => (props.center ? `justify-content: center; align-items: center;` : null)}
    ${props => (props.border ? `border: ${props.border};` : null)}
`

export default props => (
    <Flex {...props}>
        {props.children}
    </Flex>
)
```

Above, we have a customized div that can take props of height or box shadow or border and can be reused throughout your entire application if you wanted. You can add more conditionals to add more customizability to your div and basically eliminate writing css and just add the prop that you need. The pitfalls of styled components that I can see (so far in my experience), is with the use of pseudo selectors like :last and :nth. Not sure how to implement those just yet in styled components but by using javascript, that can be mitigated with some creativity. I am sure there are other pitfalls but I really like how styled components fits in with the react ecosystem.

### Why [Rebass](https://rebassjs.org/)

There are many component libraries that you can go with (i.e [Material](https://material-ui.com/), [Semantic](https://react.semantic-ui.com/), [React Bootstrap](https://react-bootstrap.github.io/) to name a few), but I like Rebass because of its small filesize and how well it works with Styled Components in order to extend its foundational components. Here is an example of using a Rebass component and extending it with Styled Components.

```js
import { Card as Base } from 'rebass'
import styled from 'styled-components'

const Card = styled(Base)`
    ${props => (props.border ? `border: ${props.border};` : null)}
    minHeight: 200px
`

export default props => (
    <Card {...props}>
        {props.children}
    </Card>
)
```
Using the Rebass Card component as a base, we can add more conditionals or css that we want on the Card component and make it our own.

### Awesome [NextJS](https://nextjs.org/) features I Like

One of my favorite features of NextJS is the file-system routing. There is a directory in your project called pages and each file in there is a pathname matching the filename (i.e. `/pages/blog.js` is served as `whateveryoursiteiscalled.com/blog`). This makes routing so simple and it comes right out of the box. The file-system routing also comes with automatic code splitting for each of your pages in the pages directory. What this means is the page will only come bundled with whatever you imported into your js file. This keeps the bundles that are served up to the browser smaller and other packages that you are not using on that actually file will not be served alongside saving you more space and increasing load speed.

Another feature that I really like in NextJS is the way it handles fetching data for pages from the server. Instead of doing this:

```js
componentDidMount() {
    api.fetch(url).then(res => this.setState({ data: res }))
}
```

and letting the browser handle the data fetch, NextJS comes with a method that you can use to offload the data fetch onto the server and pass it into your page as props. Here is the code for that:

```js
static async getInitialProps() {
    const res = await api.fetch(url)
    const data = await res.json()

    return { data }
}

constructor(props) {
    super(props)
    this.state = {
        data: props.data
    }
}
```

Now your page can have server loaded data already before the browser needs to do any data fetching.

Hope you enjoyed this write up and think about exploring all of these technologies whether together (which they all do so really well together) or separately. Again, you can fork or download this boilerplate [here](https://github.com/ulukfuni/nextjs-boilerplate) and jump right in and start coding.