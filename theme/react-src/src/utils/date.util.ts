const dateFormat = new Intl.DateTimeFormat('tr-TR');

export function formatDate(dateStr: string): string {
  const replaced = dateStr.replace(/[ :]/g, '-').split('-');
  // This kind of parsing is required thanks to safari
  const formattedDate = new Date(
    +replaced[0],
    +replaced[1] - 1,
    +replaced[2],
    +replaced[3] || 0,
    +replaced[4] || 0,
    +replaced[5] || 0
  );
  return dateFormat.format(formattedDate);
}
