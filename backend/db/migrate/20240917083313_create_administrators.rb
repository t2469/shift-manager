class CreateAdministrators < ActiveRecord::Migration[7.0]
  def change
    create_table :administrators do |t|
      t.string :name, null: false # 管理者名
      t.string :email, null: false # 管理者のメールアドレス（ログインに使用）
      t.string :password_digest, null: false # bcryptでハッシュ化されたパスワード
      t.timestamps
    end
    # メールアドレスに一意性制約を追加して、重複したアカウントの作成を防止
    add_index :administrators, :email, unique: true
  end
end
