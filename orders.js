function orders(arg) {

    var url = "ws://localhost:8080/ws"
    var ws = new WebSocket(url);
    ws.onopen = function (e) {
        ws.send(JSON.stringify({ ids: id }));
    }
    ws.onmessage = function (e) {
        message = JSON.parse(e.data)
        console.log("orders",message)
        obj2.orders.push(message)
        setItem({ id: id, obj: obj2 })
        orders()
    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }

    var obj = [];

    let orders_container = `<div class="orders-container"></div>`
    obj.push(orders_container)

    document.querySelector(".render").innerHTML = obj.join("");


    obj2.orders.forEach(function (item, index) {
            let template = `
            <div class="contact">
                                            <div ><img id="contact-logo" src="${item.logo}" /></div>
                                            <div class="contact-item" onclick="order(${index})">${item.orderID}</div> 
                                            <div >Paid</div>
                                        </div>        
                                    </div>
            
            `
            let message = document.getElementsByClassName('orders-container')[0];
            let div = document.createElement('div');
            div.className = 'order'
            div.innerHTML = template;
            message.appendChild(div);
    })
    

    var navbar = []
    let navbarform = `
                    <div id="bottom">
                    <div  type=text id="button-form">           
                        <div id="nav-button" onclick="wishlist()">Regular</div>
                        <div id="nav-button" onclick="getList()">List</div>
                        <div id="nav-button" onclick="touch()">Touch</div>
                        <div id="nav-button" onclick="contacts()">Contacts</div>
                        <div  onclick="wallets()"> ${obj2.wallets[0].balance}</div>
                    </div>
                    <div  type=text id="list-form">
                        `+ menu + `
                        <input  class="input"></input>   
                    </div>
                    </div>
                        `
    navbar.push(navbarform)
    document.querySelector(".navbar").innerHTML = navbar.join("")

    //document.querySelector(".render").innerHTML = obj.join("");
    document.querySelector(".transactions").innerHTML = []

};

function order(orderIndex){
    let obj = []

    obj2.orders.forEach(function (order, index) {
        if (index == orderIndex){
            let order_container = `<div class="item1" >${order.contact}</div>
            <div class="item1" >${order.id}</div>
            <p></p>
            <div class="item1" >${order.owner}</div>
            <div class="item2" onclick="deleteGroup(${index})">Delete</div>`
            obj.push(order_container)
            
            order.order.forEach(function(i,index){
                let product_container = `<div class="product">
                <div class="product-basic">
                <div ><img  src="${i.imagesData[0].imageDataURL}" width=50/></div>
                <div class="description"  >${i["productDesc"]}</div>
                </div>
                <div class="quantity">
                <div class="price"  >${i["price"]}</div> 
                <div class="quantity" >${i["quantity"]}</div>
                </div>
              </div> 
                <p></p>`
                obj[0] = obj[0].replace('<p></p>', product_container);
            })

           
            document.querySelector(".render").innerHTML = obj.join("");
        }
})
}