class CreateEmployees < ActiveRecord::Migration[7.0]
  def change
    create_table :employees do |t|
      t.string :name, null: false # 従業員名
      t.string :email, null: false # 従業員のメールアドレス（ログインに使用）
      t.string :password_digest, null: false # bcryptでハッシュ化されたパスワード
      t.timestamps
    end
    # メールアドレスに一意性制約を追加して、重複したアカウントの作成を防止
    add_index :employees, :email, unique: true
  end
end
