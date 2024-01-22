function containsSubstring(set: Set<string>, substring: string) : boolean {
  return Array.from(set).some(
    (entry) => entry.includes(substring) || substring.includes(entry),
  );
}

export default function removeTopics(topics: string[]) : string[] {
  const usedTopics = new Set<string>();
  const resultArray = topics.filter((topic: string) => {
    if (!containsSubstring(usedTopics, topic)) {
      if (!usedTopics.has(topic)) {
        usedTopics.add(topic);
        return true;
      }
    }
    return false;
  });
  return resultArray;
}
