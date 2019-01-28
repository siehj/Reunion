
const fake = [
  {
    title: 'Bottle Service', 
    summary: "Vote for the club you'd like to get bottle service.",
    options: [
      {
        name: "test 1",
        location: "here",
        votes: 0
      },
      {
        name: "test 2",
        location: "there",
        votes: 0
      }
    ] 
  },
  {
    title: 'Dinner', 
    summary: "Vote where you'd like to go for dinner on Friday night.",
    options: [
      {
        name: "test 3",
        location: "somewhere",
        votes: 0
      }
    ] 
  },
  {
    title: 'Brunch', 
    summary: "Vote where you'd like to get brunch.",
    options: [
      {
        name: "test 4",
        location: "over the rainbow",
        votes: 0
      },
      {
        name: "test 5",
        location: "way up high",
        votes: 0
      }
    ] 
  },
  {
    title: 'Friday night or Saturday night?', 
    summary: "Vote if you'd like to go to dinner and club on Friday or Saturday night.",
    options: { Friday : { votes : 0 }, Saturday : { votes : 0 } } 
  }
]

export default fake;