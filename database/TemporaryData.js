
const fake = [
  {
    Title: 'Bottle Service', 
    Summary: "Vote for the club you'd like to get bottle service.",
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
    Title: 'Dinner', 
    Summary: "Vote where you'd like to go for dinner on Friday night.",
    options: [
      {
        name: "test 3",
        location: "somewhere",
        votes: 0
      }
    ] 
  },
  {
    Title: 'Brunch', 
    Summary: "Vote where you'd like to get brunch.",
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
    Title: 'Friday night or Saturday night?', 
    Summary: "Vote if you'd like to go to dinner and club on Friday or Saturday night.",
    options: { Friday : 0, Saturday : 0 } 
  }
]

export default fake;