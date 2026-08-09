import { execFile } from "node:child_process";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";

const execute = promisify(execFile);
const root = resolve(import.meta.dirname, "../../..");
const target = "//theme/src/principles:human_capability_bundle";
const generated = resolve(root, "theme/generated");
const outputs = [
  {
    name: "descriptor",
    source: "human-capability.descriptor.bin",
    target: resolve(generated, "human-capability.descriptor.bin"),
  },
  {
    name: "arena",
    source: "human-capability.arena.bin",
    target: resolve(generated, "human-capability.arena.bin"),
  },
];
const symlinkPrefix = join(tmpdir(), `tao3k-principles-${process.pid}-`);
const bazelOptions = [`--symlink_prefix=${symlinkPrefix}`];

const runBazel = async (args) => {
  try {
    return await execute("bazelisk", args, {
      cwd: root,
      maxBuffer: 8 * 1024 * 1024,
    });
  } catch (error) {
    const detail = [error.stdout, error.stderr].filter(Boolean).join("\n");
    throw new Error(`TAO3K-PRINCIPLES-E201 Bazel bundle generation failed\n${detail}`, {
      cause: error,
    });
  }
};

try {
  await runBazel(["build", ...bazelOptions, target]);
  const { stdout: bazelBinOutput } = await runBazel(["info", ...bazelOptions, "bazel-bin"]);
  const bazelBin = bazelBinOutput.trim();
  const materialized = await Promise.all(
    outputs.map(async (output) => ({
      ...output,
      bytes: await readFile(resolve(bazelBin, "theme/src/principles", output.source)),
    })),
  );

  if (process.argv.includes("--check")) {
    for (const output of materialized) {
      const current = await readFile(output.target).catch(() => Buffer.alloc(0));
      if (!current.equals(output.bytes)) {
        throw new Error(
          `TAO3K-PRINCIPLES-E202 ${output.name} bundle is stale; run npm run principles:bundle:generate`,
        );
      }
    }
    console.log(`principles-bundle status=current outputs=${materialized.length}`);
  } else {
    await mkdir(generated, { recursive: true });
    for (const output of materialized) {
      const temporaryPath = `${output.target}.${process.pid}.tmp`;
      try {
        await writeFile(temporaryPath, output.bytes);
        await rename(temporaryPath, output.target);
      } finally {
        await rm(temporaryPath, { force: true });
      }
    }
    console.log(`principles-bundle status=generated outputs=${materialized.length}`);
  }
} finally {
  await Promise.all(
    ["bin", "out", "testlogs", "tao3k_site"].map((suffix) =>
      rm(`${symlinkPrefix}${suffix}`, { force: true, recursive: true }),
    ),
  );
}
