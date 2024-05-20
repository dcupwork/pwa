
// Subscribe to a id
var id = localStorage.getItem("ids");
var obj2
//wallets()
function wallets() {
         
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

            obj2 = list.result.obj
            obj2.activePage = "wallets"
            setItem({id:id,obj:obj2})




            files = ['Mulled Wine-Maple-Falls.jpg', 'vina-pena-white-wine.png', 'gran-sasso-montepulciano-dabruzzo.jpg', 'Cote_Mas_Rouge_Bottle.jpg', 'valle-secreto-private-cabernet-franc45.jpg'],
                ii = Math.floor(Math.random() * 5);
            
                
                var wallets = []
              
                
                obj2.wallets.forEach(function (item, index) {

                    let fontSize = (String(item["balance"]).length > 8) ? 12 : 32;
                    
                    if (obj2.charFrom && obj2.charTo){
                        if (item["id"] == obj2.charFrom) {
                            let template = `
                            <div class="template"  >    
                                    <div class="walletItem" >
                                        <div class="wallet-item" id=${item["id"]} style="font-size: 26px;" onclick="changeDirection('${item["id"]}')"><span style="font-size: 16px; ">from </span></div>
                                        <div class="wallet-item" style="font-size: ${fontSize}px; margin-top: 30px" onclick="changeDirection('${item["id"]}')">${item["balance"]}</div>
                                    </div>
                            </div>
                            `
                            wallets.push(template)
    
                        } else if (item["id"] == obj2.charTo) {
    
                            let template = `
                            <div class="template">    
                                    <div class="walletItem">
                                        <div class="wallet-item" id=${item["id"]} style="font-size: 26px;" onclick="changeDirection('${item["id"]}')"><span style="font-size: 16px; ">to </span></div>
                                        <div class="wallet-item" style="font-size: ${fontSize}px; margin-top: 30px" onclick="changeDirection('${item["id"]}')" >${item["balance"]}</div>
                                    </div>
                            </div> 
                            `
                            wallets.push(template)
    
                        } else {
                            let template = `
                            <div class="template">    
                                    <div class="walletItem">
                                        <div class="wallet-item" id=${item["id"]} style="font-size: 26px;" onclick="changeDirection('${item["id"]}')">${item["id"]}</div>
                                        <div class="wallet-item" style="font-size: ${fontSize}px; margin-top: 30px" onclick="changeDirection('${item["id"]}')">${item["balance"]}</div>
                                    </div>
                            </div>  
                            `
                            wallets.push(template)
                        }
                    } else if (obj2.charFrom && obj2.charTo == null){
                        if (item["id"] == obj2.charFrom) {
                            let template = `
                            <div class="template"  >    
                                    <div class="walletItem" >
                                        <div class="wallet-item" id=${item["id"]} style="font-size: 26px;" onclick="changeDirection('${item["id"]}')"><span style="font-size: 16px; ">from </span></div>
                                        <div class="wallet-item" style="font-size: ${fontSize}px; margin-top: 30px" onclick="changeDirection('${item["id"]}')">${item["balance"]}</div>
                                    </div>
                            </div>
                            `
                            wallets.push(template)
    
                        } else {
                            let template = `
                            <div class="template">    
                                    <div class="walletItem">
                                        <div class="wallet-item" id=${item["id"]} style="font-size: 26px;" onclick="changeDirection('${item["id"]}')">${item["id"]}</div>
                                        <div class="wallet-item" style="font-size: ${fontSize}px; margin-top: 30px" onclick="changeDirection('${item["id"]}')" >${item["balance"]}</div>
                                    </div>
                            </div>  
                            `
                            wallets.push(template)
                        }

                    }

                   
                


            })

            let containerWallet = `
            <div  id="containerWallet"></div>
                `


            wallets.push(containerWallet)

            let addWallet = `
              
                    <div  id="addWallet">
                        <div  onclick="removeWallet()">-</div>
                        <div  onclick="addWallet()">+</div> 
                    </div>
                  
                    
                    
                        `


            wallets.push(addWallet)
            
                var navbar = []
                if(obj2.charTo){
                    let navbarform = `
                    <div  id="bottom">
                    <div  id="button-form">      
                    
                    <div id="nav-button" onclick="contacts()">Main</div>
                    <div  onclick="wallets()">Wallet ${obj2.wallets[0].balance} VOD</div>
                    <div id="nav-button" onclick="touch()">Touch</div>
                    </div>
                    <div  id="between-form">
                        ${menu}
                        <input type="text" class="input" id="amount-input" placeholder=" From ${obj2.charFrom} to ${obj2.charTo}"></input>
                        <div  onclick="betweenAccs()">send</div>
                    
                    </div>
                    </div>
                    `
                    navbar.push(navbarform)
                }else{
                    let navbarform = `
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
                    navbar.push(navbarform)
                }



                
                document.querySelector(".navbar").innerHTML = navbar.join("")

                document.querySelector(".render").innerHTML = wallets.join("")
                document.querySelector(".container").innerHTML = []
                








        };

        
        // Close the db when the transaction is done
        tx.oncomplete = function () {
            db.close();
        };

    }
        

 


            var toggler = document.getElementsByClassName("message");

            var i;

            for (i = 0; i < toggler.length; i++) {
                toggler[i].addEventListener("dblclick", function () {
                    this.parentElement.querySelector(".nested").classList.toggle("active");
                    this.classList.toggle("caret-down");
                });
            }

            //let receiver = document.getElementById("receiver-input").value;

            var switcher = document.getElementsByClassName("message")

            for (i = 0; i < switcher.length; i++) {

                switcher[i].addEventListener("click", function (e) {
                    digits = e.target.id
                    clear()
                    this.style.backgroundColor = 'rgb(255, 255, 255)'
                });
            }

            function clear() {
                for (var i = 0; i < switcher.length; i++) {
                    var item = switcher[i];
                    item.style.backgroundColor = 'rgb(223, 221, 221)';
                }
            }




            
        }



    
//мессенжер с автоматической регистрацией

function addWallet() {
    let char = getNextSequence(obj2.walletsChar)

    obj2.wallets.push({ id: char, balance: 0, history: {} })
    obj2.walletsChar = char
    setItem({
        id: id, obj: obj2
    })

    var url = "ws://localhost:8080/addWallet"
    var ws = new WebSocket(url);
    ws.onopen = function (e) {

        ws.send(JSON.stringify({ ids: id, password: password, wallet: obj2.walletsChar }));
    }
    ws.onmessage = function (e) {
        msg = e.data
        console.log(msg)
    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }
    wallets()
}

function removeWallet(){
    obj2.wallets.pop()
    obj2.walletsChar = obj2.wallets[obj2.wallets.length-1].id
    setItem({
        id: id, obj: obj2
    })

    var url = "ws://localhost:8080/removeWallet"
    var ws = new WebSocket(url);
    ws.onopen = function (e) {

        ws.send(JSON.stringify({ ids: id, password: password}));
    }
    ws.onmessage = function (e) {
        msg = e.data
        console.log(msg)
    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }

    wallets()
}

function betweenAccs() {
    let amount_input = Number(document.getElementById("amount-input").value)

    if (!obj2.charTo){
        alert("choose To")
    } else {
        var indexCharFrom
        var indexCharTo
        obj2.wallets.forEach(function (item, index) {
            if (item["id"] == obj2.charFrom) {
                indexCharFrom = index
            }
            if (item["id"] == obj2.charTo) {
                indexCharTo = index
            }
        })
        if (obj2.wallets[indexCharFrom]["balance"] >= amount_input) {
            obj2.wallets[indexCharFrom]["balance"] -= amount_input
            obj2.wallets[indexCharTo]["balance"] += amount_input
        } else {
            console.log("money enough")
        }
        setItem({
            id: id, obj: obj2
        })
    
        var url = "ws://localhost:8080/betweenAccs"
        var ws = new WebSocket(url);
        ws.onopen = function (e) {
    
            ws.send(JSON.stringify({ ids: id, password: password, sum: amount_input }));
        }
        ws.onmessage = function (e) {
            msg = JSON.parse(e.data)
            console.log(msg)
        }
        ws.onclose = function (e) {
            console.log("webscoket closed");
        }
    
        wallets()
    }
}

function setItem(value) {
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

    // Open (or create) the database
    var open = indexedDB.open("MyDatabase", 1);

    // Create the schema
    open.onupgradeneeded = function () {
        var db = open.result;
        db.createObjectStore("endisListStore", { keyPath: "id", autoIncrement: true });

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

function getNextSequence(current) {
    if (current === '') return 'a'; // Edge case, if the current string is empty, return 'aa'

    let lastChar = current.charAt(current.length - 1); // Get the last character of the current sequence
    let prefix = current.substring(0, current.length - 1); // Get the prefix before the last character

    // If the last character is 'z', recursively get the next sequence for the prefix and append 'a'
    if (lastChar === 'z') {
        return getNextSequence(prefix) + 'a';
    } else {
        // Increment the last character and return the updated sequence
        return prefix + String.fromCharCode(lastChar.charCodeAt(0) + 1);
    }
}



