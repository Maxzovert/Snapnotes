import React, { useState } from 'react';

const ColorTray = ({ onColorSelect }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedColor, setSelectedColor] = useState('#cdb4db');
  const colors = ['#cdb4db', '#bde0fe', '#ffafcc', '#f38375', '#f4f9e9'];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onColorSelect(color); 
    setIsOpen(false); 
  };

  return (
    <div className="relative">
      <button
        className="w-6 h-6 rounded-full"
        style={{ backgroundColor: selectedColor }} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Show more colors`}
      />

      {isOpen && (
        <div className="absolute bottom-1.5 right-8 flex flex-row-reverse space-x-2">
          <div
            className="w-6 h-6 ml-2 rounded-full border-2 border-gray-300 cursor-pointer bg-white"
            onClick={() => handleColorSelect('')} 
          />
          
          {colors.map((color, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full  transition-all ease-in-out ${color === selectedColor ? 'border-2 border-black' : ''}`} 
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorTray;
