import React, { useCallback, useRef, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';

import { useKeyPress } from 'hooks';
import { Test } from 'consts/searchForm';
import { SearchIcon, CrossIcon } from 'assets/icons';
import styles from './SearchForm.module.scss';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const SearchForm = ({ value, setValue }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      ref.current?.blur();
    },
    [ref]
  );

  const handleButtonClear = useCallback(() => setValue(''), [setValue]);

  useKeyPress(27, () => {
    const { current } = ref;
    if (document.activeElement === current) {
      current?.blur();
    }
  });

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(styles.root, {
        [styles.hasValue]: value.length
      })}
    >
      <input
        ref={ref}
        type="text"
        className={styles.input}
        placeholder="Search posts..."
        aria-label="Search for posts"
        value={value}
        data-test={Test.INPUT}
        onChange={({ target }) => setValue(target.value)}
      />
      <button
        type="button"
        className={styles.clear}
        onClick={handleButtonClear}
        aria-hidden={!value.length}
        data-test={Test.CLEAR}
        aria-label="Clear search query for posts"
      >
        <CrossIcon />
      </button>
      <button
        type="submit"
        className={styles.submit}
        aria-label="Submit search query for posts"
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchForm;
