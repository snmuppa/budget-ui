import { Container } from 'semantic-ui-react';
import './App.css';
import MainHeader from './components/MainHeader';
import NewEntryForm from './components/NewEntryForm';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import { useEffect, useState } from 'react';
import EntryLines from './components/EntryLines';
import uuid from 'react-uuid';
import ModalEdit from './components/ModalEdit';

function App() {
  const [entries, setEntries] = useState(initialEntries);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [entryId, setEntryId] = useState();
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!isOpen && entryId) {
      const index = entries.findIndex((entry) => entry.id === entryId);
      const newEntries = [...entries]; // creates a new copy of the existing entries
      newEntries[index].description = description;
      newEntries[index].value = value;
      newEntries[index].isExpense = isExpense;
      setEntries(newEntries);

      resetEntry();
    }
  }, [isOpen]);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    entries.map((entry) => {
      if (entry.isExpense) {
        return (totalExpense += Number(entry.value));
      }
      return (totalIncome += Number(entry.value));
    });

    setIncomeTotal(totalIncome);
    setExpenseTotal(totalExpense);
    setTotal(totalIncome - totalExpense);
  }, [entries]);

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
  };

  const addEntry = () => {
    const updatedEntries = entries.concat({
      id: uuid(),
      description,
      value,
      isExpense,
    });
    setEntries(updatedEntries);

    resetEntry();
  };

  const editEntry = (id) => {
    if (id) {
      const index = entries.findIndex((entry) => entry.id === id);
      const entry = entries[index];
      setEntryId(id);
      setDescription(entry.description);
      setValue(entry.value);
      setIsExpense(entry.isExpense);
      setIsOpen(true);
    }
  };

  /**
   * reset the original entry form values to defaults
   */
  const resetEntry = () => {
    setDescription('');
    setValue('');
    setIsExpense(true);
  };

  return (
    <Container>
      <MainHeader title='Budget' type='h1' />
      <DisplayBalance
        title='Your Balance'
        value={total}
        color='black'
        size='small'
      />
      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal} />
      <MainHeader title='History' type='h3' />
      <EntryLines
        entries={entries}
        deleteEntry={deleteEntry}
        editEntry={editEntry}
      />
      <NewEntryForm
        addEntry={addEntry}
        description={description}
        value={value}
        isExpense={isExpense}
        setValue={setValue}
        setDescription={setDescription}
        setIsExpense={setIsExpense}
      />
      <ModalEdit
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        description={description}
        value={value}
        isExpense={isExpense}
        setValue={setValue}
        setDescription={setDescription}
        setIsExpense={setIsExpense}
      />
    </Container>
  );
}

export default App;

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
