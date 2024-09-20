class CreateAbsenceRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :absence_requests do |t|
      t.string :description
      t.references :attendance, null: false, foreign_key: true

      t.timestamps
    end
  end
end
