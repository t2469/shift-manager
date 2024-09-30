class ApplicationController < ActionController::API
  # JWTの認証を行う共通のメソッド
  def authenticate_user(role)
    header = request.headers['Authorization']
    token = header.split(' ').last if header # トークン部分のみを抽出
    begin
      # JWTトークンをデコード、ペイロード部分を取得(ペイロードは配列の最初の要素なので[0])
      decoded = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]

      # クラス名をマッピングして取得
      user_class = {
        'administrator' => 'Administrator',
        'employee' => 'Employee'
      }[role]

      if user_class
        @current_user = user_class.constantize.find(decoded["#{role}_id"])
      else
        render json: { error: '無効な役割' }, status: :unauthorized
      end
    rescue JWT::DecodeError, JWT::ExpiredSignature
      render json: { error: '無効なトークンです' }, status: :unauthorized
    end
  end

  # 管理者を認証するメソッド
  def authenticate_admin
    authenticate_user('administrator')
  end

  # 従業員を認証するメソッド
  def authenticate_employee
    authenticate_user('employee')
  end
end
