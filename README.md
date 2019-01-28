# Reunion
Family Trip Management Site

## Mission:
This application is a passion project to connect multiple generations of Beckley family cousins for a **"Cousin Trip"**.

Historically this family has annually gathered, in the hundreds, in cities across America and as time passes there should be a way for us--cousins--to continue to gather.

## Features:
### Accomodation Information
This includes information about Las Vegas strip, information on various local activities, and Yelp search functionality for any Restaurant, Bar, etc. that you would like details about. Lastly, there is a link to the hotel where reservations are made for this trip.

### User Portal
An in depth profile system that stores your contact information for future trips and your city, state you will be flying from. The geolocational information helps in the decision process for the next cousin trip excursion.

### Itenerary
To keep everyone up to date with the latest trip itenerary, a daily list of optional activities loads upon Login. This way you do not miss any change in information.

### Voting
A voting system has been set in place to vote for activities, restaurants and various other options that may be available to do within Vegas. This way we can come to a quick consensus.

## Future Features:
* Integrated Chat
  - By using Socket.io, which is already an installed dependency of this application, to finish this feature `socket.emit` and `socket.on` events would need to be set on the client and server. 
  
* Flight Information Integration
  - Unfortunately, there are no flight information Api's that can be used to complete this feature. The alternative is to use the user's location information would need to fed to an external service function that would acquire flight information from a reputable website.
  
* Photo Gallery
  - Creating and managing an amazon S3, bucket storage, database would be the most viable to upload and retreive a multitude of photos that could be shared between all users of the app. I would finish this off by displaying in a gallery that allows for quick upload and download. To accompany the new database, it would be best to attach a load balancer and caching for quicker response times and to relieve stress on one database.
