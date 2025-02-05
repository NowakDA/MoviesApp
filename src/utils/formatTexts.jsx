const cutDescription = (description, maxLength = 90) => {
  if (description.length <= maxLength) return description;
  return `${description.slice(0, description.lastIndexOf(' ', maxLength))  }...`;
};

export default cutDescription;
