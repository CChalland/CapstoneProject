require 'unirest'
require 'pp'
base_url = "http://localhost:3000"

while true
  puts "Enter the url of a photo you want to analyze for emotions:"
  input_photo = gets.chomp
  puts
  
  response = Unirest.get("#{base_url}/v1/emotions", parameters: {photo: input_photo})
  pp response.body

  puts "Enter q to quit. Enter any other key to continue"
  quit = gets.chomp

  
  if quit == 'q' || quit == 'Q'
    break
  end
end
