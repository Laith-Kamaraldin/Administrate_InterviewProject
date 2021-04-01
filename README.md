## Administrate Technical Interview Submission

#### Brief:

Please write a small web application that models an address book. Your solution should present a simple user-interface and should persist the data, so that it is available after restarting any processes.

Your address book should list organizations and people. It should allow the user to see the names and contact details of people in organizations, and to manage the people who are in an organization. It should store a name and contact details for each organization.

Your address book should allow organizations and people to be created, edited and deleted. The address book is for use by a single person; there is no need to build authentication and authorization in your submission. 

## Project Status
Completed to meet assigned time limit of around four hours.

#### Explanation:

It was requested that this project is done within a four hour time frame, the project clearly presents CRUD functionalities, basic design and database integration. Given more time I would mainly look into testing, code refactoring and more efficient design/ implementation.

## Installation and Setup Instructions

#### Run the project:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/`

To View Demo:

`https://laith-kamaraldin.github.io/Administrate_InterviewProject/`

## Reflection
 
This project was done as a quick demonstration of skills for the Administrate Technical Interview. Project goals was to display a brief display of my skills to see whether I would be suitable for the role I am applying for. The project showcases skills I have learnt this far and applying them in a limited timeframe.

The project interface is served using React JS whereas the database is set up using Google Firebase. The reason I chose firebase over MySQL for this project is because of the given time limit, Firebase is quick and easy to setup, offers real-time updates and can retain information when page is refreshed which is exactly what I needed when considering the brief and time frame. 

When designing the UI I wanted to go with a design that is very simple and self-explanatory. I experimented using different features such as displaying add contact and organization in a tabbed design but ultimately decided against it as I wanted a design that any user would be able to open and use without facing any issues.

Given more time there are many things I would do different/ add to the project first of which is testing. Testing is essential when releasing any product and I would make sure to write suitable tests to make sure everything works as intended. I would review the design I believe the way I currently display the data could be improved it is currently displayed using and accordion that then contains the contacts inside of it a tree table design could be more suitable. Furthermore more features could be added such as filtering, table joins and exporting data.
