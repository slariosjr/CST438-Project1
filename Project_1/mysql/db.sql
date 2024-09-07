CREATE TABLE User (
    userID INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Game (
    gameID INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    releaseDate DATE
);

CREATE TABLE Library (
    libraryID INT PRIMARY KEY,
    userID INT,
    FOREIGN KEY (userID) REFERENCES User(userID)
);

CREATE TABLE Comparison (
    comparisonID INT PRIMARY KEY,
    userID1 INT,
    userID2 INT,
    date DATE,
    FOREIGN KEY (userID1) REFERENCES User(userID),
    FOREIGN KEY (userID2) REFERENCES User(userID)
);

CREATE TABLE LibraryGame (
    libraryGameID INT PRIMARY KEY,
    libraryID INT,
    gameID INT,
    dateAdded DATE,
    FOREIGN KEY (libraryID) REFERENCES Library(libraryID),
    FOREIGN KEY (gameID) REFERENCES Game(gameID)
);