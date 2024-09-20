class CreateShifts < ActiveRecord::Migration[7.0]
  def change
    create_table :shifts do |t|
      t.datetime :start_time, null: false # シフトの開始時刻
      t.datetime :end_time, null: false # シフトの終了時刻

      t.timestamps
    end
  end
end
