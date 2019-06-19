let del = document.querySelector(".delete");
if (del) {
    del.onclick = function (ev) {
        let that = this;
        if (that) {
            $.ajax({
                url : '/home/api/delete',
                data : {
                    deleteId : that.getAttribute('my-id')
                },
                type : 'get',
                success : function (resu) {
                    if (resu.ok) {
                        that.parentNode.parentNode.remove();
                    }
                }
            });
        }
    }
}