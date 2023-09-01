import { useEffect, useState } from "react";
import "./App.css";
import { Dropdown } from "./components/dropdown";

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
            `https://api.spotify.com/v1/search?q=genre:${genre}&type=artist&limit=10`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const data = await response.json();
          setArtists(data.artists.items);

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

  console.log(artists);

  if (accessToken) {
    // Assuming `artists` is your array of artist objects
    const updatedData = artists.map((artist) => ({
      ...artist,
      clicked: false,
    }));
  }

  const handleLogin = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodedRedirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`;
  };

  const handleChangeGenre = (newGenre) => {
    setGenre(newGenre);
  };

  return (
    <div className="appContainer">
      <h1>Random Artist</h1>
      <form>
        <input
          type="text"
          placeholder="pick a genre"
          onChange={(event) => handleChangeGenre(event.target.value)}
        />
      </form>
      {accessToken ? (
        randomArtist ? (
          <div>
            <h2>{randomArtist.name}</h2>
            <p>Genres: {randomArtist.genres.join(", ")}</p>
            {/* <img src={randomArtist.images[0].url} alt={randomArtist.name} /> */}
          </div>
        ) : (
          <p>Loading ...</p>
        )
      ) : (
        <button onClick={handleLogin}>Log in with spotify</button>
      )}
    </div>
  );
}

export default App;
