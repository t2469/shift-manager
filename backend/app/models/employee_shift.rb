class EmployeeShift < ApplicationRecord
  belongs_to :employee
  belongs_to :shift
  has_many :attendances, dependent: :destroy
end
