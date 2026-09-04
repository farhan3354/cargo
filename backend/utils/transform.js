export function toJSON(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  const { _id, __v, ...rest } = obj;
  return { ...rest, id: _id?.toString() || obj.id };
}

export function toJSONArray(docs) {
  return docs.map((doc) => toJSON(doc));
}
