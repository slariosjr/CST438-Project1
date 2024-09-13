CREATE TABLE UserInfo (
    userID INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Game (
    gameID INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    releaseDate DATE,
    cover_url VARCHAR(255)
);

CREATE TABLE Library (
    libraryID INT PRIMARY KEY,
    userID INT NOT NUll,
    gameID INT NOT NULl,aaa
    FOREIGN KEY (userID) REFERENCES UserInfo(userID)
);

CREATE TABLE Comparison (
    comparisonID INT PRIMARY KEY,
    userID1 INT NOT NULL,
    userID2 INT NOT NULL,
    date DATE,
    FOREIGN KEY (userID1) REFERENCES UserInfo(userID),
    FOREIGN KEY (userID2) REFERENCES UserInfo(userID)
);

CREATE TABLE LibraryGame (
    libraryGameID INT PRIMARY KEY,
    libraryID INT,
    gameID INT,
    dateAdded DATE,
    FOREIGN KEY (libraryID) REFERENCES Library(libraryID),
    FOREIGN KEY (gameID) REFERENCES Game(gameID)
);


CREATE INDEX idx_user_email ON UserInfo(email);
CREATE INDEX idx_game_title ON Game(title);
CREATE INDEX idx_library_user ON Library(userID);
CREATE INDEX idx_library_game ON Library(gameID);