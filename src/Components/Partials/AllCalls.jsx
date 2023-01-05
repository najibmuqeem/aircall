import React from "react";
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { FaBan, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GrArchive } from "react-icons/gr";
import { sortCalls } from "../../Utils/callSort";
import { updateSingle } from "../../Utils/fetchData";

const AllCalls = ({
  displayedCalls,
  showDetails,
  setShowDetails,
  setFetchState,
  setDisplayedCalls,
  selected,
  setShowModal,
}) => {
  return (
    <div>
      {displayedCalls.map((call, index) => {
        let newDate = false;
        let currentCallDateString = "";
        if (
          displayedCalls[index + 1] &&
          call.created_at &&
          displayedCalls[index + 1].created_at
        ) {
          currentCallDateString = new Date(call.created_at).toDateString();
          if (
            currentCallDateString !==
            new Date(displayedCalls[index + 1].created_at).toDateString()
          ) {
            currentCallDateString = new Date(
              displayedCalls[index + 1].created_at
            ).toDateString();
            newDate = true;
          }
        }

        return (
          <React.Fragment key={`${call.id ? call.id : index}`}>
            {index === 0 && (
              <div className="date-divider">
                ---------- {currentCallDateString} ----------
              </div>
            )}
            <div
              className={
                call.call_type === "missed" ? "call call-missed" : "call"
              }
              onClick={() =>
                setShowDetails((prev) =>
                  prev.includes(index)
                    ? prev.filter((callIndex) => index !== callIndex)
                    : [...prev, index]
                )
              }
            >
              <div className="call-no-details">
                <div className="call-direction">
                  {call.direction === "outbound" ? (
                    <BsFillTelephoneOutboundFill />
                  ) : call.direction === "inbound" ? (
                    <BsFillTelephoneInboundFill />
                  ) : (
                    <FaBan />
                  )}
                </div>
                <div className="call-to-fro">
                  <div className="call-to">
                    {call.to ? call.to : "No Caller ID"}
                  </div>
                  <div className="call-from">
                    {call.from ? call.from : "No Caller ID"}
                  </div>
                </div>

                <div className="call-time-duration">
                  <div className="call-time">
                    {new Date(call.created_at).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </div>
                  <div>
                    {call.duration > 3600
                      ? `${Math.floor(call.duration / 3600)} hours`
                      : call.duration > 60
                      ? `${Math.floor(call.duration / 60)} minutes`
                      : `${call.duration} seconds`}
                  </div>
                </div>
                <div className="call-expand">
                  {showDetails.includes(index) ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
              </div>
              {showDetails.includes(index) && (
                <div className="call-details">
                  {call.via && (
                    <div className="call-via">
                      {call.via ? `via ${call.via}` : "N/A"}
                    </div>
                  )}
                  {call.call_type && (
                    <div className="call-type">
                      {call.call_type[0].toUpperCase() +
                        call.call_type.slice(1)}
                    </div>
                  )}
                  {!call.is_archived && (
                    <div
                      className="call-archive"
                      onClick={(e) => {
                        e.stopPropagation();
                        call.is_archived = true;
                        if (selected === "Recent") {
                          setDisplayedCalls((prev) =>
                            prev.filter(
                              (displayedCall) => displayedCall.id !== call.id
                            )
                          );
                        } else {
                          setDisplayedCalls((prev) =>
                            sortCalls([
                              ...prev.filter(
                                (displayedCall) => displayedCall.id !== call.id
                              ),
                              call,
                            ])
                          );
                        }
                        setShowDetails([]);
                        updateSingle(call.id, true).then((result) => {
                          setFetchState(true);

                          if (result.status !== 200) {
                            setShowModal({
                              display: true,
                              message: "Unable to archive this call.",
                            });
                            setTimeout(() => {
                              setShowModal({
                                display: false,
                                message: "Unable to archive this call.",
                              });
                            }, 3000);
                          }
                        });
                      }}
                    >
                      Archive <GrArchive />
                    </div>
                  )}
                </div>
              )}
            </div>
            {newDate && (
              <div className="date-divider">
                ---------- {currentCallDateString} ----------
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default AllCalls;
