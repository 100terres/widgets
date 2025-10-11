import { stringify } from "@jsr/std__dotenv/stringify";
import { join } from "@jsr/std__path/join";

const CI = Boolean(Deno.env.get("CI"));
if (!CI) {
  throw Error("The deploy task can only be ran from the CI.");
}

const FORGEJO_SHA = Deno.env.get("FORGEJO_SHA");
if (!FORGEJO_SHA) {
  throw new Error("Missing environment variable: FORGEJO_SHA");
}

const FORGEJO_SERVER_URL = Deno.env.get("FORGEJO_SERVER_URL");
if (!FORGEJO_SERVER_URL) {
  throw new Error("Missing environment variable: FORGEJO_SERVER_URL");
}

const FORGEJO_REPOSITORY = Deno.env.get("FORGEJO_REPOSITORY");
if (!FORGEJO_REPOSITORY) {
  throw new Error("Missing environment variable: FORGEJO_REPOSITORY");
}

const FORGEJO_RUN_NUMBER = Deno.env.get("FORGEJO_RUN_NUMBER");
if (!FORGEJO_RUN_NUMBER) {
  throw new Error("Missing environment variable: FORGEJO_RUN_NUMBER");
}

const REPO_URL = `${FORGEJO_SERVER_URL}/${FORGEJO_REPOSITORY}`;
const COMMIT_URL = `${REPO_URL}/commit/${FORGEJO_SHA}`;
const RUN_URL = `${REPO_URL}/actions/runs/${FORGEJO_RUN_NUMBER}`;

const ciArtefacts = stringify({
  COMMIT_URL,
  REPO_URL,
  RUN_URL,
});

console.log(ciArtefacts);

await Deno.writeTextFile(
  join(import.meta.dirname ?? "", "..", ".ci-artefacts"),
  ciArtefacts,
);

export {};
