import React, { useEffect, useState } from "react";
import { fetchData } from "../Utils/fetchData";

const ActivityFeed = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setCalls(data));
  }, []);
  console.log(calls);
  return <div className="activity-feed"></div>;
};

export default ActivityFeed;
