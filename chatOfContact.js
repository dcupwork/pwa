var id = localStorage.getItem("ids");

//chatOfContact()
function chatOfContact(contact,nick){
    console.log(contact)
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    // Open (or create) the database
    var open = indexedDB.open("MyDatabase", 1);
    // Create the schema
    open.onupgradeneeded = function () {
        var db = open.result;
        db.createObjectStore("endisListStore", { keyPath: 'id' });
    };
    open.onsuccess = function () {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("endisListStore", "readwrite");
        var store = tx.objectStore("endisListStore");
        let list = store.get(id);



        list.onsuccess = (event) => {



            var url = "ws://localhost:8080/ws"
            var ws = new WebSocket(url);
            ws.onopen = function (e) {
                ws.send(JSON.stringify({ ids: id}));
                
      
            }
            ws.onmessage = function (e) {
                message = JSON.parse(e.data)
            
    
              



                
    
    
                
               
            }
            ws.onclose = function (e) {
                console.log("webscoket closed");
            }
         

            var obj2 = list.result.obj

            files = ['OIP.jpg'],
            ii = Math.floor(Math.random() * 1);
 
        
                var obj = [];
                
            

            
                files = ['Mulled Wine-Maple-Falls.jpg', 'vina-pena-white-wine.png', 'gran-sasso-montepulciano-dabruzzo.jpg', 'Cote_Mas_Rouge_Bottle.jpg', 'valle-secreto-private-cabernet-franc45.jpg'],
                    ii = Math.floor(Math.random() * 5);
           
                 
              
                    
                    obj2.contacts.forEach(function(item,index){
                        if (item["id"] == contact){
                            let chatMessages = item["chat"].map(message => {
                                let messageClass = message.id === contact ? 'from-contact' : 'to-contact' ;
                                return `
                                    <div class="chat-message ${messageClass}" >
                                    <span class="message-with-timestamp">${message.timestamp} ${message.message} </span>
                                    </div>
                                `;
                            });
                            document.querySelector('.chat').innerHTML = chatMessages.join("");
                        }
                    })
                  
            
                       

              
                    var navbar = []
                    let navbarform = `
                            <div  id="bottom">
                            <button  class="button" id="bottom-line"></button>
                    
                            <div  type=text id="contact-form">
                            
                                <div  type=text id="button-form">
                                
                                    <div id="nav-button" onclick="contacts()">Contacts</div>
                                    <div id="${contact}" onclick="walletWithContact('${contact}','${nick}')">Wallet</div>
                                    <div id="${contact}" onclick="listOfContact(this.id)">List</div>
                                    <div id="${contact}" onclick="shedule(this.id)">Shedule</div>
                                </div>
                                `+ menu + `
                                <div id="wallet-input" onclick="myFunction()"></div>
             
                                <input type="text" class="input" id="message-input" autofocus="autofocus" placeholder=" message to ${nick}" ></input>
                                <button  class="button" id="${contact}" onclick="sendMessage(this.id)">send</button>
                                
                            </div>
                          
                            
                            </div>
                                `
            
            
                                
               
                navbar.push(navbarform)
                    document.querySelector('.navbar').innerHTML = navbar.join("");
                   
                    
                    








        };


   
}
}
function sendMessage(contact){
 let message = document.querySelector('#message-input').value

// Create a new Date object with the current timestamp
var now = new Date();

// Get the hours and minutes from the current timestamp
// Get the hours and minutes from the current timestamp and format with leading zeros
var hours = String(now.getHours()).padStart(2, '0');
var minutes = String(now.getMinutes()).padStart(2, '0');

obj2.contacts.forEach(function(item,index){
    console.log(item["id"],contact)
if (item["id"] == contact){
    item["chat"].push({id:"20", timestamp:hours+":"+minutes, message: message, status:"delivered"})

}
})


    setItem({
        id: id, obj: obj2
    })
    chatOfContact(contact)

}
function edit(contact) {
    var obj = [];
    //let contact = document.getElementById("contact-input").value

        let listform = `
        <div  id="bottom">
             
        <div  type=text id="editContact">
        
           
            <input type="text" class="input" id="contact-input" value="${contact}" placeholder="contact"></input>
            <input type="text" class="input" id="nickname-input"  placeholder="nickname" ></input>
            <div  class="button" id="${contact}" onclick="editContact(this.id)">edit</div>
            <div  class="button" id="${contact}" onclick="deleteContact(this.id)">delete</div>
        </div>
      
        
        </div>
            `
            obj.push(listform)

            document.querySelector(".contacts").innerHTML = obj.join("")
            document.querySelector(".navbar").innerHTML = []
    



 
}

function editContact(contact) {
 
    let nick = document.getElementById("nickname-input").value

    obj2.contacts.forEach(function(item,index){
        if (item["id"] == contact){
            item["nick"] = nick;
        }
    })

    setItem({
        id: id, obj: obj2
    })
    contacts()

}

function deleteContact(contact){
    console.log(contact)
    obj2.contacts.forEach(function(item,index){
        if (item["id"] == contact){
            obj2.contacts.splice(index, 1);
        }
    })
    setItem({
        id: id, obj: obj2
    })
    contacts()


}
