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

function galleryImage_click(img){
    var wrapper = document.querySelector("article.gallery div.wrapper");
    var fullImg = document.querySelector("article.gallery div.wrapper img");

    fullImg.src=img.getAttribute("src");
    wrapper.style.display="block";
}

function fullImage_click(){
    var wrapper = document.querySelector("article.gallery div.wrapper");
    var fullImg = document.querySelector("article.gallery div.wrapper img");

    fullImg.src="";
    wrapper.style.display="none";
}