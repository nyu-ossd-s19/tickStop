var DELAY = 20;
var PERIOD = 5;
var URL = "";

function startTimer(requestDetails) {
    URL = requestDetails.url;
    browser.alarms.create("FIRST ALARM", {delayInMinutes: DELAY});
    console.log("Start timer for: " + URL);
}

browser.webRequest.onBeforeRequest.addListener(
    startTimer,
    {urls: ["*://www.facebook.com/*"]}
);

browser.alarms.onAlarm.addListener((alarm) => {
    console.log("Your time is up! We'll remind you every 5 extra minutes you spend on here.");
    browser.alarms.create("SECOND ALARM", {periodInMinutes: PERIOD});
    console.log("Second timer for: " + URL);
});
