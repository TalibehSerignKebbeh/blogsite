export function getTimeZoneNameFromNumber(timezoneNumber) {
  const date = new Date();
  const offset = timezoneNumber * 60; // convert timezone number to minutes
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    

  // Get the timezone name string by setting the timezone offset and using the
  // Intl.DateTimeFormat().resolvedOptions().timeZone method
  const timezoneName = new Date(date.getTime() + offset * 1000).toLocaleTimeString('en-us', { timeZone: timezone, timeZoneName: 'long' }).split(' ')[2];

  return timezoneName;
}

