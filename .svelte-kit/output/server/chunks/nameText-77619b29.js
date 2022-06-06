const getName = (name) => {
  if (!name)
    return name;
  const removedDelimiter = name.replace(/-/g, " ").replace(new RegExp("_"), "'");
  return removedDelimiter.split(" ").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
};
export { getName as g };
