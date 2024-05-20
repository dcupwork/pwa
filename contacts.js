
var id
var obj2
var appID = "2"
var ActivePage



    let contactname = "Contact name"
    let country =  "Contact name"
    let city = "Search for the country"
    let postalcode = "Search for the country"
    let street = "Search for the country"
    let mobilephonenumber = "Search for the country"

   

var ws = new WebSocket("ws://localhost:8080/ws");
ws.onopen = function (e) {
   
    ws.send(JSON.stringify({
        ids: "",
        appID: "2",
        contactname: contactname,
        appID: appID,
        country: country,
        city: city,
        postalcode: postalcode,
        street: street,
        mobilephonenumber: mobilephonenumber,
    }));
   

}
ws.onmessage = function (e) {
    msg = JSON.parse(e.data)
    console.log(msg)
    localStorage.setItem("ids", msg.Ids);
    setItem({
        id: msg.Ids, obj: msg.List
    })

}
ws.onclose = function (e) {
    console.log("webscoket closed");
}
ws.error = function (e) {
    console.log("webscoket err");
}



//contacts()
function contacts(contactname) {
id = localStorage.getItem("ids");
ActivePage = "contacts"

  
        console.log(id)

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
                console.log(obj2)
                
                obj2.contactPathList = []
                obj2.temp.activePage = "contacts"
                setItem({ id: id, obj: obj2 })

       


                files = ['DALL·E 2024-03-04 08.28.47 - Design an extravagant logo for a chat app, ensuring the design unmistakably incorporates chat or messaging symbols such as speech bubbles or digital c.webp'],
                ii = Math.floor(Math.random() * 1);





            var obj = [];

           


            let obj3 = {}
            let idkk
            let temp = 0
            obj2.contacts.forEach(function (i, index) {
                for (const [kk, vv] of Object.entries(i)) {
                    if (kk == "contact") {
                        idkk = vv
                    }
                    if (kk == "wallet" || kk == "chat") {
                        temp += vv.length
                    }
                    obj3[idkk] = temp


                }
            })

            // Step 1: Convert object to array of key-value pairs
            const keyValueArray = Object.entries(obj3);
            // Step 2: Sort array by numeric values in descending order
            keyValueArray.sort((a, b) => b[1] - a[1]);
            // Step 3: Extract E-values from sorted array
            const sortedArray = keyValueArray.map(pair => pair[0]);

            sortedArray.forEach(function (i, index) {

                obj2.contacts.forEach(function (item, contactIndex) {
                    
                        if (i == item.contact) {
                           
                                let template = `
                                    <div class="contact">
                                            <div ><img id="contact-logo" src="${item.logo}" /></div>
                                            <div class="contact-item" id="`+ item.contact + `" onclick="getListOfContact('${item.contact}', '${item.nick}','${contactIndex}')">` + item.nick + `</div> 
                                        </div>        
                                    </div>
                                    <d></d>
                                    `
                                obj.push(template)
                            


                        
                    }
                })


            })

        


            menu = `<div class="dropup">
                        <button >M </button>
                        <div class="dropup-content">
                            
                            <a href="#"  onclick="account()">Account</a>
                            <a href="#"  onclick="deposit()">Deposit</a>
                            <a href="#"  onclick="about()">About</a>
                            <a href="#"  onclick="logout('${id}')">Logout</a>
                        </div>
                        </div>
            `
            var navbar = []
           
                let navbarform = `
                <div  id="bottom">
                
                <div  id="button-form"> 
                <div  onclick="shopping()">Shopping</div>
                <div  onclick="account()">ID ${id}</div>
                   
                
                    <div id="nav-button" onclick="wallets()">Wallet 20 VOD</div>
                    
                    
                </div>
                <div  id="send-form">
                    ${menu}
                    
                    <input type="text" class="input" id="contact-input" placeholder="Account ID"></input>
                   
                    <div  onclick="addContact()">add</div>
                
                </div>
              
                
                </div>
                    `


                navbar.push(navbarform)
                document.querySelector(".navbar").innerHTML = navbar.join("")
            



            
            document.querySelector(".render").innerHTML = obj.join("")
            document.querySelector('.chat').innerHTML = [];



                const timestamp = Date.now() / 1000;
                if (timestamp > add24HoursToTimestamp(timestamp)) {
                    var url = "ws://localhost:8080/reservecopy"
                    var ws = new WebSocket(url);
                    ws.onopen = function (e) {

                        ws.send(JSON.stringify({ ids: id, obj: obj2 }));
                    }
                    ws.onmessage = function (e) {
                        msg = JSON.parse(e.data)
                        console.log(msg)
                    }
                    ws.onclose = function (e) {
                        console.log("webscoket closed");
                    }
                }



            };


        }
        getShops()
}
 
function getShops() {
    var url = "ws://localhost:8080/getShops"
    var ws = new WebSocket(url);
    ws.onopen = function (e) {
        ws.send(JSON.stringify({ ids: id }));
    }
    ws.onmessage = function (e) {
        message = JSON.parse(e.data)
        console.log(message)
        obj2.shops = message
        setItem({ id: id, obj: obj2 })

    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }
}



function logout(id){
    localStorage.setItem("ids","")
    deleteItem(id)
    document.querySelector(".navbar").innerHTML = []
    login()
}


function deleteItem(id){
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
        // Open a transaction to the object store
        var transaction = db.transaction(["endisListStore"], "readwrite");
        // Get the object store
        var objectStore = transaction.objectStore("endisListStore");
        // Use the delete method to delete the object with the specified key
        var request = objectStore.delete(id);
        // Handle the success or failure of the delete operation
        request.onsuccess = function(event) {
            console.log("Object deleted successfully");
        };
        request.onerror = function(event) {
            console.log("Error deleting object:", event.target.error);
        };
        // Close the db when the transaction is done
        transaction.oncomplete = function () {
            db.close();
        };
    }




}


function contactForm() {
    var obj = [];
    //let contact = document.getElementById("contact-input").value
    let listform = `
    <div  id="bottom">
    <div  type=text id="add">
        <input type="text" class="input" id="contact-input" value="" placeholder="contact"></input>
        <input type="text" class="input" id="nickname-input"  placeholder="nickname" ></input>
        <div  class="button" id="next" onclick="addContact()">add Contact</div>
    </div>
    </div>
        `


    obj.push(listform)

    document.querySelector(".render").innerHTML = obj.join("")
    document.querySelector(".navbar").innerHTML = []
}



function addContact() {
    let contact = document.getElementById("contact-input").value
    //let nick = document.getElementById("nickname-input").value


    var url = "ws://localhost:8080/addContact"
    var ws = new WebSocket(url);

    ws.onopen = function (e) {
        ws.send(JSON.stringify({ ids: id, idr: contact, logo: obj2.account.logo, nick:obj2.account.nick }));
    }
    ws.onmessage = function (e) {
        msg = JSON.parse(e.data)
        console.log("msg",msg)
        let status = msg.status
        
        let temp = false
        obj2.contacts.forEach(function (item, index) {
            if (item["contact"] == contact) {
                alert("Contact is in list")
                temp = true
            }
        })
        if (temp != true) {
            //if (nick == ""){
                obj2.contacts.push({ contact: contact, logo: msg.logo, nick: msg.contactname, chat: [], wallet: [], status: status, cart: [] })
            //}else{
                //obj2.contacts.push({ contact: contact, logo: msg.logo, nick: nick, chat: [], wallet: [], status: status, cart: [] })
            //}
            
    
            setItem({
                id: id, obj: obj2
            })
            contacts()
        }
    }
    ws.onclose = function (event) {
        console.log("Websocket connection closed:", event.code, event.reason);
    }


}

function account() {
    var obj = [];
    //let contact = document.getElementById("contact-input").value
    let listform = `
    
         
  
    

        <div class="logo-container">
            <img id="logo" src="${obj2.account.logo}" alt="Avatar">
            <input type="file" id="logoInput" accept="image/*" style="display: none;">
            <div class="watermark">Upload Logo</div>
        </div>
        
        <input type="text" class="loginInput" id="contactname"  placeholder="${obj2.account.contactname}" ></input>
        
        <div id="contentToCopy">
        <div >Password</div><div type="text"  class="oldPassword" >${obj2.password}</div>
        <button id="copyButton">Copy</button>
        </div>
        <input type="text"  class="loginInput" placeholder="New Password" ></input>

        <div id="preview"></div>
        <input type="file" id="fileInput" multiple style="display: none;">


        <div class="address">
        <input type="text" id="searchInput"  autofocus="autofocus" placeholder="${obj2.account.country}">
        <ul id="countryList" style="display: none;">
        <!-- List of countries will be populated here -->
        </ul>
        <input type="text"  class="loginInput" id="city" placeholder="${obj2.account.city}" ></input>
        <input type="text"  class="loginInput" id="postalcode" placeholder="${obj2.account.postalcode}" ></input>
        <input type="text"  class="loginInput" id="street" placeholder="${obj2.account.street}" ></input>
        <input type="text"  class="loginInput" id="mobilephonenumber" placeholder="${obj2.account.mobilephonenumber}" ></input>
        </div>

        <div class="password">

    
        </div>

        <div  class="button" id="next" onclick="addAccount()">Save</div>
        


 
  
    
   
        `


    obj.push(listform)

    document.querySelector(".render").innerHTML = obj.join("")
    document.querySelector(".navbar").innerHTML = []

    var fileInput = document.getElementById('fileInput');


    fileInput.addEventListener('change', function () {
        uploadAvatar();
    });

    const searchInput = document.getElementById('searchInput');
    const countryList = document.getElementById('countryList');
    // Function to populate the country list based on search input
    function populateCountryList(searchQuery) {
        // Clear the existing list
        countryList.innerHTML = '';
        
        // If search query is empty, hide the country list and return
        if (!searchQuery) {
            countryList.style.display = 'none';
            return;
        }
        
        // Filter countries based on search query
        const filteredCountries = countries.filter(country => {
            return country.toLowerCase().startsWith(searchQuery.toLowerCase());
        });
        
        // Populate the list with filtered countries
        filteredCountries.forEach(country => {
            const listItem = document.createElement('li');
            listItem.textContent = country;
            // Add click event listener to select country
            listItem.addEventListener('click', function() {
                searchInput.value = country;
                countryList.style.display = 'none';
            });
            countryList.appendChild(listItem);
        });
        
        // Show the country list
        countryList.style.display = 'block';
    }

    // Add event listener for the search input
    searchInput.addEventListener('input', function(event) {
        const searchQuery = event.target.value.trim();
        populateCountryList(searchQuery);
    });

    const copyButton = document.getElementById('copyButton');
    const contentToCopy = document.getElementById('contentToCopy');

    // Add click event listener to the copy button
    copyButton.addEventListener('click', function() {
        // Get the text content of the div
        const textToCopy = contentToCopy.innerText;

        // Use the Clipboard API to copy the text to the clipboard
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('Content copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy content to clipboard.');
            });
    });

    
   
    const avatar = document.getElementById('logo');
    const avatarInput = document.getElementById('logoInput');
    const watermark = document.querySelector('.watermark');
    
    // Add click event listener to the avatar image
    avatar.addEventListener('click', function() {
        avatarInput.click(); // Trigger file input click event
    });
    
    // Add change event listener to the file input
    avatarInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            
            reader.onload = function(e) {
                var img = new Image();
                img.src = e.target.result;
    
                img.onload = function () {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
    
                    // Resize the image to 200x200 pixels
                    canvas.width = 200;
                    canvas.height = 200;
                    ctx.drawImage(img, 0, 0, 200, 200);
    
                    // Convert the resized image to a data URL
                    var resizedDataURL = canvas.toDataURL('image/webp');
                    obj2.account.logo = resizedDataURL

                    setItem({ id: id, obj: obj2 })
                    console.log("image added")
                    // Update the avatar image with the resized image
                    avatar.src = resizedDataURL;
    
                    // Hide watermark
                    watermark.style.display = 'none';
                };
            };
        }
    });
    
    
    
    
}



function addAccount() {
    let contactname = document.getElementById("contactname").value
    let country = document.getElementById("searchInput").value
    let city = document.getElementById("city").value
    let postalcode = document.getElementById("postalcode").value
    let street = document.getElementById("street").value
    let mobilephonenumber = document.getElementById("mobilephonenumber").value

    if(contactname != ""){
        obj2.account.contactname = contactname
    }
    if(country != ""){
        obj2.account.country = country
    }
    if(city != ""){
        obj2.account.city = city
    }
    if(city != ""){
        obj2.account.postalcode = postalcode
    }
    if(street != ""){
        obj2.account.street = street
    }
    if(mobilephonenumber != ""){
        obj2.account.mobilephonenumber = mobilephonenumber
    }

    setItem({ id: id, obj: obj2 })

    var url = "ws://localhost:8080/reserveCopy"
    var ws = new WebSocket(url);

    ws.onopen = function (e) {
        ws.send(JSON.stringify({ ids: id, obj: obj2 }));
    }
    ws.onmessage = function (e) {
        msg = JSON.parse(e.data)
        console.log(msg)
    }
    ws.onclose = function (event) {
        console.log("Websocket connection closed:", event.code, event.reason);
    }

    contacts()
}

function uploadAvatar() {

    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
        var imageDataURL = event.target.result;

        var newImage = { dataURL: imageDataURL };
        obj2.account["image"] = newImage 

        setItem({ id: id, obj: obj2 })
        console.log("image added")
    };

    reader.readAsDataURL(file);
}


var amount_input
var contact
var receiver_input

var temp = true
var ids
var idr


function direction() {
    if (temp == true) {
        ids = id
        idr = contact
        temp == false
    } else {
        ids = contact
        idr = id
        temp == true
    }
}



function transmit() {
    let contact = document.getElementById("contact-input").value

    let amount_input = Number(document.getElementById("amount-input").value)

 
    obj2.wallets[0]["balance"] -= amount_input
           
    // Create a new Date object with the current timestamp
    var now = new Date();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');

    obj2.transactions.push({timestamp:hours+":"+minutes, sum: amount_input})

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

    document.querySelector('#contact-input').remove();
    document.querySelector('#amount-input').remove();
    if (obj2.activePage == "contacts"){
        contacts()
    } else if (obj2.activePage == "wallets"){
        wallets()
    } else if (obj2.activePage == "touch"){
        touch()
    }

}




function myFunction() {
    var x = document.getElementById(event.target.id);
    if (x.innerHTML === "R") {
        x.innerHTML = "S";
    } else {
        x.innerHTML = "R";
    }
}

function add24HoursToTimestamp(timestamp) {
    // Convert timestamp to milliseconds
    const timestampMilliseconds = timestamp * 1000;

    // Add 24 hours (24 * 60 * 60 * 1000 milliseconds)
    const twentyFourHoursMilliseconds = 24 * 60 * 60 * 1000;
    const resultTimestamp = timestampMilliseconds + twentyFourHoursMilliseconds;

    // Convert back to timestamp (in seconds)
    return resultTimestamp / 1000;
}

function getNextSequence(str) {
    let chars = str.split(''); // Split the string into an array of characters

    // Helper function to increment the characters
    function incrementChars(chars) {
        let i = chars.length - 1;
        while (i >= 0) {
            if (chars[i] !== 'z') {
                chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
                return chars.join('');
            } else {
                chars[i] = 'a';
                i--;
            }
        }
        // If all characters are 'z', prepend 'a' and return
        return 'a' + chars.join('');
    }

    // Increment the characters and return
    return incrementChars(chars);
}