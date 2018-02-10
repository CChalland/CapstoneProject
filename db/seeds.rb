User.destroy_all
Record.destroy_all
Face.destroy_all
VisualProwess.destroy_all
Sharingan.destroy_all

User.create!([
  {user_name: "admin", email: "admin@uchiha.com", password_digest: "$2a$10$BbaXKYNVwSw/eSjFzkAj4eDkO.vWcUNHE5lJYwrnV3/CupKOy35lG", full_name: "Itachi Uchiha", birth_date: "5/19/1993", gender: "Male", membership: false, admin: true},
  {user_name: "test", email: "test@uchiha.com", password_digest: "$2a$10$BbaXKYNVwSw/eSjFzkAj4eDkO.vWcUNHE5lJYwrnV3/CupKOy35lG", full_name: "Bill Bob", birth_date: "2/1/2018", gender: "Q", membership: false, admin: false}
])

# Record.create!([
#   {image: File.new('/../public/Itachi_Uchiha.gif') , image_name: "Battle with your Eyes"},
#   {image: File.new('/../public/Itachi_Uchiha.gif') , image_name: "Battle with our Eyes"}
# ])

# VisualProwess.create!([
#   {anger: 0.000, contempt: 0.000, disgust: 0.000, fear: 0.000, happiness: 0.000, neutral: 0.000, sadness: 0.000, surprise: 0.000},
#   {anger: 0.000, contempt: 0.000, disgust: 0.000, fear: 0.000, happiness: 0.000, neutral: 0.000, sadness: 0.000, surprise: 0.000}
# ])

# Face.create!([
#   {left_px: 0.0, top_px: 0.0, width_px: 0.0, height_px: 0.0, visual_prowess_id: 1, user_id: 2, record_id: 1, session: 0},
#   {left_px: 0.0, top_px: 0.0, width_px: 0.0, height_px: 0.0, visual_prowess_id: 2, user_id: 2, record_id: 2, session: 0}
# ])
