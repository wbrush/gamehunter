# GameHunter Back-End
In progress

## Event-Mgr

### Api routes that deal directly with events-  
- "/events" 
    - Get request to receive all events  
- "/event" 
    - Post request to create an event  
- "/add" 
    - Post request to sign up for events  
- "/remove" 
    - Post request to withdraw from events  
- "/inc" 
    - Post request to increment the player count of a specific event  
    - used for player signup  
- "/dec" 
    - Post request to decrement the player count of a specific event  
    - used for player withdraw  

## User-Mgr

### Api routes that deal directly with users-  
- "/signup" 
    - Post route for users to create an account  
- "/login" 
    - Post route for users to login to an existing account   
- "/delete" 
    - route to delete user account  
    - *to be added*
- "/user/:id" 
    - route to request a users events  
    - *to be added*
