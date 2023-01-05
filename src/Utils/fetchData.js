//this version of Babel doesn't allow for async/await syntax
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
  }
};

export const fetchSingle = (id) => {
  try {
    return fetch(
      `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((result) => result.json());
  } catch (err) {
    console.error(err);
  }
};

export const updateSingle = (id, is_archived) => {
  try {
    return fetch(
      `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ is_archived }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((result) => result);
  } catch (err) {
    console.error(err);
  }
};
