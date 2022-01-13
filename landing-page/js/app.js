/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
//1) save ul parent into a variable so we can add li childs to it to build navbar
const ulParent = document.getElementById("navbar__list");
// get all sections in a variable to iterate over
const allSections = document.querySelectorAll("section");
// build document fragment to decrease paintig and reflow
const fragment = document.createDocumentFragment();

/**
 * End Global Variables
*/

/*
*2)function that will create list items as links in the nav bar
*/
function createNavbar(){
    // iterate over all sections
    for (let section of allSections){
        // get the data attribute value to serve as inner text for links
        let text = section.getAttribute("data-nav");
        // build li items
        let liItems = document.createElement('li');
        // build links
        let links = document.createElement('a');
        // build the inner html of each link & text  which is the value of data-nav
        links.innerText = text;
        // append links (a)as childs of li
        liItems.appendChild(links);
        // add event listener for each list items which scrolls smoothly to the required
        //section after clicking on the correct list item
        liItems.addEventListener("click",()=>{
            section.scrollIntoView({behavior: "smooth"});
        })
        // append li items  as childs of ul(navbar)
        ulParent.appendChild(liItems);

    }
}
//  finally call the function to be excuted
createNavbar();

/*3)using intersection observer API to determine active section */
const options = {
  root: null ,// the viewport is the root,
  rootMargin: '0px',
  threshold:'0.5'
}
// IntersectionObserver takes 2 parameters
// 1st parameter is a callback function to be excuted when it meets conditions
// 2nd parameter is options object which are the conditions we specify
let observer = new IntersectionObserver(callback, options);
// define callback function to do something with active section
function callback(entries,observer){
    entries.forEach(entry => {
        // each entry corresponds to each section
        // check if the entry intersects the viewport add active class
        if (entry.isIntersecting) {
            entry.target.classList.add("your-active-class");
            // highlight active item in navbar list
            let listItems = document.querySelectorAll('li');
            listItems.forEach(item=>{
                if (item.innerText === entry.target.getAttribute("data-nav")){
                    item.classList.add("active");
                }else{
                    item.classList.remove("active");
            }})
            // if not intersectiing remove active class
        }else{
            entry.target.classList.remove("your-active-class");
        }
})
}
// call the observer function for each section to observe it
for( let section of allSections ){
    observer.observe(section);
        }
