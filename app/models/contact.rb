class Contact < ApplicationRecord

  #===== Relationships =================================================================================================
  belongs_to :user, inverse_of: :contacts

  #===== validations ===================================================================================================
  validates :name, presence: true, length: {minimum: 3}
  validates :email, presence: true, uniqueness: {scope: :user, case_sensitive: false, message: 'already exists in your address book' }, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, message: 'doesn\'t seems valid'}
  validates :birthday, :timeliness => {:on_or_before => lambda { Date.current }, :type => :date}, allow_nil: true, allow_blank: true
  validates :phone, length: {minimum: 10, maximum: 11}, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true, allow_blank: true
  validates :address, length: {minimum: 5}, allow_nil: true, allow_blank: true
  validates :organization, length: {minimum: 2}, allow_nil: true, allow_blank: true
end
