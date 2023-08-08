import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const TagInputField = () => {
  const [tags, setTags] = useState([]);

  const handleChangeTags = (tags) => {
    setTags(tags);
  };

  return (
    <div>
      <TagsInput
        value={tags}
        onChange={handleChangeTags}
        inputProps={{ placeholder: 'Thêm tags' }}
      />
    </div>
  );
};

export default TagInputField;
