/**
 * Helper to clean and parse Google Maps URLs.
 * Handles full <iframe> snippets, direct embed links, and standard share links.
 */
export function getCleanMapEmbedUrl(inputUrl) {
  const DEFAULT_MAP = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3782.9724890902626!2d73.94085339090402!3d18.530145308039067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1788104636985!5m2!1sen!2sin';

  if (!inputUrl || typeof inputUrl !== 'string') {
    return DEFAULT_MAP;
  }

  let cleaned = inputUrl.trim();

  // 1. Extract src attribute if full <iframe> html snippet was pasted
  if (cleaned.includes('<iframe') && cleaned.includes('src=')) {
    const match = cleaned.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) {
      cleaned = match[1];
    }
  }

  // 2. Strip surrounding quotes and whitespace
  cleaned = cleaned.replace(/^["']|["']$/g, '').trim();

  // 3. Fallback to default if empty after cleaning
  if (!cleaned) {
    return DEFAULT_MAP;
  }

  return cleaned;
}
