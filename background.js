var DELAY = 20;
function startTimer(requestDetails) {
  browser.alarms.create("", {delayInMinutes: DELAY});
  console.log("Start timer for: " + requestDetails.url);
}

browser.webRequest.onBeforeRequest.addListener(
  startTimer,
  {urls: ["*://www.facebook.com/*"]}
);

browser.alarms.onAlarm.addListener((alarm) => {
  console.log("End timer");
});