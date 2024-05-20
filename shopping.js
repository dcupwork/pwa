

function shopping() {

    var obj = [];

    obj2.images = []
    setItem({ id: id, obj: obj2 })




    document.querySelector(".render").innerHTML = obj.join("");


    obj2.shops.forEach(function (shop, contactIndex) {

        let template = `
                    <div class="contact">
                            <div ><img id="contact-logo" src="${shop.logo}" /></div>
                            <div class="contact-item" id="`+ shop.id + `" onclick="getListOfContact('${shop.id}', '${shop.contactname}','${contactIndex}')">` + shop.contactname + `</div> 
                        </div>        
                    </div>
                    <d></d>
                    `
        let message = document.getElementsByClassName('render')[0];
        let div = document.createElement('div');
        div.className = 'shop'
        div.innerHTML = template;
        message.appendChild(div);

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
                    <div  type=text id="shopping-button-form">           
                        
                        <div id="nav-button" onclick="contacts()">Contacts</div>
                        <div id="nav-button" onclick="orders()">Orders</div>
                        
                        <div id="nav-button" onclick="list()">My Shop</div>
                        
                        
                        
                    </div>
                    <div  type=text id="list-form">
                        `+ menu + `
                        <input  class="search"></input>
                        <div id="nav-button" onclick="searchKeyword()">Search</div>
                        
                        
                    </div>
                  
                    
                    </div>
                        `


    navbar.push(navbarform)
    document.querySelector(".navbar").innerHTML = navbar.join("")



    //document.querySelector(".render").innerHTML = obj.join("");
    document.querySelector(".transactions").innerHTML = []

};



function pricedown() {
    var objp = []
    let sort = `<!-- HTML for the dropdown menu -->
    <div class="dropup">
        <button class="dropbtn" onclick="toggleDropdown()">sort</button>
        <div class="dropup-content" id="myDropdown">
            <a href="#" onclick="pricedown()">Pricedown</a>
            <a href="#" onclick="priceup()">Priceup</a>
        
        </div>
    </div>
            `
    objp.push(sort)
    let product_container = `<div class="product-container"></div>`
    objp.push(product_container)
    document.querySelector(".render").innerHTML = objp.join("");
    // Custom comparison function to sort items by price
    function compareByPrice(item1, item2) {
        return item1.price - item2.price;
    }

    // Sort the items array by price using the compareByPrice function
    obj2.sortlist.sort(compareByPrice);

    obj2.sortlist.forEach(function (item, productIndex) {


        let product = `
        
            <div class="carousel" id="carousel${productIndex}">
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
            if (item.imagesData.length - 1 == index) {
                let images = `<div><img src="${image.imageDataURL}" alt="Photo ${index}" onclick="product('${productIndex}','${contact}')"></div>`
                objp[productIndex] = objp[productIndex].replace('<p></p>', images);
            } else {
                let images = `<div><img src="${image.imageDataURL}" alt="Photo ${index}" onclick="product('${productIndex}','${contact}')"></div>
                <p></p>`
                objp[productIndex] = objp[productIndex].replace('<p></p>', images);
            }

        })


        let message = document.getElementsByClassName('product-container')[0];
        let div = document.createElement('div');
        div.className = 'product'
        div.innerHTML = objp[productIndex];
        message.appendChild(div);

        // Initialize Slick carousel after a slight delay
        setTimeout(function () {
            $('#carousel' + productIndex).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true // Set to false if you don't want navigation dots
            });
        }, 1);
    })


}

function searchKeyword() {
    obj2.sortlist = []
    setItem({ id: id, obj: obj2 })
    let keyword = document.querySelector(".search").value
    var objp = []

    let sort = `<!-- HTML for the dropdown menu -->
    <div class="dropup">
        <button class="dropbtn" onclick="toggleDropdown()">sort</button>
        <div class="dropup-content" id="myDropdown">
            <a href="#" onclick="pricedown()">Pricedown</a>
            <a href="#" onclick="priceup()">Priceup</a>
        
        </div>
    </div>
            `
    objp.push(sort)
    let product_container = `<div class="product-container"></div>`
    objp.push(product_container)
    document.querySelector(".render").innerHTML = objp.join("");

   
        search(keyword)
    
    console.log(obj2.sortlist)

}

function search(keyword) {


    var url = "ws://localhost:8080/getListOfContact"
    var ws = new WebSocket(url);
    
    ws.onopen = function (e) {

    for (var i = 0; i < obj2.shops.length; i++) {
      
            ws.send(JSON.stringify({ ids: id, contact: obj2.shops[i].id }));
        
        
    
        
    }



    }
    ws.onmessage = function (e) {
        message = JSON.parse(e.data)
        var objp = []
        console.log("list",message.list)
        let id = message.id
        message.list.forEach(function (item, productIndex) {

            if (!item["groupName"] && item.productDesc.includes(keyword)) {
                obj2.sortlist.push(item)
                setItem({ id: id, obj: obj2 })

                let product = `
                
                    <div class="carousel" id="${id}carousel${productIndex}">
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
                    if (item.imagesData.length - 1 == index) {
                        let images = `<div><img src="${image.imageDataURL}" alt="Photo ${index}" onclick="product('${productIndex}','${contact}')"></div>`
                        objp[productIndex] = objp[productIndex].replace('<p></p>', images);
                    } else {
                        let images = `<div><img src="${image.imageDataURL}" alt="Photo ${index}" onclick="product('${productIndex}','${contact}')"></div>
                        <p></p>`
                        objp[productIndex] = objp[productIndex].replace('<p></p>', images);
                    }

                })
                let message = document.getElementsByClassName('product-container')[0];
                let div = document.createElement('div');
                div.className = 'product'
                div.innerHTML = objp[productIndex];
                message.appendChild(div);
            }



            // Initialize Slick carousel after a slight delay
            setTimeout(function () {
                $('#' + id + 'carousel' + productIndex).slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true // Set to false if you don't want navigation dots
                });
            }, 1);
        })

    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }

}