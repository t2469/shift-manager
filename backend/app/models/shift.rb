class Shift < ApplicationRecord
  has_many :employee_shifts, dependent: :destroy # 中間テーブルとの関連付け
  has_many :employees, through: :employee_shifts # 中間テーブルを通じてシフトとの多対多を定義
  has_one :subject
end
