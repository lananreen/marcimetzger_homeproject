import { useMemo, useRef, useState } from 'react'

const NEVADA_TOWNS = [
  'Pahrump',
  'Las Vegas',
  'Henderson',
  'North Las Vegas',
  'Reno',
  'Sparks',
  'Carson City',
  'Mesquite',
  'Boulder City',
  'Laughlin',
  'Elko',
  'Fernley',
  'Winnemucca',
  'West Wendover',
  'Ely',
  'Fallon',
  'Gardnerville',
  'Minden',
  'Incline Village',
  'Spring Creek',
  'Silver Springs',
  'Hawthorne',
  'Yerington',
  'Tonopah',
  'Battle Mountain',
  'Lovelock',
  'Caliente',
  'Eureka',
  'Austin',
  'Virginia City',
]

function SearchListing() {
  const [location, setLocation] = useState('')
  const [anyLocation, setAnyLocation] = useState(true)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [type, setType] = useState('')
  const [rooms, setRooms] = useState('')
  const inputRef = useRef(null)

  const suggestions = useMemo(() => {
    if (!location.trim()) return []
    const query = location.trim().toLowerCase()
    return NEVADA_TOWNS.filter((town) =>
      town.toLowerCase().startsWith(query)
    ).slice(0, 8)
  }, [location])

  const handleSelect = (town) => {
    setLocation(town)
    setShowSuggestions(false)
    setActiveIndex(-1)
  }

  const handleKeyDown = (event) => {
    if (!showSuggestions || suggestions.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => (i + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length)
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      handleSelect(suggestions[activeIndex])
    } else if (event.key === 'Escape') {
      setShowSuggestions(false)
      setActiveIndex(-1)
    }
  }

  return (
    <section id="search-listing" className="section search-listing">
      <div className="search-listing-bg" aria-hidden="true" />
      <h2 className="search-listing-heading">Find Your Dream Home</h2>
      <form className="search-listing-panel" onSubmit={(e) => e.preventDefault()}>
        <h3 className="search-listing-title">Search Listings</h3>
        <div className="search-listing-field search-listing-field-location">
          <label htmlFor="search-location">Location</label>
          <div className="search-listing-location">
            <div className="search-listing-input-wrap">
              <input
                id="search-location"
                ref={inputRef}
                type="text"
                placeholder="Enter a city or town"
                value={anyLocation ? '' : location}
                disabled={anyLocation}
                autoComplete="off"
                onChange={(e) => {
                  setLocation(e.target.value)
                  setShowSuggestions(true)
                  setActiveIndex(-1)
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="search-listing-suggestions" role="listbox">
                  {suggestions.map((town, index) => (
                    <li
                      key={town}
                      role="option"
                      aria-selected={index === activeIndex}
                      className={index === activeIndex ? 'active' : ''}
                      onMouseDown={(event) => {
                        event.preventDefault()
                        handleSelect(town)
                      }}
                    >
                      {town}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <label className="search-listing-checkbox">
              <input
                type="checkbox"
                checked={anyLocation}
                onChange={(e) => {
                  setAnyLocation(e.target.checked)
                  if (!e.target.checked) inputRef.current?.focus()
                }}
              />
              Any location
            </label>
          </div>
        </div>

        <div className="search-listing-field">
          <label htmlFor="search-type">Type</label>
          <select
            id="search-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select a type</option>
            <option value="land">Land</option>
            <option value="residential-lease">Residential Lease</option>
            <option value="residential">Residential</option>
            <option value="high-rise">High Rise</option>
          </select>
        </div>

        <div className="search-listing-field">
          <label htmlFor="search-rooms">Number of Rooms</label>
          <input
            id="search-rooms"
            type="number"
            min="0"
            placeholder="e.g. 3"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
        </div>
      </form>
    </section>
  )
}

export default SearchListing
