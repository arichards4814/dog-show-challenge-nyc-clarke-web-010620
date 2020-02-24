document.addEventListener('DOMContentLoaded', () => {


let tableBody = document.getElementById("table-body")
let dogForm = document.getElementById("dog-form")
let dogFormInputs = Array.from(dogForm.children)


fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(body => {
        //create a new table element
        //create tr append it to tbody
        //create a td for each and append to new tbody
        
        body.forEach(element => { 
            let newTr = document.createElement("tr")
            newTr.dataset["id"] = element.id
            tableBody.append(newTr)
            let td1 = document.createElement("td")
            td1.innerText = element.name
            let td2 = document.createElement("td")
            td2.innerText = element.breed
            let td3 = document.createElement("td")
            td3.innerText = element.sex
            let td4 = document.createElement("td")
            td4.innerHTML = `<button>edit</button>`

            newTr.append(td1)
            newTr.append(td2)
            newTr.append(td3)
            newTr.append(td4)
        })
    })

    tableBody.addEventListener("click", function(event){
        
        switch (event.target.tagName) {
            case "BUTTON":
                // code block
                let tr = event.target.parentNode.parentNode
                let dogInfo = event.target.parentNode.parentNode.children
                let dogInfoArr= Array.from(dogInfo)
                dogFormInputs[0].value = dogInfoArr[0].innerText
                dogFormInputs[1].value = dogInfoArr[1].innerText
                dogFormInputs[2].value = dogInfoArr[2].innerText
                dogForm.dataset["id"] = tr.dataset.id
                break;
            default:
                // code block
        }
    })

    dogForm.addEventListener("click", function(event){
        
            switch (event.target.type) {
                case "submit":
                    
                    let inputs = Array.from(dogForm.children)
                    
                    let newDogInfo = {
                        name: inputs[0].value,
                        breed: inputs[1].value,
                        sex: inputs[2].value
                    }

                    fetch(`http://localhost:3000/dogs/${dogForm.dataset.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(newDogInfo),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(response => response.json())
                        .then(json => console.log(json))


                    break;
                default:
                    // code block
            }
    })


})