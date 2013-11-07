require 'pg'
require 'pry'
require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/activerecord'

set :database, {adapter: 'postgresql',
               database: 'ga-ajax-hacker-posts',
               host: 'localhost'}

class Post < ActiveRecord::Base
  has_many :comments
end

class Comment < ActiveRecord::Base
  belongs_to :post
end

get '/posts.json' do
  Post.all.to_json
end

post '/posts/create' do
  Post.create(title: params[:title], link: params[:link], body: params[:body]).to_json
end

get '/posts/:id/comments.json' do
  Post.find(params[:id]).comments.to_json
end

post '/posts/:id/comments.json' do
  Comment.create(author: params[:author], body: params[:body], post_id: params[:id]).to_json
end

 $('#posts').append("<div class='post'> <div class='post-title'>" + data.title + "</div> <div class='post-link'>" + data.link + "</div> <div class='post-body'>" + data.body + "</div> <form class='comment-form'> <input name='content' class='comment-content-field'/> <button class='comment-create-button'>Submit</button> </form> </div>");