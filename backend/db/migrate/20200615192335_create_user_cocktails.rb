class CreateUserCocktails < ActiveRecord::Migration[6.0]
  def change
    create_table :user_cocktails do |t|
      t.integer :cocktail_id
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
