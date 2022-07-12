const generateTagLink = (tagName: string) => {
  return `/tag=${tagName.replace(" ", "-").toLowerCase()}`;
};

export { generateTagLink };
