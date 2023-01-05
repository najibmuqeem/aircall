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
import AllCalls from "./Partials/AllCalls";
import { sortCalls } from "../Utils/callSort";

const Home = () => {
  const [showDetails, setShowDetails] = useState([]);
  const [calls, setCalls] = useState([]);
  const [displayedCalls, setDisplayedCalls] = useState([]);
  const [fetchState, setFetchState] = useState(true);
  const [selected, setSelected] = useState("All");
  const [ascendingSort, setAscendingSort] = useState(false);

  const displaySetter = (calls) => {
    if (selected === "All") {
      setDisplayedCalls(sortCalls(calls, ascendingSort));
    } else if (selected === "Recent") {
      setDisplayedCalls(
        sortCalls(
          calls.filter((call) => !call.is_archived),
          ascendingSort
        )
      );
    } else if (selected === "Archived") {
      setDisplayedCalls(
        sortCalls(
          calls.filter((call) => call.is_archived),
          ascendingSort
        )
      );
    }
  };

  useEffect(() => {
    setShowDetails([]);
    if (fetchState) {
      fetchData().then((data) => {
        setCalls(sortCalls(data, ascendingSort));
        displaySetter(data);
      });

      setFetchState(false);
    }
    displaySetter(calls);
  }, [fetchState, selected]);

  return (
    <div className="home">
      <Nav
        selected={selected}
        setSelected={setSelected}
        setFetchState={setFetchState}
      />
      {selected !== "Archived" ? (
        <div
          className="archive-all"
          onClick={() => {
            if (selected === "Recent") {
              setDisplayedCalls([]);
            } else {
              setDisplayedCalls((prev) =>
                prev.map((prevCall) => ({ prevCall, is_archived: true }))
              );
            }
            setShowDetails([]);
            displayedCalls.forEach((call) => updateSingle(call.id, true));
          }}
        >
          <GrArchive />
          Archive all calls
        </div>
      ) : (
        <div className="archive-all-hidden"></div>
      )}
      <AllCalls
        displayedCalls={displayedCalls}
        setDisplayedCalls={setDisplayedCalls}
        selected={selected}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        setFetchState={setFetchState}
      />
    </div>
  );
};

export default Home;
