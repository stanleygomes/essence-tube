import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const loadTemplateFile = (
  moduleUrl: string,
  templateRelativePath: string,
): string => {
  const moduleDir = dirname(fileURLToPath(moduleUrl));

  return readFileSync(join(moduleDir, templateRelativePath), "utf-8");
};
