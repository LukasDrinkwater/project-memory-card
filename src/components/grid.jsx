import { GridSquare } from "./gridSquare";

function Grid({ artists, setArtists, score, setScore, topScore, setTopScore }) {
  console.log(artists);

  const handleAlbumClick = (id) => {
    // when the album is clicked set its click state to true.
    const updatedArtists = [...artists];
    const index = updatedArtists.findIndex(
      (artist) => artist.id === id && artist.clicked === false
    );
    // console.log(updatedArtists[index]);
    // update clicked property.
    if (index !== -1) {
      updatedArtists[index].clicked = true;
      setScore();
    }

    // if (!updatedArtists[index].clicked) {
    //   setScore(score++);
    //   console.log(score);
    // }

    checkIfAllClicked() && console.log("here");
  };

  const checkIfAllClicked = () => {
    return artists.some((artist) => artist.clicked === false);
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
