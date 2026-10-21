const biologyFiles = ["./biology-11.json", "./biology-12.json"];

export const NEET_BIOLOGY_CHAPTERS = (await Promise.all(biologyFiles.map(async (path) => {
  const response = await fetch(new URL(path, import.meta.url));
  if (!response.ok) throw new Error(`Could not load syllabus data: ${path}`);
  return response.json();
}))).flat();
