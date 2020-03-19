const url = "https://localhost:44392/api/"
const pageUrl = "http://127.0.0.1:5500/html/index.html"
let replyThreadId = -1;
let ContentId = -1;
let categoryId = 1;

const vm = new Vue({
    el: '#all',
    data: {
        sideBar: {},
        newThread: { Name: "", Comment: "" },
        allThreads: {},
        allContents: {},
        reply: { Name: "", Comment: "" },
        singleContent: {},
        modify: false,
        title: "新聞"
    },
    methods: {
        newThreadPost: CreateThread,
        closeReply: CloseReply,
        showReply(e) { ShowReply(e) },
        newContent: NewContent,
        showModify(e) { ShowModify(e) },
        deleteContent: DeleteContent,
        modifyContent: ModifyContent,
        changeBoard(e) { ChangeBoard(e) }
    }
})
//取得sodebar內容
ajaxGetSideBarContent()
//取得content內容
GetContent()

function ChangeBoard(e) {
    categoryId = $(e.target).data('categoryid');
    vm.$data.title = $(e.target).data('categoryname');
    GetContent()
}

function ModifyContent() {
    axios.put(url + "contents/" + ContentId, {
        ContentId: ContentId,
        ContentText: vm.$data.reply.Comment,
        UserName: vm.$data.reply.Name,
        ContentTime: vm.$data.singleContent.contentTime,
        PicUrl: vm.$data.singleContent.picUrl,
        ThreadId: vm.$data.singleContent.threadId
    }).then(function (response) {
        CloseReply()
        GetContent()
        vm.$data.reply.Comment = ""
        vm.$data.reply.Name = ""
    }).catch((error) => { alert(error) })
}

function ReloadPage() {
    window.location.reload(pageUrl)
}

function DeleteContent() {
    axios.delete(url + "contents/" + ContentId).then(function (response) {
        CloseReply()
        GetContent()
    }).catch((error) => { alert(error) })
}

function ShowModify(e) {
    vm.$data.modify = true
    ContentId = $(e.target).parent().data('contentid')
    axios.get(url + "contents/" + ContentId).then(function (response) {
        vm.$data.reply.Name = response.data.userName
        vm.$data.reply.Comment = response.data.contentText
        vm.$data.singleContent = response.data
        document.getElementsByClassName('reply')[0].style.display = 'block'
    }).catch((error) => { alert(error) })
}

function NewContent() {
    axios.post(url + 'contents', {
        ThreadId: replyThreadId,
        ContentText: vm.$data.reply.Comment,
        UserName: vm.$data.reply.Name,
        ContentTime: new XDate().addHours(8),
        PicUrl: ""
    })
        .then(function (response) {
            CloseReply()
            GetContent()
            vm.$data.reply.Comment = ""
            vm.$data.reply.Name = ""
        })
        .catch((error) => { console.error(error) })
}

function ShowReply(e) {
    replyThreadId = $(e.target).parent().parent().data('threadid')
    document.getElementsByClassName('reply')[0].style.display = 'block'
}

function CloseReply() {
    document.getElementsByClassName('reply')[0].style.display = 'none'
    vm.$data.modify = false
    vm.$data.reply.Comment = ""
    vm.$data.reply.Name = ""
}

function CreateThread() {
    axios.post(url + 'threads', { CategoryId: categoryId })
        .then(function (response) {
            GetThreadId()
        })
        .catch((error) => { console.error(error) })
}

function GetThreadId() {
    axios.get(url + "threads").then(function (response) {
        vm.allThreads = response
        CreateContent()
    }).catch((error) => { alert(error) })
}

function CreateContent() {
    let id = vm.$data.allThreads.data[vm.$data.allThreads.data.length - 1].threadId
    axios.post(url + 'contents', {
        ThreadId: id,
        ContentText: vm.$data.newThread.Comment,
        UserName: vm.$data.newThread.Name,
        ContentTime: new XDate().addHours(8),
        PicUrl: ""
    })
        .then(function (response) {
            vm.$data.newThread.Comment = ""
            vm.$data.newThread.Name = ""
            GetContent()
        })
        .catch((error) => { console.error(error) })
}

//取得一個版面所有內容
function GetContent() {
    axios.get(url + 'GetContents/' + categoryId)
        .then((res) => {
            vm.$data.allContents = groupBy(res.data, function (item) {
                return [item.threadId]
            }).reverse()
        })
        .catch((error) => { console.error(error) })
}

function groupBy(array, f) {
    let groups = {};
    array.forEach(function (o) {
        let group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
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
