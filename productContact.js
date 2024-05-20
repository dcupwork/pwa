var rating
function productContact(contact, feedBackName, productIndex) {
    let obj = []
    let path = buildPath(obj2.contactList.list, obj2.contactPathList);
    
            let carousel = `
            <div class="backButton">
            <button  onclick="contactBack()">Back</button> 
        </div>
                <div class="carousel">
                  <p></p>
                </div>`
            obj.push(carousel)
            path[productIndex].imagesData.forEach(function (image, index) {
                if (path[productIndex].imagesData.length-1 == index) {
                    let images = `<div><img src="${image.imageDataURL}" alt="Photo ${index}"></div>`
                    obj[0] = obj[0].replace('<p></p>', images);
                } else {
                    let images = `<div><img src="${image.imageDataURL}" alt="Photo ${index}"></div>
                    <p></p>`
                    obj[0] = obj[0].replace('<p></p>', images);
                }
            })
            let product = `<div class="product-description" id="productDescription">
                ${path[productIndex]["productDesc"]}
            </div>
        
          <div class="product-details">
            <div class="price"> ${path[productIndex]["price"]}</div>
            <div class="addtocart"> Add to Cart </div>
          </div>
        
          <!-- Feedback Form -->
          <h3>Write Your Feedback</h3>
          
          <form id="feedbackForm">
      
            <textarea id="feedback" name="comment"></textarea><br>
      
            <label for="rating">Rating:</label><br>
            <button type="button" id="ratingButton" class="ratingButton" value="1">★</button>
            <button type="button" id="ratingButton" class="ratingButton" value="2">★</button>
            <button type="button" id="ratingButton" class="ratingButton" value="3">★</button>
            <button type="button" id="ratingButton" class="ratingButton" value="4">★</button>
            <button type="button" id="ratingButton" class="ratingButton" value="5">★</button><br>
      
            <input type="hidden" id="rating" name="rating" value="0"> <!-- Hidden input to store selected rating -->
      
            <input type="submit" value="Submit" onclick="submitFeedBack('${contact}','${feedBackName}','${productIndex}')">
          </form>


          <div class="feedbacks">
            
            <p></p>
            
          </div>
           
            
            
            `
            obj.push(product)
    
            path[productIndex].feedbacks.forEach(function(item,index){
                let feedback = `         <div class="feedback">
                <div class="user">${item["feedBackName"]}</div>
                <div class="comment">${item["feedback"]}</div>
                <div class="rating">${item["rating"]}</div>
              </div>
              <p></p>`
              obj[obj.length - 1] = obj[obj.length - 1].replace('<p></p>', feedback);
            })


    document.querySelector(".render").innerHTML = obj.join("");


   
    const ratingButtons = document.querySelectorAll('.ratingButton');
    const hiddenInput = document.getElementById('rating');

    ratingButtons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.value;
        hiddenInput.value = value;
        if (hiddenInput.value == 1){
            rating = "★"
        } else if (hiddenInput.value == 2){
            rating = "★★"
        }else if(hiddenInput.value == 3){
            rating = "★★★"
        }else if(hiddenInput.value == 4){
            rating = "★★★★"
        }else if(hiddenInput.value == 5){
            rating = "★★★★★"
        }
       
        updateRating(value);
      });
    });

    function updateRating(rating) {
      ratingButtons.forEach(button => {
        button.textContent = parseInt(button.value) <= rating ? '★' : '☆';
        
      });
    }

    
    $(document).ready(function () {
      $('.carousel').slick({
        // Add any configuration options here
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true // Set to false if you don't want navigation dots
      });
    });


}

function submitFeedBack(contact,feedBackName,productIndex){
    let path = buildPath(obj2.contactList, obj2.contactPathList);
    let feedback = document.getElementById("feedback").value;
    path[productIndex].feedbacks.push({feedBackName:feedBackName,feedback:feedback, rating:rating})
    setItem({id:id,obj:obj2})
    var url = "ws://localhost:8080/submitFeedBack"
    var ws = new WebSocket(url);
    ws.onopen = function (e) {
        ws.send(JSON.stringify({ ids: contact, list: obj2.contactList}));
    }
    ws.onmessage = function (e) {
        message = JSON.parse(e.data)
        
    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }

    productContact(contact, feedBackName, productIndex)
}