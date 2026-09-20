---
title: Can You Swap Your LLM for Jev?
date: '2026-09-20'
categories:
    - dev
    - ai
    - typescript
description: I measured swapping TypeSafe AI's Jev into a resume studio. This is what happened
keywords:
    - jev
    - typesafe
    - llm
    - system-one
    - structured-output
    - resume
---

> TL;DR: I swapped three decision-shaped calls in my resume studio over to TypeSafe's Jev and measured it. Against a cheap Gemini model, Jev came out about 3× faster (215 ms vs 713 ms), not 200×. The swap that mattered most replaced no LLM at all: it replaced a keyword matcher that labeled a Senior Nurse an operating room nurse, because "or nurse" sits inside "**senior nurse**".

The internet went abuzz this week when [TypeSafe AI](https://typesafe.ai/) announced their new model, Jev. It's definitely a bit different from text in, text out AI we have been using for the past year+.

From reading the [docs](https://docs.typesafe.ai/introduction) and other materials, looks to be fast and cheap which I really am for so I tried using Jev as a replacement for some things in a product that uses AI.

## What Jev is, briefly

For those who don't know: Jev is what TypeSafe calls a System One model, named after the Kahneman thing, fast automatic judgment. It reads in English language but does not write any back. You hand it a `state`, meaning your context, plus typed questions, and you get typed answers back with probabilities attached. Questions come in three shapes: Choice for one-of-a-set, Score for a rubric, and Noul (their word for a yes/no question, which returns a probability between 0 and 1). Every question in a request shares the same state, so asking twenty-five things is one round trip.

So its not a clean change to use like changing a model in Cursor.  Context moves into `state`, and the thing you were hoping to read out of the JSON becomes an explicit question with an explicit answer space. Input is $0.042 per million tokens. The API still reports output tokens but they are not billed. Their pitch is in the [intro post](https://typesafe.ai/blog/introducing-system-one-models-and-jev) and the [docs](https://docs.typesafe.ai/introduction.md).

## How I measured

The product is the Resume Studio on [Nurse Remotely](https://www.nurseremotely.com/jobs). It takes a nurse's resume, tailors it against a job description, and runs mock interviews (just released this feature as of this past weekend). I moved three calls over and benched them against the real production code paths, thirty samples each, on 2026-09-19.

Models were `jev-1.13.0` and `gemini-3.1-flash-lite`, the cheap fast Gemini tier.

[TypeSafe's intro post](https://typesafe.ai/blog/introducing-system-one-models-and-jev) publishes 70 to 500 ms typical latency, and a 193.6× faster homepage figure that the same post calls the high end of real world gains. Those are their numbers on their evals. Mine came out at about 3× against Gemini Flash-Lite.

| Call | p50 | p90 | max |
| --- | --- | --- | --- |
| Jev, interview judgments | 215 ms | 294 ms | 465 ms |
| Jev, role matrix fit | 226 ms | 321 ms | 847 ms |
| Jev, bullet grounding | 200 ms | 258 ms | 281 ms |
| Gemini, generative answer evaluation | 713 ms | 882 ms | 892 ms |

Note the role matrix row: great p50, 847 ms max. Quoting p50 alone would hide a fat tail.

## Case 1: the mock interview

The old flow called Gemini on every answer. One request did two jobs: decide whether to follow up or advance, and write the follow-up. Every turn paid for a generation even when the answer was already complete.

Now Jev judges the answer instead. Eight judgments in one request, against the STAR shape interview coaches ask for, meaning situation, task, action, result.

Tokens went up. The judgment request carries the question, the answer, the resume, and the job description, exactly what the generative evaluation carried. Jev bills more input on a complete turn, 1,569 tokens against Gemini's 1,246. I replaced a guaranteed generation every turn with a guaranteed judgment, plus a generation only when one is warranted.

Cost still went down against published paid Gemini prices, because Jev input is roughly six times cheaper per token and its output is not billed. On the published paid numbers: the old path was $0.000391 per turn, always. The new one is $0.000066 for the judgment plus the probe rate times $0.000373. Break-even sits near an 87% probe rate, and at 100% the new path is worse, $0.000438 vs $0.000391.

To get a probe rate I hand-wrote 34 nursing answers with deliberately mixed quality. 16 got probed, so 47%, which works out to about 38% cheaper per turn.

So somewhat good but its not clean.

## Case 2: keywords versus Jev, which is the actual point

This one replaced no LLM at all. It replaced a local list of keyword aliases scoring which nursing specialties a resume claims, what I call the role matrix.

The alias `"or nurse"` substring-matches "seni**or nurse**". So a Senior Nurse at an outpatient primary care clinic, with no operating room experience anywhere in the document, came back as Operating Room at high confidence, ranked first. Not a near miss. The top answer was wrong.

The Jev version asks a yes/no per specialty, one request:

```ts
const fit = await client.systemOne({
  state: { resume: resumeText, jobDescription: jdText },
  questions: {
    specialty_or: noul("Does this nurse have operating room experience?"),
    specialty_icu: noul("Does this nurse have intensive care experience?"),
    // one Noul per specialty, all sharing the same state
  },
});
```

Live on that exact resume, `specialty_or` came back 0.03. My code keeps specialties at or above 0.6, so operating room got dropped, and Jev picked outpatient clinic primary care at 0.88 instead. The keyword matcher, still sitting right there in the codebase, still reports operating room first.

The alias list also missed CCU and IMCU entirely, and wanted every word of "Utilization Management" before matching a job description that just said UM reviewer.

Now the number that should end any speed argument. I timed the keyword matcher over two thousand local iterations: 233 microseconds, median, no network. Jev is 226 ms p50. About a thousand times slower, and it costs real money at $0.000224 a call where the old path cost nothing.

It was still the right call. Regexes are unbeatable on speed and hopeless at synonymy.


## So, can you swap?

You can swap a call when what you actually needed was a decision. Advance or follow up. Does this resume claim ICU experience. Is this bullet supported.

For me, I don't think I need Jev for these use cases.

Case 1 swap got faster, Case 2 swap got a thousand times slower.

If you want to poke at it: the [JS SDK reference](https://docs.typesafe.ai/sdk/javascript.md). I am going to keep doing research on it.
