---
title: HoopSim Devlog #1
date: '2026-03-02'
categories:
    - dev
    - sports
    - entrepreneur
description: The origin of HoopSim—a simulated fantasy basketball platform—and the stack I'm using to build it.
keywords:
    - developer
    - tech
    - devlog
    - product
    - hoopsim
    - fantasy basketball
    - simulation
---

![HoopSim hero - basketball hoop with simulation and tech elements](hero.jpg)

I first got the idea for this app while traveling to Asia this past winter. Being away from the computer let me actually rest the mind and let it wander for once. And I had time for writing. So I wrote, traveled, ate and just rested and came back rejuvenated.

## How I learned to build with AI

The landscape of development changed with the seasons. I remember in the middle of summer last year (2025), I was attempting to one-shot prompts and *~vibe code~* and it just would not work out at all. Approaching winter of 2025 and with my vacation in sight, AI tools were actually getting better and better as more models came out and more tools came out as well. I was using Cursor for side projects and Augment at work. I always liked Cursor and it seemed to work within my workflow better than Augment. A few months at work and Augment had caught up to where Cursor was and even had some things that Cursor lacked (mainly the enhance prompt action worked wonders for dev work).

Enter plan mode in Cursor. This thing turned my prompts from vague shots in the dark and barely any context for the agent to fully fleshed out plans. AI definitely was able to actualize what I was describing. I also learned that I should be trying to one-shot an entire app. I learned to plan and become more detailed and learned how to prompt. I also learned how to break down complexity and use AI to brainstorm. Things were moving fast and the old ways of development were giving way.

## The research phase

So when I got back from Asia, I started a long research phase. How did I want to structure the project, what technologies did I want to use, how much did I want to experiment with, costs, etc. I actually have never done this before for one of my projects. Which is quite weird because at work (I work as a software engineer at a startup), we would have sprints, ceremonies, organized tickets with requirements, just all the efficiencies afforded to get work done in the agile methodologies. Shouldn't I use what I learned at work for my own side projects as well?

## What is HoopSim?

This is something I came up with while trying my best to manage as commissioner a fantasy basketball league on the Yahoo Fantasy platform while 13 hours ahead due to timezone differences. What if we do away with time constraints in the fantasy platform? What if, also, we do away with injuries as well? The last pain point was what if we got rid of the long long season of the NBA, essentially the grind.

That led me to the idea of replacing all the pain points with algorithms/simulations. Basically taking the reality out of the fantasy. With simulations, we can turn injuries in the simulation off. With algorithms, we can simulate entire weeks, even seasons if we wanted to. No more grinding. No more waiting for boxscores. Just strategy uninterrupted and streamlined.

This idea stuck in my head and traveled with me to S. Korea and Japan and then back to the States. I told myself if I can build a quick version of it with AI, I would pursue this until its something that I am proud of. You can check it out at [hoopsim.xyz](https://hoopsim.xyz).

## Tech stack

So tech stack I am working with is Vite/React/Typescript/TailwindCSS/[DaisyUI](https://daisyui.com) for the front end and [Convex](https://convex.dev) for the backend. This is my first time working with Convex and what drew me to it was Convex was marketed as an AI first or AI Agent friendly backend. I was also intrigued by its sync engine capability. I have never worked with sync engines before but I believed it to be a good idea with all the data going back in forth from DB to FE.

## UI and UX for now

I have been playing fantasy basketball for a number of years and the only UI I have really used a bunch and am used to is Yahoo's. I am no designer and I am also not an expert of UX so the UI patterns of Yahoo will have to do before we get to user testing (done by me probably).

## The big hurdle

The biggest test/hurdle will be tweaking and tuning player generation and the simulation algorithm of a basketball game. Do I need some time in data science or machine learning to crack any of this? I guess we will have to find out. Let's keep moving forward.
