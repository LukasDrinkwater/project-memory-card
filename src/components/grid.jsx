import { GridSquare } from "./gridSquare";

function Grid({ artists, setArtists, score, setScore, topScore, setTopScore }) {
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
    setTopScore(newScore);
    if (index === -1) {
      // reset game
      console.log("game over");
    } else if (index !== -1) {
      newScore += 1;
      updatedArtists[index].clicked = true;
      setArtists(updatedArtists);
      setScore(newScore);
      // console.log(score);
    }

    if (index !== -1) {
      newScore += 1;
      updatedArtists[index].clicked = true;
      setArtists(updatedArtists);
      setScore(newScore);
      // console.log(score);
    }

    const checkAllClicked = artists.some((artist) => artist.clicked === false);

    // if checkIfAllClicked run a function that updates the top score
    // and pop up a div that you can click to reset the game.

    if (!checkAllClicked) {
      setTopScore(newScore);
      console.log(newScore);
    }
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
      <p>{score}</p>
      <p>topscore {topScore}</p>
    </div>
  );
}

export { Grid };
