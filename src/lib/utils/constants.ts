import * as path from "https://deno.land/std@0.167.0/path/mod.ts";

export const site_root = './public'

export async function resumeHtml(): Promise<string> {
  return await Deno.readTextFile(path.join(site_root, 'Resume', 'index.html'));
}
