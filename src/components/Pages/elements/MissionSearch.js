const MissionSearch = ({
  keywordChange,
  launchpadChange,
  launchpadList,
  minYrChange,
  minYrValue,
  maxYrChange,
  maxYrValue,
  years,
  apply,
}) => {
  return (
    <div className="discoverInputContainer">
      <div className="discoverSearchInput">
        <label for="keyword" className="discoverLabel bodytext">
          Keywords
        </label>
        <input
          className="discoverTextBox"
          id="keyword"
          type="text"
          placeholder="eg Falcon"
          onChange={keywordChange}
        />
      </div>
      <div className="discoverSearchInput">
        <label for="launchpad" className="discoverLabel bodytext">
          Launchpad
        </label>
        <select
          className="discoverTextBox"
          id="launchpad"
          type="text"
          onChange={launchpadChange}
        >
          {launchpadList}
        </select>
      </div>
      <div className="discoverSearchInput">
        <label for="minyear" className="discoverLabel bodytext">
          Min&nbsp;Year
        </label>
        <select
          className="discoverTextBox"
          id="minyear"
          type="text"
          onChange={minYrChange}
          value={minYrValue}
        >
          {years}
        </select>
      </div>
      <div className="discoverSearchInput">
        <label for="maxyear" className="discoverLabel bodytext">
          Max&nbsp;Year
        </label>
        <select
          className="discoverTextBox"
          id="maxyear"
          type="text"
          onChange={maxYrChange}
          value={maxYrValue}
        >
          {years}
        </select>
      </div>
      <div className="discoverButtonContainer">
        <span>&nbsp;</span>
        <br />
        <button
          className="discoverApplyButton bodytext"
          type="submit"
          onClick={apply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export { MissionSearch };
