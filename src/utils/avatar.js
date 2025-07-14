export const getUserAvatar = (name) => {
  const safeName = String(name || "USER").trim();
  const hash = [...safeName].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  const initials = safeName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return `https://ui-avatars.com/api/?name=${initials}&background=ff0000&c0ff&color=fff&font-size=100&bold=true`;
};
