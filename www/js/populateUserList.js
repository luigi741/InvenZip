// Create a GET request
let HTTP = new XMLHttpRequest();
var URL = 'http://192.168.10.105:3000/getUsers';
HTTP.open('GET', URL);
HTTP.responseType = 'text';

// Once we get a response
HTTP.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(HTTP.responseText);
        // Turn the response into an object, then create a list element and give it an ID so we can find it.
        let userList = JSON.parse(HTTP.responseText);
        let listElement = document.createElement("ons-list");
        listElement.setAttribute("id", "userListContainer");

        // Append the list element to the userPage.html canvas, and also create and append a header to the list.
        document.getElementById("userListPageCanvas").append(listElement);
        let listHeader = document.createElement("ons-list-header");
        listHeader.innerHTML = "Users";
        document.getElementById("userListContainer").append(listHeader);
        console.log(userList);

        // For each user in the list of users we got from the response.
        userList.forEach(function(user){
            // get the keys that are in the 'user' object.
            console.log(user);
            let keys = Object.keys(user)
            console.log(keys);
            
            // Create a list item and a card that will hold the list item.
            let userElement =  document.createElement("ons-list-item")
            let card = document.createElement("div");
            card.setAttribute('class', 'card'); 

            // For each key
            keys.forEach(function(key){
                // Skip the first key
                if (key == '_id')
                    return;
                // Create a row two columns for the row, append the key (label) to the first column, and the key's value to the second.
                let row = document.createElement("ons-row");
                let labelColumn = document.createElement('ons-col');
                let columnDescription = document.createElement('ons-col');
                labelColumn.setAttribute('width',"75px");
                labelColumn.innerHTML = key + ':'
                columnDescription.innerHTML = user[key];

                // Append the label column to the row, along with the descrption column (key's value) to the row
                // append the row to the list item (userElement) and append the list item to the card.
                row.append(labelColumn);
                row.append(columnDescription);
                userElement.append(row);
                card.append(userElement);
            });
            // Finally append the card to the list.
            listElement.append(card);
        });
        

    }
};

// send the request
HTTP.send();