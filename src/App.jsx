import { useEffect, useState } from "react";
import "./App.css";
import "../src/styles/styles.css";

import { Grid } from "./components/grid";

// client id 4e880c468e6f436e8a4c96854549ff62
// client secret 856834f470864f07926f81cf084d25ce

function App() {
  const clientId = "4e880c468e6f436e8a4c96854549ff62";
  // const cliendSecret = "856834f470864f07926f81cf084d25ce";
  const redirectUri = "http://localhost:5173/";
  const scopes = ["user-read-private", "user-read-email"]; // Add more scopes if needed

  const [accessToken, setAccessToken] = useState("");

  const [genre, setGenre] = useState("");
  const [userInput, setUserInput] = useState("");
  const [artists, setArtists] = useState("");
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  // const genre = "rock"; //change it go the user can select a genre

  const encodedRedirectUri = encodeURIComponent(redirectUri);

  const chooseRandomGenre = () => {
    const genres = ["pop", "rock", "hip-hop", "jazz", "electronic", "country"];
    if (!genre) {
      let newGenre = genres[Math.floor(Math.random() * genres.length)];

      setGenre(newGenre);
    }
  };
  useEffect(() => {
    // const genres = ["pop", "rock", "hip-hop", "jazz", "electronic", "country"];
    // if (!genre) {
    //   let newGenre = genres[Math.floor(Math.random() * genres.length)];
    //   setGenre(newGenre);
    // }
    chooseRandomGenre();
  });

  useEffect(() => {
    const handleAuthentication = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get("access_token");
      if (token) {
        setAccessToken(token);
        window.history.pushState({}, document.title, window.location.pathname);
      }
    };
    handleAuthentication();
  }, []);

  useEffect(() => {
    const fetchRandomArtist = async () => {
      if (accessToken) {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=genre:${genre}&type=artist&limit=12`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const data = await response.json();

          // add clicked property to each artist
          let updatedData = data.artists.items.map((artist) => ({
            ...artist,
            clicked: false,
          }));

          setArtists(updatedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchRandomArtist();
  }, [accessToken, genre, topScore]);

  // useEffect to refresh the order off the array.

  const refreshGame = (array) => {
    // function to refresh the game
    // load new albums, reset current score.
    let shuffledArray = [];
    let usedIdexes = [];

    let i = 0;
    while (i < array.length) {
      let randomNumber = Math.floor(Math.random() * array.length);
      if (!usedIdexes.includes(randomNumber)) {
        shuffledArray.push(array[randomNumber]);
        usedIdexes.push(randomNumber);
        i++;
      }
    }
    return shuffledArray;
  };
  //   },
  //   { artists }
  // );

  const handleLogin = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodedRedirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`;
  };

  const handleChangeGenre = (newGenre) => {
    if (newGenre.trim() !== "") {
      setUserInput(newGenre);
      setGenre(newGenre);
    }
  };

  useEffect(() => {
    const genres = ["pop", "rock", "hip-hop", "jazz", "electronic", "country"];
    if (userInput === "" || !userInput) {
      let newGenre = genres[Math.floor(Math.random() * genres.length)];

      setGenre(newGenre);
    }
  }, [userInput]);

  return (
    <div className="appContainer">
      {accessToken && <h1>Random {genre} artists</h1>}

      {accessToken && (
        <form className="genreForm">
          <input
            type="text"
            placeholder="pick a genre"
            onChange={(event) => handleChangeGenre(event.target.value)}
          />
        </form>
      )}
      {accessToken && (
        <div className="scoreContainer">
          <p>Current Score: {score}</p>
          <p>Top Score: {topScore}</p>
        </div>
      )}
      {accessToken ? (
        artists ? (
          <>
            <Grid
              artists={artists}
              setArtists={setArtists}
              score={score}
              setScore={setScore}
              topScore={topScore}
              setTopScore={setTopScore}
              refreshGame={refreshGame}
            />
          </>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <>
          <p>To start game click the login button</p>
          <button onClick={handleLogin}>Log in with spotify</button>
        </>
      )}
    </div>
  );
}

export default App;
