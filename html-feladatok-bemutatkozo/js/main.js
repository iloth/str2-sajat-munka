function menubars_click(){
    var nav = document.querySelector("nav");

    if(!nav.style.display || nav.style.display === "none") {
        nav.style.display = "inline-block";
    } else {
        nav.style.display = "none";
    }
    
}

function scrolltop_click(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}