var id = localStorage.getItem("ids");


function contact(){
  
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
            
    
              



                
    
    
                
                console.log(message)
            }
            ws.onclose = function (e) {
                console.log("webscoket closed");
            }
         

            var obj2 = list.result.obj

            files = ['OIP.jpg'],
            ii = Math.floor(Math.random() * 1);

        var wallets = []
        var idWallet
        obj2.wallets.forEach(function (i, index) {

            for (const [kk, vv] of Object.entries(i)) {


                if (kk == 'id') {
                    idWallet = vv
                }
                if(idWallet == "a" && kk != 'history' && kk != 'id'){
                    let template = `
                    <div class="template">    
                            <div class="walletItem">
                                <div class="wallet-item" id=`+ idWallet + ` style="font-size: 26px;" onclick="changeDirection(this.id)"><span style="font-size: 10px; align-items: center;">from </span>` + idWallet + `</div>
                                <div class="wallet-item" style="font-size: 10px; margin-top: 30px" >` + vv + `</div>
                       
                            </div>
                    </div> 
                              
                    <d></d>
                    
                    `
                wallets.push(template) 

                } else if (kk != 'history' && kk != 'id') {
                    let template = `
                        <div class="template">    
                                <div class="walletItem">
                                    <div class="wallet-item" id=`+ idWallet + ` style="font-size: 26px;" onclick="changeDirection(this.id)">` + idWallet + `</div>
                                    <div class="wallet-item" style="font-size: 10px; margin-top: 30px" >` + vv + `</div>
                           
                                </div>
                        </div> 
                                  
                        <d></d>
                        
                        `



                    wallets.push(template)


                };
            }


        })

        let containerWallet = `
        <div  id="containerWallet"></div>
            `


        wallets.push(containerWallet)

        let addWallet = `
          
                <div  id="addWallet">
                    <div  onclick="addWallet()">+</div>
                    
                    </div>
              
                
                
                    `


        wallets.push(addWallet)
        
                var obj = [];
                
 
            
                files = ['Mulled Wine-Maple-Falls.jpg', 'vina-pena-white-wine.png', 'gran-sasso-montepulciano-dabruzzo.jpg', 'Cote_Mas_Rouge_Bottle.jpg', 'valle-secreto-private-cabernet-franc45.jpg'],
                    ii = Math.floor(Math.random() * 5);
            
            
                    head = `
                    <div id="header">
                    <div id="edit">
                    <div id="basic" id="button-edit" value="" onclick="" >basic 0</div>
                    
                    <button class="button-edit" id="button-edit" value="" onclick="edit()" >edit</button>
                    <button  class="button" id="top-line"></button> 
                    </div>
                    </div>
                    `
                    obj.push(head)
            
                    let template = `
                    <div class="message-item" id=""><p></p></div>
                    
                    `
                    obj.push(template)
            
                        obj2.contacts.forEach(function (i, index) {
                        for (const [kk, vv] of Object.entries(i)) {
                            if (kk == event.target.id){
                                vv.wallet.forEach(function (i, index) {
                                    for (const [kkk, vvv] of Object.entries(i)) {
                                    let template = ``+ vvv + ` <p></p> `
                                    
                                    obj[1] = obj[1].replace('<p></p>', template);
                                    }
                                })     
                            }     
                        }
                        })


              
                    var navbar = []
                    let navbarform = `
                            <div  id="bottom">
                            <button  class="button" id="bottom-line"></button>
                    
                            <div  type=text id="chat-form">
                            
                                <div  type=text id="button-form">
                                
                                    
                                    <div id="nav-button" onclick="listOfContact()">list</div>
                                </div>
                                `+ menu + `
                                <div id="wallet-input" onclick="myFunction()">S</div>
             
                                <input type="text" class="input" id="amount-input" autofocus="autofocus" placeholder=" amount" ></input>
                                <div  class="button" id="${event.target.id}" onclick="transmitW()">send</div>
                                
                            </div>
                          
                            
                            </div>
                                `
            
            
                                
               
                navbar.push(navbarform)
                    document.querySelector('.navbar').innerHTML = navbar.join("");
                   
                    document.querySelector('.wallets').innerHTML = wallets.join("");
                    document.querySelector('.contacts').innerHTML = obj.join("");
          








        };


   
}
}




  function transmitW() {
  
    var contac = event.target.id

    let amount_input = Number(document.getElementById("amount-input").value)

    let message = document.getElementById('bottom')

    let div = document.createElement('div')
    div.innerHTML = `
                    <form type=text id="chat-form" >
                    `+menu+`
                    <div id="myDIV" onclick="myFunction()">S</div>
                        <input type="text" class="input" id="amount-input" placeholder=" amount"></input>
                        <div  onclick="transmitW()">send</div>
                    </form>
                        `
    message.appendChild(div)

    var url = "ws://localhost:8080/send"
    var ws = new WebSocket(url);
    ws.onopen = function (e) {
        ws.send(JSON.stringify({ ids: id, idss: "aa", password: localStorage.getItem("password"), idr: idr, idrs: "aa", sum: amount_input, coef: "1.62" }));
    }
    ws.onmessage = function (e) {
        console.log(e.data);
    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }

 
        sum = document.getElementById('amount-input').value
        
            
        let obj2 = JSON.parse(localStorage.getItem("obj"))
        // Find the contact with the given ID
        const contact = obj2.find(c => c[contac]);
        // Access the wallet array of that contact and push the new object into it
        
        contact[contac].wallet.push({"name":sum});
    
        
        localStorage.setItem("obj",JSON.stringify(obj2))

       
        const chatBox = document.getElementById('render');
        const messageInput = document.getElementById('amount-input');
        document.querySelector('#amount-input').remove();
          const mess = messageInput.value;
      
          if (mess !== '') {
            appendMessage(mess);
         
            messageInput.value = '';
          }
      
        
      
        function appendMessage(mess) {
          const messageElement = document.createElement('div');
          messageElement.innerText = mess;
          chatBox.prepend(messageElement);
        }
         


}
