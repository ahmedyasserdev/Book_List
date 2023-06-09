// Inputs
let title = document.getElementById("title")
let author = document.getElementById("author")
let beginDate = document.getElementById("bd")
let endDate = document.getElementById("ed")
let category = document.getElementById("category")
let searchInput = document.getElementById("searchInput")

// Btns
let createBtn = document.getElementById("create")
let searchTitle = document.getElementById("searchTitle")
let searchCategory = document.getElementById("searchCategory")

let dataBook;

// Helpers

let mood = 'create'
let tmp ;
let container = document.querySelector(".container")

function showPopup(message , bg) {
    const popup = document.createElement('h2');
    popup.classList.add('popup');
    popup.textContent = message;
    popup.style.background = bg
    container.prepend(popup);
    setTimeout(() => {
      popup.remove();
    }, 2000);
  }


// Save LocalStorage

    if (localStorage.book != null)  {
        dataBook = JSON.parse(localStorage.book )
    }else {
        dataBook = []
    }



// Create 

createBtn.onclick = function () {
    let newBook = {
        title : title.value.toLowerCase() ,
        author : author.value ,
        beginDate : beginDate.value ,
        endDate : endDate.value ,
        category : category.value.toLowerCase() ,
    }

// Clean Data


    if (title.value !== '' && author.value !== '' && category.value !== ''  ) {

        if (mood === 'create') {
            dataBook.push(newBook)
            
            showPopup("book Added" , "#0a74a8")

        }else {
            dataBook[tmp] = newBook
            createBtn.innerHTML = "Add Book"
            mood = 'create'

            showPopup("book Updated" , "#0d8bc5")
            
            
        }

        clearFields ()
    }else {
        showPopup("Please Fill All Fields" , "#800606")
    }


    // Save LocalStorage
    localStorage.setItem('book' , JSON.stringify(dataBook))

    readData ()
}


// Read 


function readData () {

    let table = ``

    for (let i = 0 ; i < dataBook.length ; i++) {
        table += `
        
        <tr>
        <td>${i + 1}</td>
        <td>${dataBook[i].title}</td>
        <td>${dataBook[i].author}</td>
        <td>${dataBook[i].beginDate}</td>
        <td>${dataBook[i].endDate}</td>
        <td>${dataBook[i].category}</td>
        <td><button onclick = "updateBook (${i}) " id="update"> <i class = "fas fa-pen"></i> </button></td>
        <td><button onclick = "deleteBook (${i})" id="delete"><i class = "fas fa-trash"></i> </button></td>

    </tr>
        
        `
    }

    document.getElementById("tbody").innerHTML = table



}


readData ()


// Clear Inputs

function clearFields () {
    title.value = ''
    author.value = ''
    beginDate.value = ''
    endDate.value = ''
    category.value = ''
}


// Delete 


function deleteBook (i) {
    dataBook.splice(i,1)
    localStorage.book = JSON.stringify(dataBook)

    showPopup("book Deleted" , "#065c72")

    readData()


    
}

// Update


function updateBook (i) {

    title.value = dataBook[i].title
    author.value = dataBook[i].author
    beginDate.value = dataBook[i].beginDate
    endDate.value = dataBook[i].endDate
    category.value = dataBook[i].category

    createBtn.innerHTML = "Update"
    mood = 'update'

    scroll({
        top : 0 ,
        behavior : 'smooth',
    })

    tmp = i
}

// Search


let searchMood = 'title'

function getSearchMood(id) {
    if (id === 'searchTitle') {
        searchMood = 'title'
    }else {
        searchMood = 'category'

    }
    searchInput.focus()
    searchInput.placeholder = 'Search By ' + searchMood.toUpperCase()
}

function search (value) {
    let table = ''

    for (let i = 0 ; i < dataBook.length ; i++) {

    if (searchMood == 'title') {

            if (dataBook[i].title.includes(value.toLowerCase())) {
                table += `
        
                <tr>
                <td>${i + 1}</td>
                <td>${dataBook[i].title}</td>
                <td>${dataBook[i].author}</td>
                <td>${dataBook[i].beginDate}</td>
                <td>${dataBook[i].endDate}</td>
                <td>${dataBook[i].category}</td>
                <td><button onclick = "updateBook (${i}) " id="update">Update</button></td>
                <td><button onclick = "deleteBook (${i})" id="delete">Delete</button></td>
        
            </tr>
                
                `
            }
        
    } else {
            if (dataBook[i].category.includes(value.toLowerCase())) {
                table += `
        
                <tr>
                <td>${i + 1}</td>
                <td>${dataBook[i].title}</td>
                <td>${dataBook[i].author}</td>
                <td>${dataBook[i].beginDate}</td>
                <td>${dataBook[i].endDate}</td>
                <td>${dataBook[i].category}</td>
                <td><button onclick = "updateBook (${i}) " id="update">Update</button></td>
                <td><button onclick = "deleteBook (${i})" id="delete">Delete</button></td>
        
            </tr>
                
                `
            }
        
        }

    }   

    document.getElementById("tbody").innerHTML = table

}

