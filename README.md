# Valence - Technical Interview Challenge

Rather than a whiteboard interview or an online coding test, we have each candidate perform a medium sized interview challenge. This challenge is your opportunity to show off your fullstack skills and knowledge of how to build a full stack app. It also gives you insight into the type of technical tasks we deal with on a daily basis at Valence.

This coding challenge takes time on your end. We respect and appreciate that.

## Intro to the Challenge

For this task you will be building a very simplified version of our Perspective test.
- **Context:** Perspective is one of the tools that we use to help customers understand team dynamics is our Perspective Tool. Perspective is a 7 minute test that determines each team member's [Myers-Briggs Type Indicator](https://www.mindfulnessmuse.com/individual-differences/understanding-myers-briggs-type-indicator) (MBTI). Understanding the personality breakdown of each team member allows us to provide more insights to teams about why they are having a particular problem. (You don't need to understand Myers-Briggs)

This challenge is designed to be a single feature, a "vertical slice" that shows your skills on both the Frontend and the Backend. As a full stack engineer you will work on both sides of the stack.

## How long will it take?

If you work on a daily basis with all parts of the tech stack and you're at ease spinning up new projects, we estimate this challenge should take about 5 hours.

Sometimes what trips up candidates is that they *code* daily, but it's been a long time since they *"started a new project" from scratch*. So we recommend: use a good boilerplate to get the hello-world full stack web app up and running quickly, so you can focus your effort on **implementing the feature**. We definitely want to see the code running without making our dev machines have your dev environment (see note at bottom about docker-compose), but clearly the code to implement the feature is the core.

We encourage you to get things working as quick and dirty as you like, and **incrementally improve**.  
You will not likely have production quality code in 5 hours. If you go longer, please let us know the total time. When you do stop, please tell us in clear writing, all the things you would still want to do to make it production-ready. We want to *know* that *you know* what it would still need, right? So please **freely use** "It still needs A, B, C before going to production".

---

### About the challenge:
This challenge is framed like "Product asked you for a feature"
The use story is a bit long, because it's what a non-technical Product team member might ask, before a software developer has processed it into something shorter. Have fun!

# Spec

### User story
As a non-technical user,  
I want to be able to complete a short personality questionnaire,  
provide my email address,  
and after I submit it, see my personality "type",
both the 4-character MBTI,
and a visual representation of it.

### "Technical user story"
_Non-user-facing requirements_  
As an software engineer working on "a future story",  
after the user has logged in via their email address,  
I want to be able to display their MBTI to them.  
- I.e. their MBTI Data must be connected to the user in such a way, that if we have their email address, we can calculate or retrieve their MBTI score again in the future.

As an software engineer working on "a future story",  
I need to be able to retrieve the user's answers to individual questions,
not just their aggregate MBTI type indicator string.
- I.e. Although this story is about  showing a "combined MBTI result" to the user, please make sure to store the user's individual answers in the DB.

## User Interface Spec

This story involves two pages.

### 1. Landing page = Quiz

The landing page of the web application should show the user a list of questions as shown as the "Perspective Test" page in the design
- Full Design: https://www.figma.com/file/00SYaOnpIUYLAdvhGlTz4j97/Engineer-Perspective-Test?node-id=1%3A348
- The personality test show questions for the user to respond to
  - The question can be found in [./Data/Questions.csv](./Data/Questions.csv)
  - All 10 questions should be listed on the same page when the user opens up the page
  - For this story, please display the questions in the order they are found in that file

- The user should respond to each question via a 7-option radio-button-style response
  - The radio button furthest to the left indicates a score of 1, while the radio button furthest to the right indicates a 7
- At the bottom of the test the user should be asked for their email
- If a user submits without answering all of the questions, or their email address, they should be given an error message and told what to do
- Once the user hits submit, their email and test answers should be sent to the server
- After submitting, the user should see their results page...

### 2. Results page

The results page should display the user's simplified MBTI results as shown as the "Perspective Results" page in the design. (For how to calculate the result, see the next section.)
- Full Design: https://www.figma.com/file/00SYaOnpIUYLAdvhGlTz4j97/Engineer-Perspective-Test?node-id=1%3A566
- On the left of the results box the user should see the text "Your Perspective" followed by their perspective type
- On the right of the results box the user should see the 4 MBTI dimensions and which end they lean towards, for each dimension
  - Note: You do not need to show the degree that they lean from each side, simply coloring the box for the side that they lean on each dimension is valid for this test

## Calculating the Individual's MBTI

You will be calculating which "end" of the 4 dimensions the user's answers put them in.

Like a real MBTI, this quiz produces a result in four "dimensions" (don't worry if you don't know the Myers Briggs terminology, you don't need to understand it to implement it):
  - EI - Extraversion (E) or Introversion (I)
  - SN - Sensing (S) or Intuition (N)
  - TF - Thinking (T) or Feeling (F)
  - JP - Judging (J) or Perceiving (P)

Refer to the provided spreadsheet [./Data/Questions.csv](./Data/Questions.csv) that you used to display the 10 questions

Each question contributes to the user's result in **one** of the 4 dimensions
- As noted above, you capture their response as an integer score from 1–7.
- 1 means the question doesn't resonate with them at all, 7 means the question resonates with them fully
- However, the phrasing of the question can "reverse" the direction. e.g. "I like cookies" vs "I do not like cookies", they're both about the same subject but a response of "7" has the opposite meaning.
- The 'Meaning' column has been provided by the Product Manager to communicate to you whether, for each question, the user agreeing with the statement (7) corresponds to the dimension's "left" or "right" score
  - The 'Direction' column is just a numeric equivalent to the 'Meaning' column, provided in case that helps your data processing — the two columns have equivalent information. You can use either or both as you like.
  - For example, let's look at two `EI` questions:
    1. "You find it takes effort to introduce yourself to other people":  
       The "Meaning" of this question is "I" and the "Direction" is `1`,  
       because a high response means the user is more Introverted ("I", the ***right*** end of the EI dimension)
    2. "You get energized going to social events that involve many interactions":  
       The "Meaning" of this question is "E" and the "Direction" is `-1`,  
      because a high response means the user is more Extraverted ("E", the ***left*** end of the EI dimension)

- The end result for MBTI is a set of 4-letters that summarize their tendency in each of the 4 dimensions
  - For each dimension, determine the average score for that dimension, by combining all the responses for that dimension's questions.
  - Although that is an average, the MBTI summary is being presented to the user is as a binary for the four dimensions — e.g. they are either "Extraverted" or "Introverted", not "slightly Introverted". This get boiled down to a 4-letter representation like the one shown in the figma design and the test cases, e.g. "ENTJ". The "graph" visualization likewise is binary in this story, each dimension is either left or right, nothing in between.
    - Note that "Intuition" uses an "N" because "I" already means "Introverted".
  - If a user's average response score for a dimension is balanced in the middle (they don't lean to either side), please treat them as being first (left) letter of that dimension letter pair.

Note: This is an _extremely_ watered down version of a MBTI test; it does not ask enough questions to give an accurate result. Your personal input may vary from what you've seen other MBTI tests say, this is expected, we're trying to keep the scope small.

### MBTI Test data

For clarity, we have provided a csv file ([./Data/Test-Cases.csv](./Data/Test-Cases.csv)) that gives sets of user responses for 7 different users, and the expected MBTI result for each one. These scores have been manually verified by the Product Manager as being correct, and can be considered authoritative spec for the story.

---

# Submitting the Challenge


## Minimum Technical Requirements

- The application must be a web-based application.
- Your frontend must use a front-end javascript framework, talking to your backend API. Even if you think that a server-rendered platform is a good choice, doing so would miss out on letting us see your JS framework skills.
- The user story and technical stories must be satisfied
- The test cases given as input must produce the listed result for the test case.

- Your instructions to build and run must work as written.
- We need to run your code without making our laptops have your dev environment. Ideally, you provide us a docker-compose that we just do `docker-compose up -d {list you provide}` and when it's finished building, it's ready for us to interact with it in the browser.
  - A working docker-compose has definitely been what's effective for us. If you are not familiar with docker-compose, you can try to find a boilerplate that lets you no have to learn... or maybe you can think of another way to provide us the result in a way that similarly doesn't require us to change our dev environment, network ports in use (docker-compose .env lets us super easily change the external mapped ports). And, of course, see your code running, interact in the browser, debug if we need, and see what's stored in the database.
  - Note we're not saying build an image and put it on dockerhub. It's normal to use a standard container and there's boilerplate dockerfiles that run a build step in your chosen environment (e.g. npm/yarn) inside the container.
  - The purpose here isn't to demonstrate your docker ability, it's so we can run your code and inspect your app without having to install tools or debug network conflicts.

## FAQ
#### 1. "Which stack should I use?"
Use the stack and libraries you are the most comfortable with and you think are good for this task.
- Many people use react, angular or vue in the FE, and BE can of course be anything. Use whichever one you know to demonstrate your understanding and skills.
- People often ask what ours stack is, so we can share it, but we're looking for your best code (your stack), not your not-best-code in our stack
  - React.js + TypeScript (+ ant design + MobX) for the Frontend
  - PHP, Laravel with Eloquent ORM, MySQL

#### 2. I think the requirements aren't clear / don't address this case I'm wondering about...
If you feel there are ambiguities in the requirements:  
- In real life, you would ask for requirements clarifications.
- For this challenge, however, please make your best decision given the information you have, and **explicitly state (write) any assumptions you had to make**.

#### 3. How perfect should I make my solution / implementation?
It's a tech challenge; you have limited time.  
Use libraries instead of coding your own stuff. Pick quick and dirty approaches. Just... _say why_.

You want us to know you're smart.  
So we expect that there's things you would do, but not within a fast tech challenge. So ***tell us***. Write a summary, saying "I don't think that ABC is the best way to do it, I did it that way for now because it's fast and works, but given more time I would want to do XYZ". That way, you'll know we know you know.

## Sharing your solution with us

Create a repository using your personal GitHub account and send us the link that we can clone. Or send a zip.


Happy Hacking!
