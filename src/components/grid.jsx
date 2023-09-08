import { GridSquare } from "./gridSquare";

function Grid({
  artists,
  setArtists,
  score,
  setScore,
  topScore,
  setTopScore,
  refreshGame,
}) {
  // console.log(artists);

  const handleAlbumClick = (id) => {
    // when the album is clicked set its click state to true.
    const updatedArtists = [...artists];
    const index = updatedArtists.findIndex(
      (artist) => artist.id === id && artist.clicked === false
    );

    // console.log(index);
    // console.log(updatedArtists[index]);
    // update clicked property.
    let newScore = score;

    if (index === -1) {
      // reset game
      if (score > topScore || topScore === 0) {
        setTopScore(newScore);
      }
      setScore(0);
      console.log("game over");
      setArtists(refreshGame(updatedArtists));
    } else if (index !== -1) {
      newScore += 1;

      updatedArtists[index].clicked = true;
      setArtists(refreshGame(updatedArtists));
      setScore(newScore);
      // console.log(score);
    }

    const checkAllClicked = artists.some((artist) => artist.clicked === false);
    // if checkIfAllClicked run a function that updates the top score
    // and pop up a div that you can click to reset the game.
    if (!checkAllClicked) {
      setTopScore(newScore);
      setArtists(refreshGame(updatedArtists));
    }

    // refreshGame(updatedArtists);
  };

  return (
    // do a map for each artist and feed the data into the GridSquare compoment
    <div className="gridContainer">
      {/* <GridSquare artists={artists[0].images[2].url} /> */}
      {artists.map((artist) => (
        <GridSquare
          key={artist.id}
          artist={artist}
          handleAlbumClick={handleAlbumClick}
        />
      ))}
    </div>
  );
}

export { Grid };
