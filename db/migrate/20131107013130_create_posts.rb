class CreatePosts < ActiveRecord::Migration
  def up
     create_table :posts do |t|
      t.string :title
      t.string :link
      t.text :body
      t.integer :up_votes, default: 0
      t.integer :down_votes, default: 0
      t.integer :total_votes, default: 0
      t.timestamps
    end
  end

  def down
    drop_table :posts
  end
end
