const MissionCard = ({
  flightNumber,
  missionPatch,
  missionPatchMob,
  successText,
  rocketName,
  payloadID,
  launchLocation,
  launchDate,
  buttonRedditCamp,
  buttonRedditLaunch,
  buttonRedditMed,
  buttonPresskit,
  buttonArticle,
  buttonVideo,
}) => {
  return (
    <>
      <div className="launchText">
        <div className="launchHeader">
          {missionPatch}
          <div className="rocketInfo">
            <div className="rocketTextContainer">
              {missionPatchMob}
              <div className="rocketText">
                <span className="heading5 rocketName">
                  {rocketName} - {payloadID}
                </span>
                {successText}
                <br />
              </div>
            </div>
            <span className="rocketDateLabel bodytext">
              Launched <b>{launchDate}</b> from{" "}
              <strong>{launchLocation}</strong>
            </span>
            <div className="launchButtonContainer">
              {buttonRedditCamp}
              {buttonRedditLaunch}
              {buttonRedditMed}
              {buttonPresskit}
              {buttonArticle}
              {buttonVideo}
            </div>
          </div>
        </div>

        <div className="flightNumberContainer">
          <span className="heading5 flightNumber">#{flightNumber}</span>
          <br />
          <span className="rocketDateLabel bodytext">Flight Number</span>
        </div>
      </div>
    </>
  );
};

export { MissionCard };
