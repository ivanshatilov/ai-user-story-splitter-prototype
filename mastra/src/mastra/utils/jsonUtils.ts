export const extractFirstJson = (text: string) => {
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first === -1 || last === -1 || last < first) {
    throw new Error("Model did not return JSON");
  }
  return JSON.parse(text.slice(first, last + 1));
}