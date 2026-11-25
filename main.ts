// Unsent: The Micro-Confession Sprint
// One micro-confession, in exactly two parts: a To: line naming who it was
// meant for, and the unsent message itself — one line, written exactly as it
// was typed, with no explanation after it.
//
// To run: bun run main.ts        (or: node main.ts)

type MicroConfession = {
  /** Who it was meant for: a role, a first name, a relationship. */
  to: string;
  /** The unsent line itself, exactly as typed. One line, no more. */
  message: string;
};

export const confession: MicroConfession = {
  to: "my brother",
  message:
    "I broke your guitar the summer before you left, and I let you blame the movers for twelve years because that was the only time you ever hugged me.",
};

/**
 * A micro-confession is valid only if it is exactly two parts: the To: line
 * and a single-line message. Anything else — a joke, a greeting, a
 * motivational line, an explanation after the message — is not unsent, it is
 * written to be sent.
 */
export function validate(c: MicroConfession): string[] {
  const problems: string[] = [];
  if (!c.to.trim()) problems.push("To: line is empty");
  if (!c.message.trim()) problems.push("message is empty");
  if (c.message.includes("\n")) problems.push("message must be one line");
  return problems;
}

export function render(c: MicroConfession): string {
  return `To: ${c.to}\n${c.message}`;
}

if (import.meta.main) {
  const problems = validate(confession);
  if (problems.length > 0) {
    for (const p of problems) console.error(`invalid confession: ${p}`);
    process.exit(1);
  }
  console.log(render(confession));
}
