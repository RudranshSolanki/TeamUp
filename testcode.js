let date =Date.now();

let date2 = 1746542730000;

let ndate = date-date2;
let totalHours = ndate/(1000 * 60 * 60);
const hours = Math.floor(totalHours);

// Fractional part (minutes)
const fractionalMinutes = (totalHours - hours) * 60;
const minutes = Math.round(fractionalMinutes);

console.log(`${hours} hours and ${minutes} minutes`);

