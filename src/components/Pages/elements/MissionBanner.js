const MissionBanner = (click, image) => {
  return (
    <>
      <div className="subtitle heading5">
        <span className="number">04</span>&nbsp;REVISIT YOUR JOURNIES
      </div>
      <div className="discoverContainer">
        <div className="discoverText heading3">DISCOVER SPACE MISSIONS</div>
        <div className="discoverIcon">
          <img
            onClick={click}
            className="discoverChevDownSrc"
            id="destImg"
            src={image}
            alt="chevron"
          />
        </div>
      </div>
    </>
  );
};

export { MissionBanner };
