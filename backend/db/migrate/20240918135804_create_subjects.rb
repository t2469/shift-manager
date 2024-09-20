class CreateSubjects < ActiveRecord::Migration[7.0]
  def change
    create_table :subjects do |t|
      t.string :name, null: false
      t.references :shift, null: false, foreign_key: true # 外部キー制約を追加

      t.timestamps
    end
  end
end
