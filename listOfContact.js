var id = localStorage.getItem("ids");
var count = 0;

function getListOfContact(contact, nick,contactIndex) {
    var url = "ws://localhost:8080/getListOfContact"
    var ws = new WebSocket(url);
    ws.onopen = function (e) {
        ws.send(JSON.stringify({ ids: id, contact: contact }));
    }
    ws.onmessage = function (e) {
        message = JSON.parse(e.data)
        obj2.contactList = message
        setItem({ id: id, obj: obj2 })
        console.log("obj2.contactList", obj2.contactList)
        listOfContact(contact, nick, contactIndex)
    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }

}

function listOfContact(contact, nick, contactIndex) {


    
    files = ['OIP.jpg'],
        ii = Math.floor(Math.random() * 1);


    console.log("fdsfs", obj2.contactList)
    var obj = [];


    files = ['Mulled Wine-Maple-Falls.jpg', 'vina-pena-white-wine.png', 'gran-sasso-montepulciano-dabruzzo.jpg', 'Cote_Mas_Rouge_Bottle.jpg', 'valle-secreto-private-cabernet-franc45.jpg'],
        ii = Math.floor(Math.random() * 5);
        
        let product_container = `<div class="product-container">
     
        </div>`
    obj.push(product_container)

    let path = buildPath(obj2.contactList.list, obj2.contactPathList);

    backButton = `
        <div class="backButton">
            <button  onclick="contactBack()">Back</button> 
        </div>
        `
    obj.push(backButton)

    let head = ` 
    <div  id="head">
        
       
    </div>
    `


    obj.push(head)

    document.querySelector('.render').innerHTML = obj.join("");

    path.forEach(function (item, index) {


        if (!item["productDesc"]) {
            let template = `
                <div class="group">
                    <div class="item1" onclick="contactGroup('${contact}','${nick}','${index}')">${item["groupName"]}</div>
                   
                </div>
                `
            obj.push(template)

        }
    })

    var objp = []
    path.forEach(function (item, productIndex) {
        if (!item["groupName"]) {
            let product = `
                
                    <div class="carousel" id="carousel${productIndex}">
                        <p></p>
                    </div>
                    <p class="description">${item["productDesc"]}</p>
                    <div class="product-details">
                        <div class="price"> ${item["price"]}</div>
                        <div class="addToCart" onclick="addToCart('${contact}','${nick}','${productIndex}','${contactIndex}')"> addToCart </div>
                    </div>
                    </div>
                    
               
                `
            objp.push(product)
            item.imagesData.forEach(function (image, index) {
                if (item.imagesData.length - 1 == index) {
                    let images = `<div><img src="${image.imageDataURL}" alt="Photo ${index}" onclick="productContact('${contact}','${obj2.account.nick}','${productIndex}')"></div>`
                    objp[productIndex] = objp[productIndex].replace('<p></p>', images);
                } else {
                    let images = `<div><img src="${image.imageDataURL}" alt="Photo ${index}" onclick="productContact('${contact}','${obj2.account.nick}','${productIndex}')"></div>
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


    var objp = []


if ( obj2.contactList.newoffers != null){
    obj2.contactList.newoffers.forEach(function (item, productIndex) {
        if (!item["groupName"]) {
            let product = `
                
                    <div class="carousel" id="carouse${productIndex}">
                        <p></p>
                    </div>
                    <p class="description">${item["productDesc"]}</p>
                    <div class="product-details">
                        <div class="price"> ${item["price"]}</div>
                        <div class="addToCart" onclick="addToCart('${contact}','${nick}','${productIndex}','${contactIndex}')"> addToCart </div>
                    </div>
                    </div>
                    
               
                `
            objp.push(product)
            item.imagesData.forEach(function (image, index) {
                if (item.imagesData.length - 1 == index) {
                    let images = `<div><img src="${image.imageDataURL}" alt="Photo ${index}" onclick="productContact('${contact}','${obj2.account.nick}','${productIndex}')"></div>`
                    objp[productIndex] = objp[productIndex].replace('<p></p>', images);
                } else {
                    let images = `<div><img src="${image.imageDataURL}" alt="Photo ${index}" onclick="productContact('${contact}','${obj2.account.nick}','${productIndex}')"></div>
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
            $('#carouse' + productIndex).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true // Set to false if you don't want navigation dots
            });
        }, 2);
    })
}
 


    var navbar = []
    let navbarform = `
                <div  id="bottom">
                <button  id="bottom-line"></button>
                <div  type=text id="button-form"> 
                <div id="nav-button" onclick="contacts()">H</div>   
                <div  onclick="cart()">${nick}</div> 
                    
                    <div id="nav-button" onclick="walletWithContact('${contact}','${nick}')">Wallet</div>
                    <div  onclick="cart()"> Delivery</div>
       
        <div class="cart-container">
        <div id="cartButton" onclick="cart('${contact}','${obj2.deliverycost}')">Cart</div>
        <div id="cartLabel" class="cart-label">${obj2.contacts[contactIndex].cart.length}</div>
        </div>
        
                </div>
                <div  type=text id="search-form">
                    
                    <input type="text" class="search"  autofocus="autofocus" placeholder=" search" ></input>  
            
                </div>
                </div>
                    `

    navbar.push(navbarform)
    document.querySelector('.navbar').innerHTML = navbar.join("");

  
}





function contactGroup(contact, nick, index) {
    console.log('fsdfkfk')
    obj2.contactPathList.push(Number(index))
    obj2.contactPathList.push("children")
    setItem({ id: id, obj: obj2 })

    listOfContact(contact, nick)
}

function contactBack(contact, nick) {
    obj2.contactPathList.pop()
    obj2.contactPathList.pop()
    setItem({ id: id, obj: obj2 })
    console.log("ddd", obj2.contactPathList)
    if (obj2.contactPathList.length == 0) {
        contacts()
    } else {
        listOfContact(contact, nick)
    }
}


function addToRegular(index) {
    obj2.regular.push(obj2.listOfContact[index])
    setItem({ id: id, obj: obj2 })


}




function addToCart(contact, nick, productIndex,contactIndex) {
    console.log("addtoCart")
    let path = buildPath(obj2.contactList, obj2.contactPathList);
    obj2.contacts.forEach(function (item, ind) {
        if (item.contact == contact) {
            item.cart.push(path[productIndex])
            item.count ++
            console.log(item.cart)
            setItem({ id: id, obj: obj2 })
            listOfContact(contact, nick, contactIndex)
        }
    })
    

}
function removeFromCart(contact,cartIndex) {
    obj2.contacts.forEach(function (item, index) {
        if (item["id"] == contact) {
            // Using splice to remove the item at the specified index
            item.cart.splice(cartIndex, 1);
            setItem({ id: id, obj: obj2 })
        }
    })

cart(contact)

}

function cart(contact,delivery) {
    let quantity = 0
    var cart = []
    obj2.contacts.forEach(function (item, index) {
        if (item["contact"] == contact) {
            item.cart.forEach(function (i, cartIndex) {
                let product = `
                      <div class="product">
                      <div class="product-basic">
                      <div id="imageContainer${index}" style=" margin-top: 5px;margin-left: 5px;"><img  src="${i.imagesData[0].imageDataURL}" width=50/></div>
                      <div class="description"  >${i["productDesc"]}</div>
                       
                      </div>
                      <div class="quantity">
                      <div class="price"  >${i["price"]}</div> 
                      <div class="quantity" onclick="quantity_sub('${contact}','${cartIndex}')" >-</div>
                      <div class="quantity" >${i["quantity"]}</div>
                      <div class="quantity" onclick="quantity_add('${contact}','${cartIndex}')" >+</div>
                      <div class="delete" onclick="removeFromCart('${contact}','${cartIndex}')"><img src="dustbin_120823.ico" width=15/></div> 
                      </div>
                    </div> 
                `
                cart.push(product)
                quantity += Number(i["quantity"])

            })
        }
    })



    let checkout = ` 
   
    <div class="checkout" onclick="checkout('${contact}','${quantity}','${delivery}')"> Checkout</div>
   
    `


    cart.push(checkout)

    document.querySelector('.render').innerHTML = cart.join("");
}
var func = "onlinePayment"
function checkout(contact,quantity,delivery){

    var url = "ws://localhost:8080/getOrderID"
    var ws = new WebSocket(url);
    ws.onopen = function (e) {
        ws.send(JSON.stringify({ contact: contact }));
    }
    ws.onmessage = function (e) {
        let orderID = JSON.parse(e.data)
        console.log(orderID)
        let obj = []
        let checkout = ` 
       
        <ul id="cart-items"></ul>
        
        <h2>Address of delivery</h2>
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
        
        <div class="methodofdelivery">
        <h3>Method of delivery</h3>
        <div class="buttons">
            <input type="radio" id="delivery" name="deliveryMethod" value="delivery" checked>
            <label for="delivery">Delivery</label>
            
            <input type="radio" id="pickup" name="deliveryMethod" value="pickup">
            <label for="pickup">Pickup</label>
        </div>
    </div>
        
    <div class="methodofpayment">
        <h3>Method of payment</h3>
        <div class="buttons">
        <input type="radio" id="newcard" name="paymentMethod" value="newcard" onclick="method(this.value)">
        <label for="newcard">New card</label>
            <input type="radio" id="onlinePayment" name="paymentMethod" value="onlinePayment" checked onclick="method(this.value)">
            <label for="onlinePayment">VO Payment</label>
            
            <input type="radio" id="cashOnDelivery" name="paymentMethod" value="OnDelivery" onclick="method(this.value)">
            <label for="cashOnDelivery">On Delivery</label>
        </div>
    </div>
    
    
    
        <h3>Total</h3>
        <p id="total">Total goods: ${quantity} pcs</p>
        <p id="total">Delivery: ${obj2.deliverycost}</p>
        <p id="total">Total amount: $0</p>
    
        <button onclick="pay('${contact}','${orderID}')">Pay</button>
       
        `
    
    
        obj.push(checkout)
    
        document.querySelector('.render').innerHTML = obj.join("");
        document.querySelector('.navbar').innerHTML = [];
       
    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }


}

function method(value){
    console.log(value)
    func = value
}

function newcard(){
    let obj = []
    let cardform = ` 
   
    <form>
    <label for="cardholder">Cardholder's Name:</label>
    <input type="text" id="cardholder" name="cardholder" required>
    
    <label for="cardnumber">Card Number:</label>
    <input type="number" id="cardnumber" name="cardnumber" required>
    
    <label for="expiration">Expiration Date:</label>
    <input type="text" id="expiration" name="expiration" placeholder="MM/YYYY" required>
    
    <label for="cvv">CVV:</label>
    <input type="number" id="cvv" name="cvv" required>
    
    <input type="submit" value="Pay">
</form>

   
    `


    obj.push(cardform)

    document.querySelector('.render').innerHTML = obj.join("");
}
function sendorder(contact,orderID){
    var cart = []
    obj2.contacts.forEach(function (item, index) {
        if (item["id"] == contact) {
            obj2.orders.push({ contact: contact, ids:id, orderID:orderID, order:item.cart, owner:"customer"})
            setItem({id:id,obj:obj2})
            cart = item.cart
        }
    })
    var url = "ws://localhost:8080/sendOrder"
    var ws = new WebSocket(url);
    ws.onopen = function (e) {
        console.log(contact,id,orderID,cart)
        ws.send(JSON.stringify({ contact: contact, ids:id, orderID:orderID, order:cart, owner:"shop"}));
    }
    ws.onmessage = function (e) {
        message = JSON.parse(e.data)
      
    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }
    console.log("ordercomplete")
}

function pay(contact,orderID){
   if (func == "newcard"){
    newcard(contact,orderID)
   }else{
    sendorder(contact,orderID)
   }
}


function quantity_sub(contact,cartIndex){
    obj2.contacts.forEach(function (item, index) {
        if (item["id"] == contact) {
            if (item.cart[cartIndex].quantity>1){
                item.cart[cartIndex].quantity --
            }
            
        }
    })
    cart(contact)
}
function quantity_add(contact,cartIndex){
    obj2.contacts.forEach(function (item, index) {
        if (item["id"] == contact) {
            item.cart[cartIndex].quantity ++
        }
    })
    cart(contact)
}