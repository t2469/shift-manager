class SessionsController < ApplicationController
  def admin_login
    login(Administrator, params[:email], params[:password], 'admin_id')
  end

  def employee_login
    login(Employee, params[:email], params[:password], 'employee_id')
  end

  private

  def login(user_class, email, password, id_key)
    user = user_class.find_by(email: email)
    if user&.authenticate(password)
      token = encode_token({ id_key => user.id })
      render json: { token: token, user: { id: user.id, name: user.name, email: user.email } }, status: :ok
    else
      render json: { error: 'メールアドレスまたはパスワードが間違っています' }, status: :unauthorized
    end
  end

  # JWTトークンを生成するメソッド
  def encode_token(payload)
    exp = 24.hours.from_now.to_i
    payload[:exp] = exp
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end
