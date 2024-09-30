class Employee < ApplicationRecord
  has_secure_password
  has_many :employee_shifts, dependent: :destroy # 中間テーブルとの関連付け
  has_many :shifts, through: :employee_shifts # 中間テーブルを通じてshiftとの多対多を定義

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
