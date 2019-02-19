var DELAY = .1;
var PERIOD = 5;
var URL = "";
var MATCH_URL = "www.facebook.com";

function startTimer(requestDetails) {
    console.log("DELAY: " + DELAY);
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

function setDelay(data){
  browser.notifications.create({
      "type": "basic",
      "title": "TickStop",
      "message": "Your time limit has been set to " + data.time + " minutes. Your alarm will now restart."
  });
  DELAY = data.time;
  console.log("DELAY: setDelay " + DELAY);
  browser.alarms.clearAll();
  browser.tabs.update();
}

browser.runtime.onMessage.addListener(setDelay);
