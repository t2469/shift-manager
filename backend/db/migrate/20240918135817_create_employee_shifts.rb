class CreateEmployeeShifts < ActiveRecord::Migration[7.0]
  def change
    create_table :employee_shifts do |t|
      t.references :employee, null: false, foreign_key: true # 外部キー制約を追加
      t.references :shift, null: false, foreign_key: true # 外部キー制約を追加
      t.integer :hourly_rate, null: false # 時給を記録

      t.timestamps
    end
  end
end
