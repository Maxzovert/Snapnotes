import React from 'react'

const WordsCounter = ({content}) => {
    const countWords = () => {
        return content.trim().split(/\s+/).filter(word => word).length;
      };
  return (
    <div className='input-label'>
     {content.length} / {countWords()}
    </div>
  )
}

export default WordsCounter
