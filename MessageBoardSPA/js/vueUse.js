const vm = new Vue({
    el: '#all',
    data: {
        sideBar: {},
        test: "aaa"
    }
})
ajaxGetSideBarContent()
// console.log(vm.$data.sideBar)

// function getSideBarContent() {
//     fetch('https://localhost:44392/api/categories',
//         {
//             method: "GET",
//             header: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             }})
//         .then(function (response) {
//             console.log(response.json())
//             return response.json();
//         })
// }

function ajaxGetSideBarContent() {
    $.ajax({
        type: "get",
        url: "https://localhost:44392/api/categories",
        async: false,
        success: function (response) {
            vm.$data.sideBar = response
        }
    });
}
