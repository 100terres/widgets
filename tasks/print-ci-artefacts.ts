import { parse } from "@jsr/std__dotenv/parse";
import { join } from "@jsr/std__path/join";

const EXPECTED_KEYS = ["COMMIT_URL", "REPO_URL", "RUN_URL"] as const;
type ParsedCiArtefacts = Record<(typeof EXPECTED_KEYS)[number], string>;
const isParsedCiArtefacts = (value: unknown): value is ParsedCiArtefacts => {
  if (!value) {
    return false;
  }

  return (
    typeof value === "object" && EXPECTED_KEYS.every((key) => key in value)
  );
};

const ciArtefacts = await Deno.readTextFile(
  join(import.meta.dirname ?? "", "..", ".ci-artefacts"),
);
const parsedCiArtefacts = parse(ciArtefacts);

if (!isParsedCiArtefacts(parsedCiArtefacts)) {
  throw new Error("Problem with .ci-artefacts");
}

console.log("CI Commit:", parsedCiArtefacts.COMMIT_URL);
console.log("CI Run:", parsedCiArtefacts.RUN_URL);

export {};
