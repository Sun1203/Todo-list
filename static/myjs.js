function post() {
    let comment = $("#textarea-post").val()
    let today = new Date().toISOString()
    $.ajax({
        type: "POST",
        url: "/posting",
        data: {
            comment_give: comment,
            date_give: today
        },
        success: function (response) {
            $("#modal-post").removeClass("is-active")
            window.location.reload()
        }
    })
}

function done_bucket(_id) {
            $.ajax({
                type: "POST",
                url: "/bucket/done",
                data: {num_give: num},
                success: function (response) {
                    alert(response["msg"])
                    window.location.reload()
                }
            });
        }
function toggle_2(post_id){
     $.ajax({
                type: "POST",
                url: "/doneCheck",
                data: {post_id_give_2: post_id},
                success: function (response) {
                    alert(response["msg"])
                    window.location.reload()
                }
            });

}
function toggle_3(){

}
function get_posts(username) {
    if (username == undefined) {
        username = ""
    }
    $("#post-box").empty()
    $.ajax({
        type: "GET",
        url: `/get_posts?username_give=${username}`,
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let posts = response["posts"]
                //let post_num = response["post_num"]
                for (let i = 0; i < posts.length; i++) {
                    let post = posts[i]
                    //let post_num_2 = post_num[i]
                    let time_post = new Date(post["date"])
                    let time_before = time2str(time_post)

                    let class_heart = post['heart_by_me'] ? "fa-heart" : "fa-heart-o"
                    let class_star = post['star_by_me'] ? "fa-star" : "fa-star-o"
                    let class_like = post['like_by_me'] ? "fa-thumbs-up" : "fa-thumbs-o-up"


                //  if (post_num_2 == 0) {
                        let html_temp = `<div class="box" id="${post["_id"]}">
                                        <article class="media">
                                            <div class="media-content">
                                                <div class="content">
                                                    <p>
                                                        <small>${time_before}</small>
                                                        <br>
                                                       <a>✅</a>${post['comment']}<button onclick="#">완료</button><button onclick="toggle_3()">삭제</button>
                                                        
                                                    </p>
                                                </div>
                                                
                                            </div>
                                        </article>
                                    </div>`
                        $("#post-box").append(html_temp)
                       // console.log('post_num_2')
                 //  }
                    // else if(post_num == 1)
                    // {
                    //     let html_temp = `<div class="box" id="${post["_id"]}">
                    //                     <article class="media">
                    //                         <div class="media-content">
                    //                             <div class="content">
                    //                                 <p>
                    //                                     <small>${time_before}</small>
                    //                                     <br>
                    //                                    <a class="done">✅</a>${post['comment']}<button onclick="#">완료</button><button onclick="toggle_3()">삭제</button>
                    //
                    //                                 </p>
                    //                             </div>
                    //
                    //                         </div>
                    //                     </article>
                    //                 </div>`
                    //     $("#post-box").append(html_temp)
                    // }
                }
            }
        }
    })
}

function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60  // 분

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60  // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
        return parseInt(time) + "일 전"
    }
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

function num2str(count) {
    if (count > 10000) {
        return parseInt(count / 1000) + "k"
    }
    if (count > 500) {
        return parseInt(count / 100) / 10 + "k"
    }
    if (count == 0) {
        return ""
    }
    return count
}

function toggle_like(post_id, type) {
    console.log(post_id, type)
    let $a_like = $(`#${post_id} a[aria-label='${type}']`)
    let $i_like = $a_like.find("i")
    let class_s = {"heart": "fa-heart", "star": "fa-star", "like": "fa-thumbs-up"}
    let class_o = {"heart": "fa-heart-o", "star": "fa-star-o", "like": "fa-thumbs-o-up"}
    if ($i_like.hasClass(class_s[type])) {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "unlike"
            },
            success: function (response) {
                console.log("unlike")
                $i_like.addClass(class_o[type]).removeClass(class_s[type])
                $a_like.find("span.like-num").text(num2str(response["count"]))
            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "like"
            },
            success: function (response) {
                console.log("like")
                $i_like.addClass(class_s[type]).removeClass(class_o[type])
                $a_like.find("span.like-num").text(num2str(response["count"]))
            }
        })

    }
}