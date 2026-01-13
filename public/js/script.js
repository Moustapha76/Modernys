var open = document.querySelector('header button.open');
var close = document.querySelector('header button.close');
var nav = document.querySelector('header nav.navbar-mobile');
open.addEventListener('click', function() {
    nav.style.transition = "all .3s linear";
    nav.style.display = "flex";
})
close.addEventListener('click', function() {
        nav.style.display = "none";
    })
var navbar = document.querySelector('header div.navbar')
window.addEventListener('scroll', function(){
    if(window.scrollY > 0){navbar.classList.add('fixed')}
    else{navbar.classList.remove('fixed')}
})

function change() {
    let results = Array.from(document.querySelectorAll('.result > div'));
    let checkboxes = Array.from(document.querySelectorAll('.checkbox label'));
    // Hide all results
    results.forEach(function(result) {
      result.style.display = 'none';
    });
    checkboxes.forEach(function(checkb) {
      checkb.classList.remove('filterChecked');
    });
    // Filter results to only those that meet ALL requirements:
    Array.from(document.querySelectorAll('.filter input[rel]:checked'), function(input) {
        const attrib = input.getAttribute('rel');
        input.parentElement.classList.add('filterChecked');
        results = results.filter(function(result) {
            return result.classList.contains(attrib);
        });
    });
    // Show those filtered results:
    results.forEach(function(result) {
        result.style.display = 'flex';
    });
}
change();


// var openbtn = document.querySelector('header button.open');
// var close = document.querySelector('header button.close');
// var navbar = document.querySelector('header nav.navbar');
// openbtn.addEventListener('click', function() {
//     navbar.style.transition = "all .3s linear";
//     navbar.style.transform = "translate(0px)";
//     navbar.style.opacity = 1;
// })
// close.addEventListener('click', function() {
//         navbar.style.transition = "all .3s linear";
//         navbar.style.transform = "translate(300px)";
//         navbar.style.opacity = 0;
//     })