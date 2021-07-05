import { useDispatch } from 'react-redux';
import { addEntryRedux, updateEntryRedux } from '../actions/entries-actions';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';
import { closeEditModal } from '../actions/modals-actions';

const useEntryDetails = (desc = '', val = '', isExp = true) => {
  const [description, setDescription] = useState(desc);
  const [value, setValue] = useState(val);
  const [isExpense, setIsExpense] = useState(isExp);
  const dispatch = useDispatch();

  useEffect(() => {
    setDescription(desc);
    setValue(val);
    setIsExpense(isExp);
  }, [desc, val, isExp]);

  const updateEntry = (id) => {
    dispatch(
      updateEntryRedux(id, {
        id,
        description,
        value,
        isExpense,
      })
    );

    dispatch(closeEditModal());
    resetEntries();
  };

  const addEntry = () => {
    dispatch(
      addEntryRedux({
        id: uuid(),
        description,
        value,
        isExpense,
      })
    );

    resetEntries();
  };

  /**
   * reset the original entry form values to defaults
   */
  const resetEntries = () => {
    setDescription('');
    setValue('');
    setIsExpense(true);
  };

  return {
    description,
    setDescription,
    value,
    setValue,
    isExpense,
    setIsExpense,
    addEntry,
    updateEntry,
  };
};

export default useEntryDetails;
