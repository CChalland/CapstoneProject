User.destroy_all
Record.destroy_all
Face.destroy_all
VisualProwess.destroy_all
Sharingan.destroy_all
Filter.destroy_all

User.create!([
  {user_name: "admin", email: "admin@uchiha.com", password_digest: "$2a$10$BbaXKYNVwSw/eSjFzkAj4eDkO.vWcUNHE5lJYwrnV3/CupKOy35lG", full_name: "Itachi Uchiha", birth_date: "5/19/1993", gender: "Male", membership: false, admin: true},
  {user_name: "test", email: "test@test.com", password_digest: "$2a$10$BbaXKYNVwSw/eSjFzkAj4eDkO.vWcUNHE5lJYwrnV3/CupKOy35lG", full_name: "Bill Bob", birth_date: "2/1/2018", gender: "Q", membership: false, admin: false}
])
Filter.create!([
  {name: "Animal", anger: File.new('public/img/filters/speak-no-monkey.png'), contempt: File.new('public/img/filters/koala.png'), disgust: File.new('public/img/filters/pirate-skull.png'), fear: File.new('public/img/filters/see-no-monkey.png'), happiness: File.new('public/img/filters/simba.png'), neutral: File.new('public/img/filters/panda.png'), sadness: File.new('public/img/filters/mufasa.png'), surprise: File.new('public/img/filters/cartoon-see-no-monkey.png'), user_id: 1, public?: true},
  {name: "Beavers", anger: File.new('public/img/filters/beavers/angry-beaver.png'), contempt: File.new('public/img/filters/beavers/surf-beaver.png'), disgust: File.new('public/img/filters/beavers/very-anger-beaver.png'), fear: File.new('public/img/filters/beavers/devil-beaver.png'), happiness: File.new('public/img/filters/beavers/hero-beaver.png'), neutral: File.new('public/img/filters/beavers/lick-beaver.png'), sadness: File.new('public/img/filters/beavers/sad-beaver.png'), surprise: File.new('public/img/filters/beavers/farting-beaver.png'), user_id: 1, public?: true},
  {name: "Cartoon", anger: File.new('public/img/filters/french-ghost.png'), contempt: File.new('public/img/filters/shades-ghost.png'), disgust: File.new('public/img/filters/poop.png'), fear: File.new('public/img/filters/rocker.png'), happiness: File.new('public/img/filters/cartoon-santa.png'), neutral: File.new('public/img/filters/anonymous.png'), sadness: File.new('public/img/filters/japanese-goblin.png'), surprise: File.new('public/img/filters/cartoon-see-no-monkey.png'), user_id: 1, public?: true},
  {name: "Celebrity", anger: File.new('public/img/filters/celebrity/trump.png'), contempt: File.new('public/img/filters/celebrity/vin-diesel.png'), disgust: File.new('public/img/filters/celebrity/nick2.png'), fear: File.new('public/img/filters/celebrity/nick1.png'), happiness: File.new('public/img/filters/celebrity/shaq.png'), neutral: File.new('public/img/filters/celebrity/kanye.png'), sadness: File.new('public/img/filters/celebrity/putin.png'), surprise: File.new('public/img/filters/celebrity/superbad-evan.png'), user_id: 1, public?: true},
  {name: "Emoji", anger: File.new('public/img/filters/angry.png'), contempt: File.new('public/img/filters/alien.png'), disgust: File.new('public/img/filters/barf.png'), fear: File.new('public/img/filters/fat-angry.png'), happiness: File.new('public/img/filters/fat-happy.png'), neutral: File.new('public/img/filters/baby.png'), sadness: File.new('public/img/filters/fat-crying.png'), surprise: File.new('public/img/filters/clown.png'), user_id: 1, public?: true}
])
