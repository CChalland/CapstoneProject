require 'unirest'
require 'pp'

puts "Enter the session id for the emotion you want to view:"
input = gets.chomp.to_i
response = Unirest.get("localhost:3000/v1/visual_prowesses?session_emotions=#{input}")
pp response.body
