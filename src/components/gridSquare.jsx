function GridSquare(props) {
  const image = props.images[2];

  const handleAlbumClick = () => {
    // when the album is clicked set its click state to true.
  };

  return (
    <div className="gridSquare">
      <img src={image} alt="album cover" />
    </div>
  );
}
