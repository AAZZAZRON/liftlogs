# Liftlogs
Liftlogs is personalized workout tracking application that makes it easier to track progressive overload. Users can add exercises, track their sets, reps, and weights for each workout, and add notes to each workout to track how they felt, training notes, etc. 

Liftlogs automatically calculates and displays key performance metrics for each exercise based on the user's data, such as One Rep Max (1RM) and Average Volume per Workout, which is tracked over time to show progress.

This app is built with React Native. The backend is built with Flask and SQLAlchemy, and is hosted on AWS. 

## Installation
To run the app locally, you will need to have Node.js and Expo Go installed on your machine.
1. Clone the repository
2. Add a `.env` file with the following contents:
```bash
API_URL=url_to_backend
API_KEY=your_api_key
```
3. Install the dependencies
```bash
npm install
```
4. Start the app in Expo Go
```bash
npx expo start --go
```
