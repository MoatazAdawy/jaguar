var nameInput = document.getElementById("bookmarkName");
var urlInput = document.getElementById("bookmarkSite");
var submitBtn = document.getElementById("submitBtn");
var editBtn = document.getElementById("editBtn");
var tableBody = document.getElementById("tableBody");
var searchInput = document.getElementById("searchInput");
var modal = document.getElementById("modal");
var closeInput = document.getElementById("closeInput");
indexUpdate = 0;

var bookMarkList =[] ;
if(localStorage.getItem("bookMarks") != null){
    bookMarkList = JSON.parse(localStorage.getItem("bookMarks"));
    display()
}
submitBtn.onclick = function(){
    if(isNameValid() && isUrlValid()){
        var bookMarks = {
            name : nameInput.value ,
            url : urlInput.value
        }
        bookMarkList.push(bookMarks);
        localStorage.setItem("bookMarks" ,JSON.stringify(bookMarkList));
        display();
        clearData()
    }
    else{
        document.getElementById("modal").style.display = "block";
    }
    
}
closeInput.onclick =function(){
    document.getElementById("modal").style.display = "none";
}

function display(){
    var box =""
    for(i = 0; i < bookMarkList.length; i++){
        box += `
        <tr>
            <td>${i + 1}</td>
            <td>${bookMarkList[i].name}</td>
            <td><a href="${bookMarkList[i].url}"><button class="btn btn-success me-2"><i class="fa-solid fa-eye me-2"></i>Visit</button></a>
            <button onclick="updateData(${i})" class="btn btn-warning"><i class="fa-solid fa-plus me-2"></i>Update</button>
            </td>
            <td><button onclick="deletData(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML = box
}
function deletData(index){
    bookMarkList.splice(index , 1);
    localStorage.setItem("bookMarks" ,JSON.stringify(bookMarkList));
    display()
}
function clearData(){
    nameInput.value ="";
    urlInput.value ="";
}
function updateData(index){
    indexUpdate = index
    nameInput.value = bookMarkList[index].name ;
    urlInput.value = bookMarkList[index].url ;
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("editBtn").style.display = "inline-block";
    
}
function editData(){
    var bookMarks = {
        name : nameInput.value ,
        url : urlInput.value,
    };
    bookMarkList.splice(indexUpdate , 1 , bookMarks);
    localStorage.setItem("bookMarks" ,JSON.stringify(bookMarkList));
    display();
    document.getElementById("submitBtn").style.display = "inline-block";
    document.getElementById("editBtn").style.display = "none";
    clearData()
}
function search(){
    var searchVal = searchInput.value.toLowerCase();
    var box = "";
    for( i = 0 ; i < bookMarkList.length ; i++){
        if(bookMarkList[i].name.toLowerCase().includes(searchVal) == true){
            box += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookMarkList[i].name.toLowerCase().replace(searchVal , "<span class='text-danger'>"+searchVal+"</span>")}</td>
                <td><a href="${bookMarkList[i].url}"><button class="btn btn-success me-2"><i class="fa-solid fa-eye me-2"></i>Visit</button></a>
                <button onclick="updateData(${i})" class="btn btn-warning"><i class="fa-solid fa-plus me-2"></i>Update</button>
                </td>
                <td><button onclick="deletData(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
            </tr>
            `
        }
    }
    document.getElementById("tableBody").innerHTML = box

}
var nameRegex = /^[a-zA-Z_]{2,}$/;
function isNameValid(){
    if( nameRegex.test(nameInput.value)){
        return true;
    }
    else{
        return false;
    }
}
var urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/
function isUrlValid(){
    if( urlRegex.test(urlInput.value)){
        return true;
    }
    else{
        return false;
    }
}
