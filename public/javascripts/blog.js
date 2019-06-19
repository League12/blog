

let del = document.querySelectorAll(".delete");
if (del) {
    for (let i = 0;i < del.length;i++) {
        del[i].onclick = function (ev) {
            let that = this;
            $.ajax({
                url : '/home/api/blog',
                data : {
                    deleteId : that.getAttribute('my-id')
                },
                type : 'delete',
                success : function (resu) {
                    if (resu.ok) {
                        that.parentNode.parentNode.remove();
                    }
                }
            });
        }
    }
}

let upda = document.querySelectorAll('.update');
if (upda) {
    for (let i = 0;i < upda.length;i++) {
        upda[i].onclick = function (ev) {
            let that = this;
            $.ajax({
                url : 'home/api/blog',
                data : {
                    findId : that.getAttribute('my-id'),
                },
                type : 'get',
                success : function (resu) {
                    document.querySelector('#updaBtn')
                        .setAttribute('my-id',resu.list._id);
                    document.querySelector('#title').value = resu.list.title;
                    document.querySelector('#content').value = resu.list.content;
                    $('#myModal').modal('toggle');
                }
            });
        }
    }

}

let updaBtn = document.querySelector('#updaBtn');
if (updaBtn) {
    updaBtn.onclick = function () {
        $.ajax({
            url : '/home/api/blog',
            data : {
                updaId : this.getAttribute('my-id'),
                title : document.querySelector('#title').value,
                content : document.querySelector('#content').value
            },
            type : 'put',
            success : function (resu) {
                if (resu.ok) {
                    location.reload();
                }
            }
        });
    }
}









