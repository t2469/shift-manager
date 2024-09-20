class CreateAttendances < ActiveRecord::Migration[7.0]
  def change
    create_table :attendances do |t|
      t.references :employee_shift, null: false
      t.date :date, null: false
      t.string :status, null: false, default: "present" # 出欠状況（出勤:present, 欠勤:absent）

      t.timestamps
    end
  end
end
