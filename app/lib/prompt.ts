export function enrichPrompt(input: string): string {
  const base = `Create a cinematic, realistic, high-quality short video.`;
  const styles = [
    "cinematic lighting",
    "smooth motion",
    "high detail",
    "vivid colors",
    "professional look",
    "dynamic camera angles",
    "natural textures"
  ];
  const picks = styles.sort(() => 0.5 - Math.random()).slice(0, 2);

  return `${base} Scene: ${input}. Style: ${picks.join(", ")}.`;
}
