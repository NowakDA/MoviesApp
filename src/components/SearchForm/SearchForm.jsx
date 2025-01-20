import { useState, useCallback } from 'react';
import { Input } from 'antd';
import debounce from 'lodash/debounce';

const SearchForm = ({ createUrl }) => {
    const [value, setValue] = useState('');
        console.log(value)
    // Создаем дебаунсированную версию функции createUrl
    const debouncedCreateUrl = useCallback(
        debounce((searchValue) => {
            console.log(searchValue)
            createUrl(searchValue);
        }, 300), // задержка в миллисекундах
        [createUrl]
        
    );

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue); // Обновляем состояние value
        debouncedCreateUrl(newValue); // Вызываем дебаунсированную функцию
    };

    return (
        <div>
            <Input
                className='search-input'
                placeholder="Type to search..."
                value={value} // Устанавливаем значение из состояния
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchForm;
