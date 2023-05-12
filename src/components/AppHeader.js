import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { updateSortStatus, updateKeywordStatus } from '../slices/todoSlice';

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const initialSortStatus = useSelector((state) => state.todo.sortStatus);
  const initialKeywordStatus = useSelector((state) => state.todo.keywordStatus);

  const [sortStatus, setSortStatus] = useState(initialSortStatus);
  const [searchKeyword, setSearchKeyword] = useState(initialKeywordStatus);
  const dispatch = useDispatch();

  const updateSort = (e) => {
    setSortStatus(e.target.value);
    dispatch(updateSortStatus(e.target.value));
  };

  const updateSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
    dispatch(updateKeywordStatus(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <div className={styles.topHeader}>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Add Note
        </Button>
        <label htmlFor="filter">
          Filter{' '}
          <SelectButton
            id="SortOption"
            onChange={(e) => updateSort(e)}
            value={sortStatus}
          >
            <option value="alphabet_asc">Alphabet Asc</option>
            <option value="alphabet_desc">Alphabet Desc</option>
            <option value="created_date_asc">Created-Date Asc</option>
            <option value="created_date_desc">Created-Date Desc</option>
            <option value="updated_date_asc">Updated-Date Asc</option>
            <option value="updated_date_desc">Updated-Date Desc</option>
          </SelectButton>
        </label>
      </div>
      <div className={styles.searchHeader}>
        <input
          type="search"
          placeholder="Search Note..."
          value={searchKeyword}
          onChange={updateSearchKeyword}
        />
      </div>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
