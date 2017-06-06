class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable,
         :omniauth_providers => [:facebook, :github, :google_oauth2, :instagram, :linkedin, :twitter]

  #===== Relationships =================================================================================================
  has_many :contacts, inverse_of: :user, dependent: :delete_all

  def self.from_omniauth(auth)
    user = where(email: auth.info.email).take
    if user
      user.provider = auth.provider
      user.uid = auth.uid
      user
    else
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = auth.info.email || "#{auth.uid}@#{auth.provider}"
        user.password = Devise.friendly_token[0, 20]
        # If you are using confirmable and the provider(s) you use validate emails,
        # uncomment the line below to skip the confirmation emails.
        user.skip_confirmation!
      end
    end
  end

end
