$(function(){
    var index=0
    var i=0
    var todos=[
        // {reminder:2016-10-13,content:"哈哈哈",complete:2016-10-14,state:1,beizhu:""},
        // {content:"哈哈哈",state:1,reminder:2016-10-13,complete:2016-10-14},
    ]
    render()
    if(localStorage.todo_data){
        todos=JSON.parse(localStorage.todo_data)
        render()
    }else{
        localStorage.todo_data=JSON.stringify(todos)
    }
    if(todos.length==0){
        $(".content").addClass("active")
    }else{
        $(".content").removeClass("active")
    }

   function render(){
       $.each(todos,function(i,v){
           if(!v.state){
               $("<li>" +
                   "<div class=reminder-time>"+v.reminder+"</div>" +
                   "<div class=content-text>"+v.content+"</div>" +
                   "<div class=complete-time>"+v.complete+"</div>" +
                   "<div class=deal>" +
                   "<div class=complete><div class='icon-font icon-duigou'></div></div>" +
                   "<div class=set-top><div class='icon-font icon-zhiding'></div></div>" +
                   "<div class=del><div class='icon-font icon-icon70lajitong'></div></div>" +
                   "</div></li>").appendTo(".list")
           }
       })
   }


    //新建
    $(".reminder .add").on("click",function(){
        $(".new-page").addClass("active")
        $(".deal").css("left","10.8rem")
    })
    // $(".header .new").on("click",function(){
    //     $(".new-page").addClass("active")
    //     $(".deal").css("left","10.8rem")
    // })

    $(".new-page .sure").on("click",function(){
        if($(".special").val()==""){
            $(".special").addClass("move")
                .delay(900)
                .queue(function(){
                    $(".special").removeClass("move")
                    .dequeue()
                })
        }else if($(".end-line").val()==""){
            $(".end-line").addClass("move")
                .delay(900)
                .queue(function(){
                    $(".end-line").removeClass("move")
                        .dequeue()
                })
        }else{
            todos.push({
                index:i,
                reminder:$(".remind-time").val(),
                content:$(".special").val(),
                complete:$(".end-line").val(),
                beizhu:$(".beizhu").val(),
                state:0
            })
            i++;
            localStorage.todo_data=JSON.stringify(todos)
            $(".new-page").removeClass("active")
            if($(".content").hasClass("active")){
                $(".content").removeClass("active")
            }
            $(".list").empty()
            render()
        }
    })

    $(".header .fanhui").on("click",function(){
        $(".new-page").removeClass("active")
    })

    // 主页操作
    $(".list").on("touchmove","li",function(e){
       var left = e.originalEvent.changedTouches[0].pageX
        $(".deal").css("left","10.8rem")
        $(this).find(".deal").css("left",""+left+"px")
        $(".list").on("touchend","li",function(e){
            if(left < 330){
                $(this).find(".deal").css("left","2.7rem").addClass("active")
            }else{
                $(this).find(".deal").css("left","10.8rem").addClass("active")
            }
        })
    })
    // $(".list").on("click","li",function(e){
    //     var index=$(this).closest("li").index()
    //     console.log(todos[index].content)
    //     $(".new-page").addClass("active")
    //     $(".special").val(todos[index].content)
    //     $(".beizhu").val(todos[index].beizhu)
    //     $(".end-line").val(todos[index].complete)
    //     $(".remind-time").val(todos[index].reminder)
    //     $(".deal").css("left","10.8rem")
    // })

    $(".deal").on("click",function(){
        console.log(1)
        $(".deal").toggleClass("active").css("left","10.8rem")
    })

    $(".list").on("click",".complete",function(e){
        index=$(this).closest("li").index()
        todos[index].state=1
        console.log(index)
        localStorage.todo_data=JSON.stringify(todos)
        // $(".deal").toggleClass("active").css("left","10.8rem")
        $(".list").empty()
        render()
    })

    $(".list .del").on("click",function(){
        var index=$(this).closest("li").index()
        todos.splice(index,1)
        localStorage.todo_data=JSON.stringify(todos)
        $(".list").empty()
        render()
    })
    
    $(".list .set-top").on("click",function(){
        console.log("set-top")
        var index=$(this).closest("li").index()
        todos.push(todos[index])
        todos.splice(index,1)
    })

    //菜单
    $(".header .menue").on("click",function(){
        $(".menue-list").addClass("active")
        $(".header .right .new").addClass("active")
        $(".menue-mask").addClass("active")
    })
    $(".menue-mask").on("click",function(){
        $(this).removeClass("active")
        $(".menue-list").removeClass("active")
        $(".header .right .new").removeClass("active")
    })
    $(".menue-list").on("touchmove",function(e){
        var move=e.originalEvent.changedTouches[0].pageX
        // console.log(move)
        $(this).css("left","-"+(9.72 - move/100)+"rem")
        $(this).on("touchend",function(){
            if(move < 200){
                $(this).css("left","-9.72rem")
                    .delay(300)
                    .queue(function(){
                       $(this) .removeClass("active")
                           .dequeue()
                    })
                $(".menue-mask")
                    .delay(300)
                    .queue(function(){
                       $(this).removeClass("active")
                           .dequeue()
                    })
                $(".header .right .new").removeClass("active")
            }else{
                $(this).css("left",0)
            }
        })
    })
    $(".menue-list ul").on("click","li",function(e){
        var text=$(this).find(".fun").text()
        if(text==="已完成"){
            $(".list").empty()
            $(".jiahao").removeClass("icon-jiahao").addClass("icon-icon70lajitong")
            $.each(todos,function(i,v){
                if(v.state){
                    $("<li>" +
                        "<div class=reminder-time>"+v.reminder+"</div>" +
                        "<div class=content-text>"+v.content+"</div>" +
                        "<div class=complete-time>"+v.complete+"</div>" +
                        "<div class=deal>" +
                        "<div class=complete><div class='icon-font icon-duigou'></div></div>" +
                        "<div class=set-top><div class='icon-font icon-zhiding'></div></div>" +
                        "<div class=del><div class='icon-font icon-icon70lajitong'></div></div>" +
                        "</div></li>").appendTo(".list")
                }
            })
        }
        if(text==="进行中"){
            $(".jiahao").removeClass("icon-icon70lajitong").addClass("icon-jiahao")
            $(".list").empty()
            render()
        }
        $(".menue-list").toggleClass("active")
        $(".menue-mask").toggleClass("active")
        $(".header .right .new").toggleClass("active")
        $(".header .current").text(text)
    })
        $(".header .new").on("click",function(){
            if($(".jiahao").hasClass("icon-icon70lajitong")){
                console.log("del")
                $.each(todos,function(i,v){
                    console.log(v.state)
                    if(v.state){
                        todos.splice(todos[i],1)
                    }
                })
                localStorage.todo_data=JSON.stringify(todos)
                $(".list").empty()
                render()
            }else{
                console.log("add")
                $(".new-page").addClass("active")
                $(".deal").css("left","10.8rem")
            }
        })

    //搜索
    $(".header .search").on("click",function(){
        $(".mask").addClass("active")
    })
    $(".mask .left").on("click",function(){
        $(".mask").removeClass("active")
    })















})