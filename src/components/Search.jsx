import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
const DEBOUNCE_TIME = 300

export default function Search({ onSearch }) {
    const [inputValue, setInputValue] = useState('')
    const [debouncedValue, setDebouncedValue] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(inputValue)
        }, DEBOUNCE_TIME)

        return () => clearTimeout(timer)
    }, [inputValue])

    useEffect(() => {
        onSearch(debouncedValue)
    }, [debouncedValue, onSearch])

    const handleInputChange = event => {
        setInputValue(event.target.value)
    }

    return (
        <div className="search">
            <input type="text" placeholder="Search..." onChange={handleInputChange} />
        </div>
    )
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
}
