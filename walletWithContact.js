var id = localStorage.getItem("ids");
var password= localStorage.getItem("password");

//walletWithContact()
function walletWithContact(contact, nick){

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
         


            obj2 = list.result.obj
            obj2.temp.cctivePage = "walletWithContact"
            obj2.temp.contact = contact
            setItem({ id: id, obj: obj2 })

            files = ['OIP.jpg'],
            ii = Math.floor(Math.random() * 1);

        
                var obj = [];
                
            

            
            
                files = ['Mulled Wine-Maple-Falls.jpg', 'vina-pena-white-wine.png', 'gran-sasso-montepulciano-dabruzzo.jpg', 'Cote_Mas_Rouge_Bottle.jpg', 'valle-secreto-private-cabernet-franc45.jpg'],
                    ii = Math.floor(Math.random() * 5);
            
                    if (contact == "0"){
                        head = `
                        <div id="header">
                        <div id="edit">
                       
                        <button  class="button" id="top-line"></button> 
                        </div>
                        </div>
                        `
                        obj.push(head)
                    } else {
                        head = `
                        <div id="header">
                        <div id="edit">
                       
                        
                        <button class="button-edit" id="button-edit" value="${contact}" onclick="edit(this.value)" >edit</button>
                        <button  class="button" id="top-line"></button> 
                        </div>
                        </div>
                        `
                        obj.push(head)
                    }
                    
                    
            
                    obj2.contacts.forEach(function(item,index){
                    
                        if (item["id"] == contact){
                            let chatMessages = item["wallet"].map(message => {
                                console.log(message)
                                let messageClass = message.id === contact ? 'from-contact' : 'to-contact' ;
                                return `
                                    <div class="chat-message ${messageClass}" >
                                    <span class="message-with-timestamp">${message.timestamp} ${message.sum} </span>
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
                                
                                    <div id="nav-button" onclick="contacts('${contact}','${nick}')">Contacts</div>
                                    <div id="nav-button" onclick="chatOfContact('${contact}','${nick}')">Chat</div>
                                    <div id="nav-button" onclick="getListOfContact('${contact}','${nick}')">List</div>
                                    <div id="nav-button" onclick="shedule('${contact}','${nick}')">Shedule</div>
                                </div>
                                `+ menu + `
                                <div id="wallet-input" onclick="myFunction()">S</div>
             
                                <input type="text" class="input" id="amount-input" autofocus="autofocus" placeholder=" to ${nick}" ></input>
                                <div  class="button" onclick="transmitWithContact('${contact}','${nick}')">send</div>
                                
                            </div>
                          
                            
                            </div>
                                `
            
            
                                
               
                navbar.push(navbarform)
                    document.querySelector('.navbar').innerHTML = navbar.join("");
                   
                   
                    document.querySelector('.render').innerHTML = obj.join("");
                    
          
             







        };


   
}
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
function transmitWithContact(contact,nick) {

    
console.log("contact",contact)
    let amount_input = Number(document.getElementById("amount-input").value)

    document.getElementById("amount-input").value = ""

    obj2.wallets.forEach(function(item,index){
        if (item["id"] == obj2.charTo){
          obj2.wallets[index]["balance"] -= amount_input
        
        }
        
    })

    obj2.contacts.forEach(function(item,index){
        if (item["id"] == contact){
           
        // Create a new Date object with the current timestamp
        var now = new Date();
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');

        item["wallet"].push({id:id, timestamp:hours+":"+minutes, sum: amount_input})
        obj2.transactions.push({timestamp:hours+":"+minutes, sum: amount_input})
        }
        
    })
    
    

    setItem({
        id: id, obj: obj2
    })
   
    var url = "ws://localhost:8080/send"
    var ws = new WebSocket(url);
    ws.onopen = function (e) {

        ws.send(JSON.stringify({ ids: id, password: obj2.password, idr: contact, sum: amount_input, coef: "1.62" }));
    }
    ws.onmessage = function (e) {
        msg = JSON.parse(e.data)
        console.log(msg)
    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }

    walletWithContact(contact, nick)


}