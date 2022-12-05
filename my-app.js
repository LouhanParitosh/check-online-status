
// Global variable for Online/Offline status
const  availableStatus = {
    online : "online",
    offline: "offline"
};

//Adding the total offline count in browser cache
localStorage['offlineCount'] = localStorage['offlineCount'] ? localStorage['offlineCount'] : 0;


//Function which decides the user's status based on the window's events
function networkStatusManipulator(status) {

    const statusElement = document.querySelector(".online-status-grid");
    const offLineCountElement = document.querySelector(".offline-count");
   
    // If status is online then change the status on window
    if (status === availableStatus.online) {
        statusElement.classList.remove(availableStatus.offline);
        statusElement.classList.add(availableStatus.online);
        status = availableStatus.online;
        
    //If status is offline then change the status on window
    //Also keep the count number of times the system got down
    } else {
        statusElement.classList.remove(availableStatus.online);
        statusElement.classList.add(availableStatus.offline);

        //Picking up the previous count from browser's cache
        localStorage['offlineCount'] = parseInt(localStorage['offlineCount']) + parseInt(1);
        status = availableStatus.offline;
       
    }

    //Rendering the user's status and number of times internet got disconnected.
    statusElement.innerText = `User is ${status}`;
    offLineCountElement.innerText = localStorage['offlineCount'];
  }

  //Page load event captured and navigator.onLine is used to check the connectivity
  window.addEventListener("load", () => {
    var userStatus = navigator.onLine ? availableStatus.online : availableStatus.offline;
    networkStatusManipulator(userStatus);
  
    //If online then networkStatusManipulator is called with ONLINE Status
    window.addEventListener("online", () => {
      // Set networkStatusManipulator to online when they change to online.
      networkStatusManipulator(availableStatus.online);
    });


    //If online then networkStatusManipulator is called with OFFLINE Status
    window.addEventListener("offline", () => {
      // Set networkStatusManipulator to offline when they change to offline.
      networkStatusManipulator(availableStatus.offline);
    });
  });