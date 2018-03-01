// create a student list variable
const students = document.getElementsByClassName('student-item');
/* will need access to this div element later in two different
functions: one creates pagination the other removes it. Also, 
want to avoid scope issues */
const page = document.getElementsByClassName('page')[0];
// create all the elements for the search componet
const divSearch = document.createElement('div');
divSearch.className = 'student-search';
const input = document.createElement('input');
input.placeholder = 'Search for students...';
const button = document.createElement('button');
button.innerHTML = 'Search';
const pageHeader = document.getElementsByClassName('page-header')[0];
pageHeader.appendChild(divSearch);
divSearch.appendChild(input);
divSearch.appendChild(button);
//let matched = [];
//console.log(matched);
/* Builds a list of 10 students for the page.
First, hides the entire list by looping over it and setting the display value to none.
Next, displays the first 10 students per page of the list by looping over the
entire list again and selecting only those students that belong to that page number,
and set their display value to block */
function showPage(pageNumber, studentList) {
  for(i = 0; i < studentList.length; i +=1) {
    studentList[i].style.display = 'none';
  } 
  for(j = 0; j < studentList.length; j +=1) {
    if(j >= (pageNumber*10) - 10 && j <= (pageNumber * 10) - 1) {
 	    studentList[j].style.display = 'block';
    } 
  } 
  if(studentList.length > 10) {
    let links = document.getElementsByTagName('a');
    //console.log(links);
    links[0].className = 'active';
  }
}	
//console.log(matched);
/* Creates all the page links, pagination markup, and the event listener for the links.
The number of links is known by the number of students / 10 and rounded up. Pagination
markup is done by creating the <div>&<ul> elements, and writing the <li>&<a> elements to the
<ul> by use of loop to set the required number of links. Finally, it all gets appended to the page. 
The event listener calls showPage() which sets the coresponding page of the link that was clicked
and activates the link by turning it the color blue */
function appendPageLinks(studentList) {
  const numberOfPages = Math.ceil(studentList.length/10);

  let div = document.createElement('div');
  div.className = 'pagination';
  let ul = document.createElement('ul');
 
  for(i = 1; i <= numberOfPages; i += 1) {
    ul.innerHTML +='<li class="buttons"><a href="#">'+ i +'</a> </li>';
  }
  page.appendChild(div);
  div.appendChild(ul);
 
  let links = document.getElementsByTagName('a');
  
  div.addEventListener('click', (event) => {
    showPage(event.target.innerHTML, studentList);
    event.target.className = 'active';
     for(i = 0; i < numberOfPages; i += 1) {
      if(event.target.innerHTML !== links[i].innerHTML) {
                links[i].className = '';
      }
    }
  });
}
//console.log(matched);
/* The event handler for search function, responds to button click,
 calls searchList() and passes in the value from the input field */
const searchButton = document.getElementsByTagName('button')[0]; 
  searchButton.addEventListener('click', (event) => {
  searchList();  
});
/* A search for students by name or email, new list generated, message on screen if search is empty, and the
function is only called when the search button is clicked. First, the old pagination is removed. Second, in the 
loop all the students are set to display value of none, to make a blank slate. Also, in the loop the names/emails 
of every student are collected and compared to the input value of the search field with a new list created if a 
match ocurs. Third, if no match occurs then a message is written to the screen. Finally, if the list has more than
10 students, page links will be created but only a single page is created if 10 or fewer students are found.*/
function searchList() {
  const matched = [];
  let text = input.value;
  const pagination = document.getElementsByClassName('pagination')[0];
  if(pagination) {
    page.removeChild(pagination);
  }
  
  //console.log(matched);
  for(i = 0; i < matched.length; i += 1) {
    matched.pop();
  }
  //console.log(matched);

  for(let i = 0; i < students.length; i += 1) {
    students[i].style.display = 'none';
    let name = students[i].getElementsByTagName('h3')[0];
      name = name.innerHTML;
    let email = students[i].getElementsByTagName('span')[0];
      email = email.innerHTML;
    if(name.indexOf(text) >= 0 || email.indexOf(text) >= 0) {
      matched.push(students[i]);
    } 
  }
  input.value = '';
  if(matched.length === 0) {
    const h1 = document.createElement('h1');
    h1.innerHTML = 'Student not found.... Please try again.';
    const ul = document.getElementsByClassName('student-list')[0];
    ul.appendChild(h1); 
  } 
  if(matched.length > 10) {
    appendPageLinks(matched);
  }
  showPage(1, matched);
} 
// Call the functions to load the page

appendPageLinks(students);
showPage(1, students);
