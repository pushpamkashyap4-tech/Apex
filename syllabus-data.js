const syllabusFiles = [
  "./physics-11.json", "./physics-12.json",
  "./chemistry-11.json", "./chemistry-12.json",
  "./maths-11.json", "./maths-12.json"
];

const chapters = (await Promise.all(syllabusFiles.map(async (path) => {
  const response = await fetch(new URL(path, import.meta.url));
  if (!response.ok) throw new Error(`Could not load syllabus data: ${path}`);
  return response.json();
}))).flat();

const subjectOrder = new Map([["Physics", 0], ["Chemistry", 1], ["Mathematics", 2]]);
const orderedChapters = chapters
  .sort((a, b) => subjectOrder.get(a.subject) - subjectOrder.get(b.subject) || a._order - b._order)
  .map(({ _order, ...chapter }) => chapter);

export const SYLLABUS = {
  mains: orderedChapters.filter((chapter) => chapter.exam === "both" || chapter.exam === "mains_only"),
  advanced: orderedChapters.filter((chapter) => chapter.exam === "both" || chapter.exam === "advanced_only")
};
