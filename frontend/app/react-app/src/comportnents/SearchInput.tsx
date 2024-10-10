import React, { useState } from 'react';

interface SearchInputProps {
  messages: { text: string; isUser: boolean }[];
  onHighlight: (highlightedIndices: number[]) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ messages, onHighlight }) => {
  const [searchText, setSearchText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    const indices: number[] = [];
    messages.forEach((msg, index) => {
      if (msg.text.includes(searchText)) {
        indices.push(index);
      }
    });
    onHighlight(indices);
    setCurrentIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const nextIndex = (currentIndex + 1) % messages.length;
      setCurrentIndex(nextIndex);
      const nextMessage = messages[nextIndex];
      if (nextMessage.text.includes(searchText)) {
        // Scroll to the next message
        document.getElementById(`message-${nextIndex}`)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="search-input-container">
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="検索..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">検索</button>
    </div>
  );
};

export default SearchInput;
