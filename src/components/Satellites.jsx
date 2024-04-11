import { useState, useEffect } from "react";

export default function Satellites() {
  const [satellites, setSatellites] = useState({});

  const fetchSatelliteInfo = async () => {
    const url = new URL("/api/tle", "https://tle.ivanstanojevic.me");
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setSatellites(data);
  };

  useEffect(() => {
    fetchSatelliteInfo();
  }, []);

  console.log(satellites);

  return (
    <>
      {!satellites.totalItems ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <h3>
            There are currently {satellites.totalItems.toLocaleString()} objects orbiting earth.
          </h3>
          The most popular are:
          <ul>
            {satellites.member.map((object) => (
              <li>{object.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
