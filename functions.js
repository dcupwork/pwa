





function changeDirection(contact, nick) {
    if (obj2.charFrom && obj2.charTo){
        var div = document.getElementById('' + obj2.CharFrom + '');
        div.innerHTML = obj2.charFrom;
    

        var div = document.getElementById('' + obj2.CharTo + '');
        div.innerHTML = obj2.charTo;
        obj2.charTo = null;
        obj2.charFrom = contact;
        
        var div = document.getElementById('' + contact + '');
        div.innerHTML = '<span style="font-size: 16px; align-items: center;">from </span>';
        setItem({ id: id, obj: obj2 })

        if (obj2.temp.activePage == "contacts") {
         
            let message = document.getElementById('bottom')
            let di = document.createElement('div')
            di.innerHTML = `
            <div  id="bottom">
                
            <div  id="button-form">    
                <div id="nav-button" onclick="wall()">New Offers</div>
                <div id="nav-button" onclick="wishlist()">Regular</div>
                <div id="nav-button" onclick="list()">List</div>
                <div id="nav-button" onclick="touch()">Touch</div>
                <div  onclick="wallets()"> ${obj2.wallets[0].balance}</div>
            </div>
            <div  id="send-form">
                ${menu}
                <div  class="button" id="reverse" onclick="myFunction()">S</div>
                <input type="text" class="input" id="amount-input" placeholder=" Amount"></input>
                <input type="text" class="input" id="contact-input" placeholder=" ID"></input>
                <div  onclick="transmit()">send</div>
            
            </div>
          
            
            </div>
                            `
            message.appendChild(di)
        } else {
            document.querySelector('#amount-input').remove();
            let message = document.getElementById('bottom')
            let di = document.createElement('div')
            di.innerHTML = `
                            <div  id="bottom">
                            <div  id="button-form">
                                <div id="nav-button" onclick="chatOfContact()">Chat</div>
                                <div id="nav-button" onclick="listOfContact()">List</div>
                                <div id="nav-button" onclick="shedule()">Shedule</div>
                                <div id="nav-button" onclick="contacts()">Contacts</div>
                            </div>
                            <div  id="chat-form">
                                ${menu}
                                <div  class="button" id="reverse" onclick="myFunction()">S</div>
                                <input type="text" class="input" id="amount-input" placeholder=" To ${nick}"></input>
                                <div  onclick="transmitWithContact()">send</div>
                            
                            </div>
                            </div>
                            `
            message.appendChild(di)
        }


    } else if (obj2.charFrom && obj2.charTo == null && obj2.charFrom != contact){

        var div = document.getElementById('' + obj2.charFrom + '');
        div.innerHTML = '<span style="font-size: 16px; align-items: center;">from </span>';

        var div = document.getElementById('' + contact + '');
        obj2.charTo = contact;
        setItem({ id: id, obj: obj2 })
        div.innerHTML = '<span style="font-size: 16px; align-items: center;">to </span>';
    
        document.querySelector('#amount-input').remove();
        let message = document.getElementById('bottom')
        let di = document.createElement('div')
        di.innerHTML = `
                        <div  id="bottom">
                        <div  id="button-form">
                            <div id="nav-button" onclick="wishlist()">New Offers</div>
                            <div id="nav-button" onclick="wishlist()">Regular</div>
                            <div id="nav-button" onclick="list()">List</div>
                            <div id="nav-button" onclick="touch()">Touch</div>
                            <div id="nav-button" onclick="contacts()">Contacts</div>
                        </div>
                        <div  id="between-form">
                            ${menu}
                            <input type="text" class="input" id="amount-input" placeholder=" From ${obj2.CharFrom} to ${obj2.CharTo}"></input>
                            <div  onclick="betweenAccs()">send</div>
                        
                        </div>
                        </div>
                        `
        message.appendChild(di)

    }

    var url = "ws://localhost:8080/changeDirection"
    var ws = new WebSocket(url);

    ws.onopen = function (e) {
        ws.send(JSON.stringify({ ids: id, idss: obj2.charFrom, idrs: obj2.charTo, password: password }));
    }
    ws.onmessage = function (e) {
        msg = JSON.parse(e.data)
        //console.log(msg)
    }
    ws.onclose = function (event) {
        console.log("Websocket connection closed:", event.code, event.reason);
    }


}






function setItem(value) {
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

    // Open (or create) the database
    var open = indexedDB.open("MyDatabase", 1);

    // Create the schema
    open.onupgradeneeded = function () {
        var db = open.result;
        db.createObjectStore("endisListStore", { keyPath: "id" });

    };

    open.onsuccess = function () {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("endisListStore", "readwrite");
        var store = tx.objectStore("endisListStore");

        // Add some data
        store.put(value);

        // Close the db when the transaction is done
        tx.oncomplete = function () {
            db.close();
        };
    }

}