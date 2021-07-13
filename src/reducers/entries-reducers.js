import entriesTypes from '../actions/entries-actions';

const entriesReducer = (state = initialEntries, action) => {
  let newEntries;
  switch (action.type) {
    case entriesTypes.ADD_ENTRY:
      newEntries = state.concat({ ...action.payload });
      return newEntries;

    case entriesTypes.REMOVE_ENTRY:
      newEntries = state.filter((entry) => entry.id !== action.payload.id);
      return newEntries;

    case entriesTypes.UPDATE_ENTRY:
      newEntries = [...state];
      const index = newEntries.findIndex(
        (entry) => entry.id === action.payload.id
      );
      newEntries[index] = { ...action.payload.entry };

      return newEntries;

    case entriesTypes.POPULATE_ENTRIES:
      return action.payload;

    default:
      return state;
  }
};

export default entriesReducer;

var initialEntries = [];
