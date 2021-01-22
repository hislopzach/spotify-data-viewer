export const getTokenFromHash = (hash) => {
  if (hash?.length) {
    return hash.split("&")[0].substr(14);
  }
  return null;
};
