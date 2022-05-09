module.exports = {
  "*.{ts,tsx}": (filenames) => ["npm run format:fix", "npm run validate"],
};
