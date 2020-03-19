
/*打開側欄，修改側欄寬度，主體左跨度、背景透明度*/
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
}
/*關閉側欄，恢復原始側欄寬度，主體左跨度、背景透明度*/
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "#eef2ff";
}

