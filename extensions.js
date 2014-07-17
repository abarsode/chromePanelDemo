var lst = [];
var bp = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function(event){
  var text = document.getElementById('networktext');
  var img = document.getElementById('networkicon');

  window.addEventListener("offline", function(event){
    text.innerHTML = 'System is Offline';
    img.src = 'icon_offline.png';
    updateList(false);
  });
  
  window.addEventListener("online", function(event){
    text.innerHTML = 'System is Online';
    img.src = 'icon_online.png';
    updateList(true);
  });
  
  populateApps();

  if (window.navigator.onLine) {
    text.innerHTML = 'System is Online';
    img.src = 'icon_online.png';
    updateList(true);
  } else {
    text.innerHTML = 'System is Offline';
    img.src = 'icon_offline.png';
    updateList(false);
  }
});

function populateApps(){
  var list = document.getElementById('applist');
  
  if (bp.extensionList.length === 0)
    return;
    
  for (var i=0;i<bp.extensionList.length;i++){
    var ii={};
    var item = document.createElement('div');
    item.className = "appitem";
    //item.onclick = launchapp(bp.appList[i].id);
    
    var itemtext = document.createElement('div');
    itemtext.className = "appitemtext";
    itemtext.innerHTML = bp.extensionList[i].shortName;

    var itemicon = document.createElement('img');
    itemicon.className = "appitemicon";

    if (bp.extensionList[i].icons)
      itemicon.src = bp.extensionList[i].icons[(bp.extensionList[i].icons.length -1)].url;
    else
      itemicon.src = 'icon_48x48.png';
      
    item.appendChild(itemicon);
    item.appendChild(itemtext);
    list.appendChild(item);
    
    ii.app = item;
    ii.offlineEnabled = bp.extensionList[i].offlineEnabled;
    lst = lst.concat(ii);
  }
}

function launchapp(id){
  return function() {
    chrome.management.launchApp(id);
  }
}

function updateList(online) {
  for(var i=0;i<lst.length;i++){
    if(!lst[i].offlineEnabled){
      if (online)
        lst[i].app.style.display = 'flex';
      else
        lst[i].app.style.display = 'none'
    }
  }
}