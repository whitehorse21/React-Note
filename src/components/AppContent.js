import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

/*
<option value="none">All</option>
<option value="alphabet_asc">Alphabet Asc</option>
<option value="alphabet_desc">Alphabet Desc</option>
<option value="created_date_asc">Created-Date Asc</option>
<option value="created_date_desc">Created-Date Desc</option>
<option value="updated_date_asc">Updated-Date Asc</option>
<option value="updated_date_desc">Updated-Date Desc</option>
*/

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const sortStatus = useSelector((state) => state.todo.sortStatus);
  const keywordStatus = useSelector((state) => state.todo.keywordStatus);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => {
    if (sortStatus === 'alphabet_asc') {
      return a.title > b.title ? 1 : -1;
    }
    if (sortStatus === 'alphabet_desc') {
      return a.title < b.title ? 1 : -1;
    }

    if (sortStatus === 'created_date_asc') {
      return new Date(a.created_time) > new Date(b.created_time) ? 1 : -1;
    }

    if (sortStatus === 'created_date_desc') {
      return new Date(a.created_time) < new Date(b.created_time) ? 1 : -1;
    }

    if (sortStatus === 'updated_date_asc') {
      return new Date(a.updated_time) > new Date(b.updated_time) ? 1 : -1;
    }

    if (sortStatus === 'updated_date_desc') {
      return new Date(a.updated_time) < new Date(b.updated_time) ? 1 : -1;
    }

    return a.title > b.title ? 1 : -1;
  });

  const filteredTodoList = sortedTodoList.filter(
    (item) => !!item.title.includes(keywordStatus)
  );

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            // <motion.div key={todo.id} variants={child}>
            <TodoItem key={todo.id} todo={todo} />
            // </motion.div>
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Notes
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
