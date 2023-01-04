import React, { useEffect, useState } from "react";
import { fetchData, updateSingle } from "../Utils/fetchData";
import { FaArrowDown, FaBan, FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { GrArchive } from "react-icons/gr";
import ActivityFeed from "./ActivityFeed";

import Nav from "./Nav";

const Home = () => {
  const [page, setPage] = useState("All");
  const [showDetails, setShowDetails] = useState([]);
  const [calls, setCalls] = useState([]);
  const [fetchState, setFetchState] = useState(true);

  useEffect(() => {
    if (fetchState) {
      fetchData().then((data) =>
        setCalls(
          data.sort(
            (first, second) =>
              new Date(second.created_at).valueOf() -
              new Date(first.created_at).valueOf()
          )
        )
      );
      setFetchState(false);
    }
  }, [fetchState]);
  console.log(calls);
  return (
    <div className="home">
      <Nav />
      {page === "All" && (
        <div>
          {calls.map((call, index) => {
            let newDate = false;
            let currentCallDateString = "";
            if (
              calls[index + 1] &&
              call.created_at &&
              calls[index + 1].created_at
            ) {
              currentCallDateString = new Date(
                call.created_at
              ).toLocaleDateString();
              if (
                currentCallDateString !==
                new Date(calls[index + 1].created_at).toLocaleDateString()
              ) {
                currentCallDateString = new Date(
                  calls[index + 1].created_at
                ).toLocaleDateString();
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
                        {new Date(call.created_at).toLocaleTimeString()}
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
                      <div className="call-via">
                        {call.via ? `via ${call.via}` : "N/A"}
                      </div>
                      <div className="call-type">
                        {call.call_type[0].toUpperCase() +
                          call.call_type.slice(1)}
                      </div>
                      {!call.is_archived && (
                        <div
                          className="call-archive"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateSingle(call.id, true).then((result) =>
                              setFetchState(true)
                            );
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
      )}
    </div>
  );
};

export default Home;
