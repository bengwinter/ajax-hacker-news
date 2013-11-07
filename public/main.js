var Hacker = {};

Hacker.getPosts = function() {
  $.ajax({
    url: '/posts.json',
    dataType: 'json',
    success: function(data) {
      Hacker.renderPosts(data);
    }
  });
};

Hacker.createPost = function() {
  var title = $('#post-title-field').val();
  var link = $('#post-link-field').val();
  var body = $('#post-body-field').val();
  $('#post-title-field').val('');
  $('#post-link-field').val('');
  $('#post-body-field').val('');
  $.ajax({
    url: '/posts/create', 
    type: 'post',
    data: {title: title, link: link, body: body},
    debugger;
    dataType: 'json',
    success: function(data) {
      $('#posts').append("<div class='post'> <div class='post-title'>" + data.title + "</div> <div class='post-link'>" + data.link + "</div> <div class='post-body'>" + data.body + "</div> <form class='comment-form'> <input name='content' class='comment-content-field'/> <button class='comment-create-button'>Submit</button> </form> </div>");
    }
  });
};


Hacker.renderPosts = function(data) {
  $(data).each(function(index, post) {
    $('#posts').append("<div class='post'> <div class='post-title'>" + data.title + "</div> <div class='post-link'>" + data.link + "</div> <div class='post-body'>" + data.body + "</div> <form class='comment-form'> <input name='content' class='comment-content-field'/> <button class='comment-create-button'>Submit</button> </form> </div>");
  });
};

/////////////////

Hacker.getComments = function() {
  $.ajax({
    url: '/posts/:id/comments.json',
    dataType: 'json',
    success: function(data) {
      Hacker.renderComments(data);
    }
  });
}

Hacker.createComment = function() {
  var content = $('#comment-content-field').val();
  $('#comment-content-field').val('');
  $.ajax({
    url: '/comments/create', 
    type: 'post',
    data: {content: content},
    dataType: 'json',
    success: function(data) {
      $('#comments').append("<div class='comment'>" + data.content + "</div>");
    }
  });
};


Hacker.renderComments = function(data) {
  $(data).each(function(index, comment) {
    $('#comments').append("<div class='comment'>" + comment.content + "</div>");
  });
};

$(document).ready(function() {
  Hacker.getComments();
  $('#comment-create-button').click(function(e) {
    e.preventDefault();
    Blog.createComment();
    })

$(document).ready(function() {
  Hacker.getPosts();
  $('#post-create-button').click(function(e) {
    e.preventDefault();
    Hacker.createPost();
    })
});