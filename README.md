# Recipe Bookmarking App Showcase 

This web application allows users to search recipes based on ingredients and cuisines from around the world. Users can sign in with Google to save bookmarks. 

## Purpose

This project showcases my development of a full-stack web application that integrates recipe search functionality with user authentication and bookmarking. It highlights proficiency in:

* Front-end development using React for a dynamic and responsive user interface

* Back-end API integration for fetching and displaying recipe data

* User authentication with Google for secure sign-in and personalized bookmarking

* Modern UI/UX design, featuring dropdown menu, mobile responsiveness, interactive cards, and intuitive navigation
  
## Tools
* HTML
* JavaScript
* ReactJS
* CSS
* MongoDB
* Mongoose
* Google Cloud Services
* Spoonacular API
* Postman (for testing)
  
## Installation
(Make sure you're running node.js v18.20.6)

1. Clone the repository:
   ```bash
   git clone https://github.com/jlazala3102/Recipe-Bookmarking-web-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Recipe-Bookmarking-web-app
   cd react-website-1
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To use this project you will need your own API key and Google OAuth credentials. Follow these steps to obtain one:

* Spoonacular

1. Go to the [Spoonacular API website](https://spoonacular.com/food-api).
2. Sign up for an account or log in if you already have one.
3. Navigate to the API section and generate your API key.
4. Using `.env.example` file as a guide, create a `.env` file in the root directory of the project and add your API key:

* Google Oauth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/getting-started)
2. Sign in with your Google account.
3. Create a new project by clicking on the project dropdown at the top of the page and select "New Project"
4. In the left sidebar, navigate to APIs & Services > Library and click Enable.
5. Navigate to API & Services > Credentials in the left sidebar
6. Click on Create Credentials button and select OAuth client ID (configure consent screen and save if prompted).
7. Choose Web application as the application type and set the Authorized redirect URLs (for local development use http://localhost:5000/api/auth/google/callback).
8. After creating credentials, you will see a dialog with your Client ID and Client Secret. Copy these values and update your .env file with them.
9. Save the file and start the development server.

(Make sure the directory is react-website-1)
To start the development server, in another terminal run: 
```bash
   node server.js
   ```

Then to start the react client, in another terminal run: 
```bash
   npm start
   ```

## Challenges
* Implementing a system to store and retrieve bookmarked recipes using unique recipe IDs.
* Developing an authentication context system so the application understands whether the user is logged in.
* Optimizing API request handling to efficiently fetch recipe data while reducing redundant calls.
* Utilizing React's state for handling dynamic data between components.

## Demo Screenshots
![image](https://github.com/user-attachments/assets/50704d76-785e-4757-af60-eff61b89f90f)
![image](https://github.com/user-attachments/assets/4a51fa5b-c4d2-48b3-ae95-177acb443aba)
![image](https://github.com/user-attachments/assets/40ca30a3-7a6c-4ca8-9ba3-52510ac643b5)
![image](https://github.com/user-attachments/assets/f1c0b823-3607-459a-9a38-f040b975dab6)
![image](https://github.com/user-attachments/assets/176f04da-5da1-4d39-82fb-920b5a47f6c5)
![image](https://github.com/user-attachments/assets/bfb5c9a7-009d-46b1-9828-d63a636a2039)






