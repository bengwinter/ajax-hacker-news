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

get '/posts/comments.json' do
  Post.find(params[:id]).comments
end
