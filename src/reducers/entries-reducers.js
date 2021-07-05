import uuid from 'react-uuid';

const entriesReducer = (state = initialEntries, action) => {
  let newEntries;
  switch (action.type) {
    case 'ADD_ENTRY':
      newEntries = state.concat({ ...action.payload });
      return newEntries;

    case 'REMOVE_ENTRY':
      newEntries = state.filter((entry) => entry.id !== action.payload.id);
      return newEntries;

    case 'UPDATE_ENTRY':
      newEntries = [...state];
      const index = newEntries.findIndex(
        (entry) => entry.id === action.payload.id
      );
      newEntries[index] = { ...action.payload.entry };

      return newEntries;

    default:
      return state;
  }
};

export default entriesReducer;

var initialEntries = [
  {
    id: uuid(),
    description: 'Work Income',
    value: '1000',
    isExpense: false,
  },
  {
    id: uuid(),
    description: 'Water bill',
    value: '20',
    isExpense: true,
  },
  {
    id: uuid(),
    description: 'Rent',
    value: '300',
    isExpense: true,
  },
  {
    id: uuid(),
    description: 'PowerBill',
    value: '100',
    isExpense: true,
  },
];