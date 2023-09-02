function GridSquare({ artist, handleAlbumClick }) {
  // const image = props.images[2];

  return (
    <div className="gridSquare" onClick={() => handleAlbumClick(artist.id)}>
      <img src={artist.images[2].url} alt={artist.name + " album cover"} />
    </div>
  );
}

export { GridSquare };
