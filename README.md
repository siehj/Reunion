# Reunion
Family Trip Management Site

## Mission:
This application is a passion project to connect multiple generations of Beckley family cousins for a **"Cousin Trip"**.

Historically this family has annually gathered, in the hundreds, in cities across America and as time passes there should be a way for us--cousins--to continue to gather.

## Tech Stack: 
|    FRONT-END    |  OTHER RESOURCES  |   
|      :---:      |      :---:        | 
|      React      |     Axios.js      |   
|    Reactstrap   |    Socket.io      |                               
|  Webpack (Babel)|     Yelp Api      |                                


|     BACK-END     |
|      :---:       | 
|     Node.js      |
|    Express js    |
|  Express Router  |
| Express Sessions |
|     Bcrypt       |
|   Body Parser    |
|   PostgreSQL     |

## Features:
### Accomodation Information
This includes information about Las Vegas strip, information on various local activities, and Yelp search functionality for any Restaurant, Bar, etc. that you would like details about. Lastly, there is a link to the hotel where reservations are made for this trip.

*Behind the scenes:* 
The search feature was done by creating a server side function that interacts with the search bar and makes a call to the Yelp Api. The results are dynamically rendered with React conditional-logic. Information like photo, address, and a clickable link to the website.
All results show with the mandatory yelp symbol. 

The Hotel information is rendered from the database to handle the case/rendering of multiple hotels' information. The database is used for this function to keep weight off of the Yelp Api and because it is unchanging information. 


### User Portal
An in depth profile system that stores your contact information for future trips and your city, state you will be flying from. The geolocational information helps in the decision process for the next cousin trip excursion.

*Behind the scenes:*
Registration is needed to access the user portal. Sign up and Login both interact with the postgreSQL database to `INSERT` or `SELECT` to to either create or retreive user data. Bcrypt is used for password security while express sessions are used for persistance. Dynamic error handling and display was applied to let users know that they've entered the wrong email/password and or to let them know they cannot Sign Up with a username that is already taken.

Upon login, dynamic alerts display for the user to know to update missing user data. User profile updates also interact with the datatbase and use a dynamic `UPDATE` query on applicable fields.


### Itenerary
To keep everyone up to date with the latest trip itenerary, a daily list of optional activities loads upon Login. This way you do not miss any change in information.

*Behind the scenes:*
Another request to the database to retreive data related to the itenerary, which stores the daily information by day of the week.

### Voting
A voting system has been set in place to vote for activities, restaurants and various other options that may be available to do within Vegas. This way we can come to a quick consensus.

*Behind the scenes:*
Using a join table, there are various queries that include checking if the user has voted for this item before and uses this to apply either an `Increment` operation or `Decrement` operation to the row within the voting_items table. Another table is used to hold the voting topics. One call, receives and shapes this data before rendering for the user. 

## Future Features:
* Integrated Chat
  - By using Socket.io, which is already an installed dependency of this application, to finish this feature `socket.emit` and `socket.on` events would need to be set on the client and server. 
  
* Flight Information Integration
  - Unfortunately, there are no flight information Api's that can be used to complete this feature. The alternative is to use the user's location information would need to fed to an external service function that would acquire flight information from a reputable website.
  
* Photo Gallery
  - Creating and managing an amazon S3, bucket storage, database would be the most viable to upload and retreive a multitude of photos that could be shared between all users of the app. I would finish this off by displaying in a gallery that allows for quick upload and download. To accompany the new database, it would be best to attach a load balancer and caching for quicker response times and to relieve stress on one database.
