export function encodeQueryData(data: { [key: string]: unknown } = {}): string {
  const keys = Object.keys(data);
  if (!keys.length) return '';

  return (
    '?' +
    Object.keys(data)
      .map(function(key) {
        return [key, data[key]].map(encodeURIComponent).join('=');
      })
      .join('&')
  );
}

export function removeLeadingSlash(url = ''): string {
  return url.replace(/^\/+/g, '');
}

export function replaceURLOrigin(url: string, newOrigin = ''): string {
  const URLObject = new URL(url);
  return url.replace(URLObject.origin, newOrigin);
}
