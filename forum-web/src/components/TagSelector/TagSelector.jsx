import Tag from '../Tag/Tag';
function TagSelector({ availableTags, selectedTags, setSelectedTags}) {
  const handleTagClick = (tag) => {
    const alreadySelected = selectedTags.some(selectedTag => selectedTag.tagName === tag.tagName);

    if(alreadySelected) {
      setSelectedTags(
        selectedTags.filter(
          selectedTag=>selectedTag.tagName !== tag.tagName
        )
      )
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return ( <div>

    <p>Agregar etiquetas:</p>
    {availableTags.map(tag=>(
      <Tag
        key={tag.tagName}
        tagName={tag.tagName}
        color={tag.color}
        selected={selectedTags.some(selectedTag => selectedTag.tagName === tag.tagName)}
        onClick={()=> handleTagClick(tag)}
      />
    ))}
  </div>
  );
}

export default TagSelector;

