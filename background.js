var appList=[];
var extensionList=[];
var winId = null;

chrome.browserAction.onClicked.addListener(function(tab){
  if (appList.length === 0)
    chrome.management.getAll(getAppList);
  createPanels(tab);
});

function createPanels(tab) {
chrome.windows.create(
  {
    url: 'applications.html',
    tabId: tab.id,
    type: "panel",
    width: 250,
    height: 400
  }, appWindowCreated);

chrome.windows.create(
  {
    url: 'extensions.html',
    tabId: tab.id,
    type: "panel",
    width: 250,
    height: 400
  }, appWindowCreated);
}

function getAppList(result) {
  //console.log('got app list');
  for(var i=0;i<result.length;i++){
    if(result[i].type == 'extension')
      extensionList = extensionList.concat(result[i]);
    else if (result[i].type == 'packaged_app' || result[i].type == 'hosted_app')
      appList = appList.concat(result[i]);
  }
}

function appWindowCreated(win){
  window.addEventListener("offline", function(event){
    chrome.windows.update(win.id, {state:"minimized"});
  });
  
  window.addEventListener("online", function(event){
    chrome.windows.update(win.id, {focused:true});
  });
}