const url = "https://localhost:44392/api/"

const vm = new Vue({
    el: '#all',
    data: {
        sideBar: {},
        newThread: { Name: "", Title: "", Comment: "" },
        allThreads: {},
        allContents: {}
    },
    methods: {
        newThreadPost: CreateThread,
    }
})
//取得sodebar內容
ajaxGetSideBarContent()
//取得content內容
GetContent()

function CreateThread(){
    axios.post(url+'threads', { CategoryId: 1 })
    .then(function (response) {
    GetThreadId()
    })
    .catch((error) => { console.error(error) })
}

function GetThreadId() {
    axios.get(url+ "threads").then(function (response) {
        vm.allThreads=response
        CreateContent()
        }).catch((error) => {alert(error) })
}

function CreateContent() {
    let id = vm.$data.allThreads.data[vm.$data.allThreads.data.length-1].threadId
    axios.post(url+'contents', { ThreadId: id, 
        ContentText: vm.$data.newThread.Comment,
        UserName :vm.$data.newThread.Name,
        ContentTime: new XDate(),
        PicUrl: ""
    })
    .then(function (response) {
        vm.$data.newThread.Comment =""
        vm.$data.newThread.Name = ""
    })
    .catch((error) => { console.error(error) })
}

function GetContent() {
    axios.get(url +'GetContents/'+"1")
    .then((res) => { 
        vm.$data.allContents = groupBy(res.data, function(item){
            return [item.threadId]
        }).reverse() 
    })
    .catch((error) => { console.error(error) })
}

function groupBy( array , f ) {
    let groups = {};
    array.forEach( function( o ) {
        let group = JSON.stringify( f(o) );
        groups[group] = groups[group] || [];
        groups[group].push( o );
    });
    return Object.keys(groups).map( function( group ) {
        return groups[group];
    });
}
// function CreateThread() {
//     $.ajax({
//         type: "post",
//         url: url + "threads",
//         data: JSON.stringify({ CategoryId: 1 }),
//         contentType: 'application/json',
//         dataType: "json",
//         success: function (response) {
//             GetThreadId()
//         }, error: function (xhr, ajaxOptions, thrownError) {
//             alert(xhr.status);
//             alert(thrownError);
//         }
//     });
// }

// function GetThreadId() {
//     $.ajax({
//         type: "get",
//         url: url + "threads",
//         success: function (response) {
//             console.log(response)
//         }
//     });
// }

function ajaxGetSideBarContent() {
    $.ajax({
        type: "get",
        url: url + "categories",
        async: false,
        success: function (response) {
            vm.$data.sideBar = response
        }
    });
}

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
