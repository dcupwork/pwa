
if (localStorage.getItem("ids") == null){
    login()
} else {
    contacts()
}

function login() {

    var obj = [];
    template = `
                <div class="login">
                        <div class="signin">
                        <input type="text"  class="loginInput" id="accountid" autofocus="autofocus" placeholder="Account ID" ></input>
                        <input type="text"  class="loginInput" id="password" placeholder="Password" ></input>
                        
                        </div>
                        <div class="or">
                        <button  class="button" id="next" onclick="signIn()">SignIn</button>
                            <hr> or <hr>
                             SignUp</div>
                            
                            <div class="registration">
    <form id="registrationForm">
        <input type="text" class="loginInput" id="contactname" placeholder="Contact Name" required>
       
        </form> 

        <form id="checkboxForm">  
        <input type="checkbox" id="captchaCheckbox">
        <label>Agree with processing of personal data</label>
    </form>
    
    <button class="button" id="submitButton" onclick="next()">Next</button>
</div>

                        </div>`
    obj.push(template)

    document.querySelector(".render").innerHTML = obj.join("")



}
function signIn() {
    let accountid = document.getElementById("accountid").value
    let password = document.getElementById("password").value

    var url = "ws://localhost:8080/getObj"
    var ws = new WebSocket(url);
    ws.onopen = function (e) {
        console.log("id sended")
        ws.send(JSON.stringify({ ids: accountid, password: password }));
    }
    ws.onmessage = function (e) {
        message = JSON.parse(e.data)
        console.log(message)
        obj2 = message
        setItem({ id: id, obj: obj2 })
        localStorage.setItem("ids", accountid);
        setTimeout(function () {
            contacts()
        }, 1);

    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }
    // Get the checkbox and submit button elements
const captchaCheckbox = document.getElementById('captchaCheckbox');
const submitButton = document.getElementById('submitButton');

// Add a change event listener to the checkbox
captchaCheckbox.addEventListener('change', () => {
    // Enable the submit button if the checkbox is checked, disable it otherwise
    submitButton.disabled = !captchaCheckbox.checked;
});

// Prevent form submission if the checkbox is not checked
document.getElementById('checkboxForm').addEventListener('submit', (event) => {
    if (!captchaCheckbox.checked) {
        event.preventDefault();
        alert('Please verify that you are not a robot.');
    }
});
}



function next() {
    let contactname = document.getElementById("contactname").value
    var obj = [];
    template = `
                <div class="login">
                        <div class="address">
                        <input type="text" class="loginInput" id="country" autofocus="autofocus" placeholder="Search for a country">
                        <div id="countryList" style="display: none; margin-left: 10px; padding: 5px;">
                        <!-- List of countries will be populated here -->
                        </div>
                        <input type="text"  class="loginInput" id="city" placeholder="City" ></input>
                        <input type="text"  class="loginInput" id="postalcode" placeholder="Postal code" ></input>
                        <input type="text"  class="loginInput" id="street" placeholder="Street Home Apartaments" ></input>
                        
                        <input type="text"  class="loginInput" id="mobilephonenumber" placeholder="Phone Number" ></input>
                        </div>
                        
                        <div class="signUpButtons"
                        <span  id="signUpButton" ></span>
                        <span class="button" id="signUpButton" onclick="next2('${contactname}')">Next</span>
                        </div>
                        </div>

                        </div>`
    obj.push(template)

    document.querySelector(".render").innerHTML = obj.join("")

    const searchInput = document.getElementById('country');
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
            const listItem = document.createElement('div');
            listItem.textContent = country;
            listItem.style.padding = "2px";
            // Add click event listener to select country
            listItem.addEventListener('click', function () {
                searchInput.value = country;
                countryList.style.display = 'none';
            });
            countryList.appendChild(listItem);
        });

        // Show the country list
        countryList.style.display = 'block';
    }

    // Add event listener for the search input
    searchInput.addEventListener('input', function (event) {
        const searchQuery = event.target.value.trim();
        populateCountryList(searchQuery);
    });
}



function next2(contactname) {

    let country = document.getElementById("country").value
    let city = document.getElementById("city").value
    let postalcode = document.getElementById("postalcode").value
    let street = document.getElementById("street").value
    let mobilephonenumber = document.getElementById("mobilephonenumber").value

    if (contactname == "") {
        contactname = "Contact name"
    }
    if (country == "") {
        country = "Search for the country"
    }
    if (city == "") {
        city = "City"
    }
    if (postalcode == "") {
        postalcode = "Postal code"
    }
    if (street == "") {
        street = "Street Home Apartaments"
    }
    if (mobilephonenumber == "") {
        mobilephonenumber = "Mobile phone number"
    }

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
        ws.close()
        localStorage.setItem("ids", msg.Ids);
        setItem({
            id: msg.Ids, obj: msg.List
        })
        var obj = [];
        template = `
        <div class="login">
        <div id="contentToCopy" class="smooth">
            <span class="label" >Account ID:</span>
            <div class="value" id="accountId">        ${msg.Ids}</div>
        </div>
        <div id="contentToCopy" class="smooth">
            <span class="label">Password:</span>
            <div class="value" id="accountId">${msg.List.password}</div>
            
        </div>

    
        <div class="button-smooth">
        <button id="copyButton" class="copyButton">Copy Account ID and Password</button>
        <span class="button smooth" id="signUpButton" onclick="contacts('${contactname}')">Complete registration</span>
        </div>
    </div>
    
    
    
            `
        obj.push(template)

        document.querySelector(".render").innerHTML = obj.join("")



        var copyButton = document.getElementById('copyButton');
        copyButton.addEventListener('click', copyToClipboard);


        function copyToClipboard() {
            var accountId = document.getElementById('accountId').innerText || document.getElementById('accountId').textContent;
            var password = document.getElementById('password').value;
            var placeholder = document.getElementById('password').placeholder;

            var textToCopy = "Account ID: " + accountId + "\nPassword: " + placeholder;

            var textarea = document.createElement('textarea');
            textarea.value = textToCopy;

            // Avoid scrolling to bottom
            textarea.style.top = '0';
            textarea.style.left = '0';
            textarea.style.position = 'fixed';

            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            try {
                var successful = document.execCommand('copy');
                var message = successful ? 'Copied to clipboard' : 'Unable to copy';
                console.log(message);
            } catch (err) {
                console.error('Failed to copy:', err);
            }

            document.body.removeChild(textarea);
        }






    }
    ws.onclose = function (e) {
        console.log("webscoket closed");
    }
    ws.error = function (e) {
        console.log("webscoket err");
    }







}








