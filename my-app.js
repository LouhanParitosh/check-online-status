const  availableStatus = {
    online : "online",
    offline: "offline"
};

localStorage['offlineCount'] = localStorage['offlineCount'] ? localStorage['offlineCount'] : 0;
localStorage['onlineCount'] = localStorage['onlineCount'] ? localStorage['onlineCount'] : 0;

function networkStatusManipulator(status) {

    const statusElement = document.querySelector(".online-status-grid");
    const offLineCountElement = document.querySelector(".offline-count");
   
    if (status === availableStatus.online) {
        statusElement.classList.remove(availableStatus.offline);
        statusElement.classList.add(availableStatus.online);
        status = availableStatus.online;
        
    } else {
        statusElement.classList.remove(availableStatus.online);
        statusElement.classList.add(availableStatus.offline);
        localStorage['offlineCount'] = parseInt(localStorage['offlineCount']) + parseInt(1);
        status = availableStatus.offline;
       
    }
    statusElement.innerText = `User is ${status}`;
    offLineCountElement.innerText = localStorage['offlineCount'];
  }

  window.addEventListener("load", () => {
    var userStatus = navigator.onLine ? availableStatus.online : availableStatus.offline;
    networkStatusManipulator(userStatus);
  
    window.addEventListener("online", () => {
      // Set networkStatusManipulator to online when they change to online.
      networkStatusManipulator(availableStatus.online);
    });
  
    window.addEventListener("offline", () => {
      // Set networkStatusManipulator to offline when they change to offline.
      networkStatusManipulator(availableStatus.offline);
    });
  });