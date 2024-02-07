# Grounded 
A website for aiding in a meditation and gratitude practice. A MERN project. 

## About
Grounded is a website that combines meditation timers and a gratitude log in one place. The goal was to create a website that fosters a sense of calm, helps the user center themselves and aid in their meditation and gratitude practice.

## Features
1. Users need to create an account to use the website. Password encryption is handled with bcrypt and is further protected by separating the authentication information from the user information in the database. Furthermore, gratitudes and meditation entries are stored in their own separate collections with the user's id.

2. There are two types of meditation timers that can be used - an open ended timer (a stopwatch) and a countdown timer with preset times to choose from. Recode of each meditation is sent to the database upon completion.i.e on clicking the "stop" button on the open ended timer and when the timer runs out on the countdown timer. 

3. Gratitude entries are sent to the database when the "save" button is clicked, and are displayed on the page. Each entry can further be edited or deleted. 


Credit: 
Favicon image - gratitude by Flatart from <a href="https://thenounproject.com/browse/icons/term/gratitude/" target="_blank" title="gratitude Icons">Noun Project</a> (CC BY 3.0)