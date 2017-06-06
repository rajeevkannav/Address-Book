# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#@user = User.create(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
@user = User.last

20.times() do|index|
  @user.contacts.create!(email: "contact#{index}@headerlabs.com", name: "contact#{index}", phone: '9811289303', address: 'palam colony',
  organization: 'headerlabs', birthday: '12-07-1983', important_contact: [true, false].sample)
end