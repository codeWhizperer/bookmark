//listen for form submit
document.getElementById('myForm').addEventListener("submit", saveBookMaker)



function saveBookMaker(event){
 //get value of form input
var siteName = document.getElementById('siteName').value
var siteUrl = document.getElementById('siteUrl').value

if(!validateForm(siteName, siteUrl)){
    return false
}
var bookmark = {
    name:siteName,
    url:siteUrl
}
//test if bookmark is null
if(localStorage.getItem('bookmarks') === null){
    //initialiaze array    
    var bookmarks = [];
    //push to array
    bookmarks.push(bookmark)
//set to localStorage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks))    
} else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) 
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)) 
}
document.getElementById('myForm').reset()
// fetchBookmarks
fetchBookmarks();
//prevent default
event.preventDefault()
}

// //DeleteBookmark()
function deleteBookMark(url){
//Get bookmarks from localstorage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
//Loop through
for( var i = 0; i < bookmarks.length; i++){
if(bookmarks[i].url == url){
 bookmarks.splice(i, 1)   
}
}
localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
//fetxhbookmarks
fetchBookmarks()
}


//fetchAll bookmark from LocalStorage
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) 
//Get output Id
var result = document.getElementById('bookmakerResults')
result.innerHTML = '';
for( var i = 0; i < bookmarks.length; i++){
 var name = bookmarks[i].name
 var url = bookmarks[i].url 
 result.innerHTML += `<div classname='.bg-secondary'>` +
                                            '<h3>' +name+
                                            ' <a class="btn btn-default" target="_blank" href="'+url+'" >Visit</a>' +
                                            ' <a onclick="deleteBookMark(\'' +url+'\')" class="btn btn-danger"  href="#" >Delete</a> '
                                            '</h3>'+
                                            
                                            '<div/>'

}
}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form')
        return false
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert('Please Enter A Valid Url')
        return false
    }
    return true
}