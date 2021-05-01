export const positionsUsers = async () => {
    try {
        var options = {
            url: "/api/positions", //提交地址：默认是form的action,如果申明,则会覆盖
            type: "post",   //默认是form的method（get or post），如果申明，则会覆盖
            success: (res) => {
                console.log(res);
            },  //提交成功后的回调函数
            error: (err) => {
                console.log(err);
            },
            dataType: "json", //html(默认), xml, script, json...接受服务端返回的类型
            resetForm: true,  //成功提交后，是否重置所有表单元素的值
            timeout: 3000     //限制请求的时间，当请求大于3秒后，跳出请求
        };
        $('#positionForm').ajaxSubmit(options)
        return options
    } catch (err) {
        console.log(err);
    }
}