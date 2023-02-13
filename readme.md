How to use the API using Postman:

Access the API display in the browser from the url: http://localhost:8080/api

1. Adding an item to the web project list

• To add an item to the list you need to send a HTTP Post request to "http://localhost:8080/api" with a query string.
• You need to send a query string for the title, description and URL of your new item. 
• The Post request needs to be sent in the template of: http://localhost:8080/api?title=(Your title goes here)&description=(Your description goes here)&url=(Your URL address goes here). *Brackets should be excluded from the request, there are just present to show where your values go*.
• Once you make the request the API will send a response that the item has been successfully added and when you referesh the browser you will see your new item in the list.

2. Deleting an item from the web project list

• To delete an item from the list you need to send a HTTP Delete request to "http://localhost:8080/api" with a query string.
• You need to send a query string for the id of the item you wish to delete.
• The Delete request needs to be sent in the template of: http://localhost:8080/api?id=(The item ID number goes here). *Brackets should be excluded from the request, there are just present to show where your values go*
• Once you have made the request the API will send a response that the delete was a success and when you refresh the browser you will see the item has been removed from the list.

3. Updating the title or description of an item on the web project list

• To update an item from the list you need to send a HTTP Put request to "http://localhost:8080/api" with a query string.
• You need to send a query string for the id of the item you wish to update, with the new title and/or the new description.
• The Put request needs to be sent in the template of: http://localhost:8080/api?id=(The item ID number goes here)&title=(Your new title goes here)&description=(Your new description goes here). *Brackets should be excluded from the request, there are just present to show where your values go* 

*The title or description queries can be left out if you do not wish to update those values*

• Once you have made the request the API will send a response that the Put was a success and when you refresh the browser you will see the item has been updated in the list.