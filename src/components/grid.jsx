import { GridSquare } from "./gridSquare";

function Grid({ artists, setArtists, score, setScore, topScore, setTopScore }) {
  console.log(artists);

  const handleAlbumClick = (id) => {
    // when the album is clicked set its click state to true.
    const updatedArtists = [...artists];
    const index = updatedArtists.findIndex((artist) => artist.id === id);
    console.log(index);
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
