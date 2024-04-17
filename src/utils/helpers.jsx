export const formatDate = (createdAt) => {
  const currentDate = new Date();
  const updatedAtDate = new Date(createdAt);

  const timeDiff = Math.abs(currentDate - updatedAtDate);
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) {
    return "opened today";
  } else {
    return `opened ${daysDiff} day${daysDiff === 1 ? "" : "s"} ago`;
  }
};
