export const resolveProfileImageUrl = (profilePath) => {
  if (!profilePath) return "";
  if (profilePath.startsWith("http://") || profilePath.startsWith("https://")) {
    return profilePath;
  }

  const cleanPath = profilePath.replace(/^\/+/, "");
  return cleanPath.startsWith("storage/")
    ? `http://localhost:8000/${cleanPath}`
    : `http://localhost:8000/storage/${cleanPath}`;
};
