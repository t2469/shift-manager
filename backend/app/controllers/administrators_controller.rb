class AdministratorsController < ApplicationController
  before_action :authenticate_admin, except: [:create]

  def create
    administrator = Administrator.new(administrator_params)
    if administrator.save
      render json: administrator, status: :created
    else
      render json: administrator.errors, status: :unprocessable_entity
    end
  end

  private
  def administrator_params
    params.require(:administrator).permit(:name, :email, :password, :password_confirmation)
  end
end
