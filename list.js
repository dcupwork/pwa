var id = localStorage.getItem("ids");

function getList(){
    var url = "ws://localhost:8080/getList"
    var ws = new WebSocket(url);
    ws.onopen = function (e) {
        ws.send(JSON.stringify({ ids: id}));
    }
    ws.onmessage = function (e) {
        message = JSON.parse(e.data)
        obj2.list = message
        setItem({ id: id, obj: obj2 })
        list()
    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }
}

function list() {
    productt()
 

            var obj = [];
           
            obj2.images = []
            setItem({ id: id, obj: obj2 })

            let product_container = `<div class="product-container"></div>`
            obj.push(product_container)
        
            backButton = `
            <div class="backButton">
                <button  onclick="back()">Back</button> 
            </div>
            `
            obj.push(backButton)
            document.querySelector(".render").innerHTML = obj.join("");

            let path = buildPath(obj2.list, obj2.pathList);
            console.log(path)
            path.forEach(function (item, index) {


                if (!item["productDesc"]) {
                    let template = `
                    <div class="group">
                        <div class="item1" onclick="group(${index})">${item["groupName"]}</div>
                        <div class="item2" style="position:absolute; right:20%" onclick="deleteGroup(${index})">Delete</div>
                    </div>
                    `
                    obj.push(template)
                    
                }
            })

            var objp = []
            path.forEach(function (item, productIndex) {
                if (!item["groupName"]) {
                    let product = `
                    
                        <div class="carousel">
                            <p></p>
                        </div>
                        <p class="description">${item["productDesc"]}</p>
                        <div class="product-details">
                            <div class="price">Price ${item["price"]}</div>
                            <div class="deleteProduct" onclick="deleteProduct('${productIndex}')"> Delete </div>
                        </div>
                        </div>
                       
                   
                    `
                    objp.push(product)
                    item.imagesData.forEach(function (image, index) {
                        if (item.imagesData.length-1 == index) {
                            let images = `<div><img src="${image.imageDataURL}" alt="Photo ${index}" onclick="product('${productIndex}','${contact}')"></div>`
                            objp[productIndex] = objp[productIndex].replace('<p></p>', images);
                        } else {
                            let images = `<div><img src="${image.imageDataURL}" alt="Photo ${index}" onclick="product('${productIndex}','${contact}')"></div>
                            <p></p>`
                            objp[productIndex] = objp[productIndex].replace('<p></p>', images);
                        }
                       
                    })
                }
                
                let message = document.getElementsByClassName('product-container')[0];
                let div = document.createElement('div');
                div.className = 'product'
                div.innerHTML = objp[productIndex];
                message.appendChild(div);
                
                // Initialize Slick carousel after a slight delay
                setTimeout(function() {
                    $('#carousel' + productIndex).slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true // Set to false if you don't want navigation dots
                    });
                }, 1);
            })





            let delivery = ` 
            <div  id="delivery">
                <div  onclick="delivery()"> Delivery</div>
                
            </div>
            `


            obj.push(delivery)




            var navbar = []
            let navbarform = `
                            <div id="bottom">
                            <div  type=text id="button-form">           
                                
                                
                          
                                <div id="nav-button" onclick="contacts()">Contacts</div>
                                <div  onclick="wallets()"> ${obj2.wallets[0].balance}</div>
                            </div>
                            <div  type=text id="list-form">
                                `+ menu + `
                                <div  class="button"  onclick="groupForm()">Add Group</div>
                                <div  class="button"  onclick="productForm('${id}','${obj2.account.nick}')">Add Product</div>
                                
                                
                            </div>
                          
                            
                            </div>
                                `


            navbar.push(navbarform)
            document.querySelector(".navbar").innerHTML = navbar.join("")

            $(document).ready(function () {
                $('.carousel').slick({
                    // Add any configuration options here
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true // Set to false if you don't want navigation dots
                });
            });

            //document.querySelector(".render").innerHTML = obj.join("");
            document.querySelector(".transactions").innerHTML = []

        };
    




function deleteGroup(index) {
    let path = buildPath(obj2.list, obj2.pathList);
    path.splice(index, 1);
    setItem({ id: id, obj: obj2 })
    list()
}
function deleteProduct(index) {
    let path = buildPath(obj2.list, obj2.pathList);
    path.splice(index, 1);
    setItem({ id: id, obj: obj2 })
    list()
}

function group(index) {
    obj2.pathList.push(Number(index))
    obj2.pathList.push("children")
    setItem({ id: id, obj: obj2 })
    list()
}

function back() {
    obj2.pathList.pop()
    obj2.pathList.pop()
    setItem({ id: id, obj: obj2 })
    if (obj2.pathList.length == 0) {
        contacts()
    } else {
        list()
    }

}

function groupForm() {
    var obj = []
    let group = ` 
    <div  id="group">
        <input type="text" class="input" id="group-name-input" placeholder=" group name" ></input>
        <div  onclick="addGroup()"> Add Group</div>
        
    </div>
    `
    obj.push(group)
    document.querySelector(".render").innerHTML = obj.join("");

}
// Function to add groups, subgroups, and items
function addGroup() {
    let name = document.getElementById("group-name-input").value
    let path = buildPath(obj2.list, obj2.pathList);
    let group = { groupName: name, children: [] };
    path.unshift(group);
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

    list()
}
let imgs = [{imageDataURL:"data:image/webp;base64,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"},{imageDataURL:"data:image/webp;base64,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"}]
function productt() {
 
    for (let i=0;i<10;i++){
       
        let product = { productDesc: "taratora", price: 10, imagesData: imgs, feedbacks: [], quantity: 1, contacts: [] };
        obj2.list.push(product);
       
    }

    setItem({ id: id, obj: obj2 })

    var url = "ws://localhost:8080/reserveCopy"
    var ws = new WebSocket(url);

    ws.onopen = function (e) {
        console.log(obj2)
        ws.send(JSON.stringify({ ids: id, obj: obj2 }));
    }
    ws.onmessage = function (e) {
        msg = JSON.parse(e.data)
        console.log(msg)
    }
    ws.onclose = function (event) {
        console.log("Websocket connection closed:", event.code, event.reason);
    }
}


// Function to add items to a group
function addProduct(id, nick) {
    let description = document.getElementById("description-input").value
    let price = document.getElementById("price-input").value
    let path = buildPath(obj2.list, obj2.pathList);
    let product = { productDesc: description, price: price, imagesData: obj2.images, feedbacks: [], quantity: 1, contacts: [] };
    path.push(product);
 
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

    list()
}

// Function to build the path dynamically
function buildPath(array, indices) {
    let current = array;
    for (let i = 0; i < indices.length; i++) {
        if (typeof indices[i] === 'number') {
            current = current[indices[i]];
        } else if (typeof indices[i] === 'string') {
            current = current.children;
        }
    }
    return current;
}


function productForm(id, nick) {

    let obj = []

    let product = `
           <div  id="productForm">
                <textarea type="text" class="productInput" id="description-input" value="" onclick="event.stopPropagation()"placeholder=" Description"></textarea>
                <input type="text" class="productInput" id="price-input" placeholder=" Price " ></input>
           

                <div id="preview"></div>
                <label for="fileInput" class="file-input-label">
                <input type="file" id="fileInput" multiple style="display: none;">
                <div id="previewContainer"></div>
                <div class="product-adding-buttons">
                
                <div>Upload Photo</div>
                <button class="button" value=""  onclick="addProduct('${id}','${nick}')" >+</button>
                </div>
                </label>

                
            
            
            </div>
                                `


    obj.push(product)


    document.querySelector(".render").innerHTML = obj.join("");

    var fileInput = document.getElementById('fileInput');
    var previewContainer = document.getElementById('previewContainer');

    fileInput.addEventListener('change', function () {
        // Clear the preview container
      

        // Loop through selected files
        for (var i = 0; i < fileInput.files.length; i++) {
            var file = fileInput.files[i];
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    // Create a new image element
                    var img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100px'; // Adjust image size if needed
                    img.style.maxHeight = '100px'; // Adjust image size if needed
                    // Append the image to the preview container
                    previewContainer.appendChild(img);
                };
            })(file);

            // Read in the image file as a data URL
            reader.readAsDataURL(file);
        }

        uploadImage()
    });




}




function uploadImage() {

    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // Resize the image to 50x50 pixels
            canvas.width = 375;
            canvas.height = 375;
            ctx.drawImage(img, 0, 0, 375, 375);

            // Convert the resized image to a data URL
            var imageDataURL = canvas.toDataURL('image/webp');

            var newImage = { imageDataURL };
            obj2.images.push(newImage)

            setItem({ id: id, obj: obj2 })
            console.log("image added")
        };

        img.src = event.target.result;
    };


    reader.readAsDataURL(file);
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



