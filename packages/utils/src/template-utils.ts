import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const loadTemplateFile = (
  moduleUrl: string,
  templateRelativePath: string,
): string => {
  const moduleDir = dirname(fileURLToPath(moduleUrl));
  const templatePath = join(moduleDir, templateRelativePath);

  try {
    return readFileSync(templatePath, "utf-8");
  } catch {
    throw new Error(`Failed to load template file: ${templatePath}`);
  }
};
