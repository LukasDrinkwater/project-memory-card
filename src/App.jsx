import { useEffect, useState } from "react";
import "./App.css";
import "../src/styles/styles.css";
import { Dropdown } from "./components/dropdown";
import { Grid } from "./components/grid";

// client id 4e880c468e6f436e8a4c96854549ff62
// client secret 856834f470864f07926f81cf084d25ce

function App() {
  const clientId = "4e880c468e6f436e8a4c96854549ff62";
  const cliendSecret = "856834f470864f07926f81cf084d25ce";
  const redirectUri = "http://localhost:5173/";
  const scopes = ["user-read-private", "user-read-email"]; // Add more scopes if needed

  const [randomArtist, setRandomArtist] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const [genre, setGenre] = useState("rock");
  const [artists, setArtists] = useState("");
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  // const genre = "rock"; //change it go the user can select a genre

  const encodedRedirectUri = encodeURIComponent(redirectUri);

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

          let updatedData = data.artists.items.map((artist) => ({
            ...artist,
            clicked: false,
          }));

          setArtists(updatedData);
          // console.log(artists);

          console.log(data);
          if (data.artists.items.length > 0) {
            const ramdonIndex = Math.floor(
              Math.random() * data.artists.items.length
            );

            setRandomArtist(data.artists.items[ramdonIndex]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    handleAuthentication();
    fetchRandomArtist();
  }, [accessToken, genre]);

  const handleLogin = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodedRedirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`;
  };

  const handleChangeGenre = (newGenre) => {
    setGenre(newGenre);
  };
  console.log(accessToken);

  return (
    <div className="appContainer">
      {/* <Grid artists={artists} /> need to have it so it loads if the api has
      connected. ? or && */}
      {/* {accessToken && artists ? <Grid artists={artists} /> : <p>loading</p>} */}
      {/* {!artists && <button onClick={handleLogin}>Log in with spotify</button>} */}
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
            />
          </>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <button onClick={handleLogin}>Log in with spotify</button>
      )}

      <h1>Random Artist</h1>
      <form>
        <input
          type="text"
          placeholder="pick a genre"
          onChange={(event) => handleChangeGenre(event.target.value)}
        />
      </form>
    </div>
  );
}

export default App;
