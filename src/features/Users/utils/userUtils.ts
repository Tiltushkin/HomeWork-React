export const toUrl = (w: string) => (w?.startsWith('http') ? w : `https://${w}`);

export const initialsOf = (name: string) => name
?.split(' ')
.map((p) => p[0])
.join('')
.slice(0, 2)
.toUpperCase();

export const mapHrefOf = (lat?: string, lng?: string) => lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : undefined;