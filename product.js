function product(productIndex,contact) {
    let obj = []
    let path = buildPath(obj2.list, obj2.pathList);
            let carousel = `
            <div class="backButton">
            <button  onclick="back()">Back</button> 
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
        
          <div class="details-product">
            <div class="price">${path[productIndex]["price"]} VO</div>
            <div class="price"></div>
            <div class="addtocart"> Add to Cart </div>
          </div>
            
            
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