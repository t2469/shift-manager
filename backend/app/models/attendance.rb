class Attendance < ApplicationRecord
  belongs_to :employee_shift
  has_one :absence_request
end
