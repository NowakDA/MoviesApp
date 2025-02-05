import { useState, useCallback, useEffect } from 'react';
import { Input } from 'antd';
import debounce from 'lodash/debounce';
import './SearchForm.css';

function SearchForm({ createUrl }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const storedValue = sessionStorage.getItem('searchValue');
    if (storedValue) {
      setValue(storedValue);
    }

    const handleBeforeUnload = () => {
      sessionStorage.removeItem('searchValue');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setValue('');
        sessionStorage.removeItem('searchValue');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const debounceCreateUrl = useCallback(
    debounce((searchValue) => {
      createUrl(searchValue);
    }, 500),
    [createUrl],
  );

  useEffect(
    () => () => {
      debounceCreateUrl.cancel();
    },
    [debounceCreateUrl],
  );

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    sessionStorage.setItem('searchValue', newValue);
    debounceCreateUrl(newValue);
  };

  return (
    <Input
      className="search-input"
      placeholder="Type to search..."
      value={value}
      onChange={handleChange}
    />
  );
}

export default SearchForm;
