var DELAY = 20;
var PERIOD = 5;

function startTimer(requestDetails) {
    browser.alarms.create("FIRST ALARM", {delayInMinutes: DELAY});
    console.log("Start timer for: " + requestDetails.url);
}

browser.webRequest.onBeforeRequest.addListener(
    startTimer,
    {urls: ["*://www.facebook.com/*"]}
);

browser.alarms.onAlarm.addListener((alarm) => {
    console.log("Your time is up! We'll remind you every 5 extra minutes you
            spend on here.");

    browser.alarms.create("SECOND ALARM", {periodInMinutes: PERIOD});
    console.log("Second timer for: " + requestDetails.url);
});
