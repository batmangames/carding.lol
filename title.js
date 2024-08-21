var i=0;
setInterval(function(){
    var titles=[
"carding.lol"
]

    if(i===titles.length) {
        i=0;
    }
    document.title = titles[i];
    i++;
}, 500);

