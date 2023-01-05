export const sortCalls = (calls, ascendingSort) => {
  return calls.sort((first, second) =>
    ascendingSort
      ? new Date(first.created_at).valueOf() -
        new Date(second.created_at).valueOf()
      : new Date(second.created_at).valueOf() -
        new Date(first.created_at).valueOf()
  );
};
