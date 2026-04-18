// Generate a unique Google Meet-style link
// Format: https://meet.google.com/xxx-xxxx-xxx

export function generateMeetLink(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz'
  
  const segment1 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  const segment2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  const segment3 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  
  return `https://meet.google.com/${segment1}-${segment2}-${segment3}`
}
