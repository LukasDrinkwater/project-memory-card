function GridSquare({ artist, handleAlbumClick }) {
  // const image = props.images[2];
  // console.log(artist.images[2].url);
  // console.log(artist);

  return (
    <div className="gridSquare" onClick={() => handleAlbumClick(artist.id)}>
      {artist && (
        <img src={artist.images[2].url} alt={artist.name + " album cover"} />
      )}
    </div>
  );
}

export { GridSquare };
