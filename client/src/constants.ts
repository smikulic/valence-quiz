export const AUTH_TOKEN = "valence-test-auth-token";
export const AUTH_TOKEN_USER = "valence-test-auth-token-user";

// In production I would load this from the server side
// (I assume these questions can be dynamic - order, number of them and questions themselves).

// I would also attempt to load them into the localStorage, so if the user churns aways from
// the quiz, once they come back they could continue where they left off.
export const questionSet = [
  {
    id: "question1",
    title: "You find it takes effort to introduce yourself to other people.",
    answer: 0,
  },
  {
    id: "question2",
    title: "You consider yourself more practical than creative.",
    answer: 0,
  },
  {
    id: "question3",
    title:
      "Winning a debate matters less to you than making sure no one gets upset.",
    answer: 0,
  },
  {
    id: "question4",
    title:
      "You get energized going to social events that involve many interactions.",
    answer: 0,
  },
  {
    id: "question5",
    title:
      "You often spend time exploring unrealistic and impractical yet intriguing ideas.",
    answer: 0,
  },
  {
    id: "question6",
    title:
      "Deadlines seem to you to be of relative rather than absolute importance.",
    answer: 0,
  },
  {
    id: "question7",
    title:
      "Logic is usually more important than heart when it comes to making important decisions.",
    answer: 0,
  },
  {
    id: "question8",
    title: "Your home and work environments are quite tidy.",
    answer: 0,
  },
  {
    id: "question9",
    title: "You do not mind being at the center of attention.",
    answer: 0,
  },
  {
    id: "question10",
    title:
      "Keeping your options open is more important than having a to-do list.",
    answer: 0,
  },
];
