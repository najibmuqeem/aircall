export const fetchData = () => {
  console.log(process.env.REACT_APP_BASE_URL);

  try {
    return fetch(
      `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((result) => result.json());
  } catch (err) {
    console.error(err);
    return new Promise();
  }
};
