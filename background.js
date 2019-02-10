var DELAY = 20;
var PERIOD = 5;
var URL = "";
var MATCH_URL = "www.facebook.com";

function startTimer(requestDetails) {
    URL = requestDetails.url;
    browser.alarms.create("FIRST ALARM", {delayInMinutes: DELAY});
    console.log("Start timer for: " + URL);
}

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("TAB URL: " + tab.url);
  if(tab.url.includes(MATCH_URL)){
    startTimer(tab);
  } else {
    browser.alarms.clearAll();
  }
});

browser.alarms.onAlarm.addListener((alarm) => {
    console.log("Your time is up! We'll remind you every 5 extra minutes you spend on here.");
    browser.notifications.create({
      type: "basic",
      title: "TickStop",
      message: "Your time is up! We'll remind you every 5 extra minutes you spend on here."
    });
    browser.alarms.create("SECOND ALARM", {periodInMinutes: PERIOD});
    console.log("Second timer for: " + URL);
});
