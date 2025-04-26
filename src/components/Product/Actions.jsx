import { useState, useEffect } from 'react'

export default function Actions({ options, onSelect }) {
    const [storageOptions, setStorageOptions] = useState([])
    const [colourOptions, setColourOptions] = useState([])
    const [selectedStorage, setSelectedStorage] = useState('')
    const [selectedColour, setSelectedColour] = useState('')

    useEffect(() => {
        if (!!options) {
            setStorageOptions(options?.storages || [])
            setColourOptions(options?.colors || [])

            if (options?.storages?.length === 1) {
                setSelectedStorage(options.storages[0].code)
            }

            if (options?.colors?.length === 1) {
                setSelectedColour(options.colors[0].code)
            }
        }
    }, [options])

    const handleAddClick = () => {
        onSelect({
            storage: selectedStorage,
            colour: selectedColour,
        })
    }

    return (
        <>
        <div className="actions-container">
            <div className="select-container">
                <label htmlFor="storage">Storage</label>
                <select name="storage" id="storage" value={selectedStorage} onChange={(e) => setSelectedStorage(e.target.value)}>
                    {selectedStorage === '' && <option value="">Select storage</option>}
                    { storageOptions.map(option => (
                        <option key={option.code} value={option.code}>{option.name}</option>
                    ))}
                </select>
            </div>
            <div className="select-container">
                <label htmlFor="colour">Colour</label>
                <select name="colour" id="colour" value={selectedColour} onChange={(e) => setSelectedColour(e.target.value)}>
                    {selectedColour === '' && <option value="">Select colour</option>}
                    { colourOptions.map(option => (
                        <option key={option.code} value={option.code}>{option.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleAddClick} disabled={!selectedStorage || !selectedColour} className="add-to-cart-button">Add to cart</button>
        </div>
        </>
    )
}
