<p align="center">
  <img src="./frontend/src/assets/geoguess_logo.ico" alt="GeoBoss Logo" width="100px" height="100px">
</p>

<h1 align="center">GeoBoss - Bird's Eye Distance Guessing Game</h1>


GeoBoss is an engaging front-end and back-end web application that challenges players to guess the bird's eye distance between two French cities. The game is based on APIs datas from INSEE (Institut national de la statistique et des études économiques) and provides an entertaining way to test your geographical knowledge. The application is coded in React and styled using Tailwind CSS.

## Features

- Random City Selection: The game selects two random French cities from the INSEE database for each round.
- Distance Estimation: Players must input their estimate of the bird's eye distance between the two selected cities.
- Score Tracking: The game keeps track of the player's score based on the accuracy of their guesses.
- Leaderboard: A leaderboard displays the top players and their scores.
- User-Friendly Interface: The application features a clean, responsive and intuitive UI designed with Tailwind CSS.

## Installation

To run GeoBoss locally, follow these steps:

###  Setup

1. Clone the repository from GitHub:

```bash
git clone https://github.com/GaspardCLD/GeoBoss.git
```

2. Install the dependencies from root folder

```bash
npm install
```

3. Create the ".env" files in both front and back folders, based on the .envsample files provided

4. Fill the database with sql file

```bash
npm run migrate
```   

6. Run the project from root folder

```bash
npm run dev
```

## Database

The application relies on a MySQL database to store city data from INSEE and user scores. Ensure you have the necessary database set up with the required tables before running the back-end.

## Credits

This project is created and maintained by Gaspard Caillaud.

## Contributing

Contributions to GeoBoss are welcome! If you find any issues or have suggestions for improvements, feel free to open a GitHub issue or submit a pull request.

## License

GeoBoss is open-source software licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.

Enjoy playing GeoBoss and have fun guessing the bird's eye distances between French cities! 🐦✈️


