
    function ajax(opt) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', opt.url, true)
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                 opt.success(xhr.responseText)
            }
        }
    }
