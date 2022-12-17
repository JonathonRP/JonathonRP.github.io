import * as path from "https://deno.land/std@0.167.0/path/mod.ts";
import { BUILD_PATH as root } from '$env/static/private';

export const site_root = root;

export async function resumeHtml(): Promise<string> {
  return await Deno.readTextFile(path.join(Deno.cwd(), site_root.split('/').pop() || "", 'Resume', 'index.html'));
}
