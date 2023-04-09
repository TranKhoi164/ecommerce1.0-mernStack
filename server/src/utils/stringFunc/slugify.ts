export const slugify = (str: String) => {
  return str.toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, "-")
}
