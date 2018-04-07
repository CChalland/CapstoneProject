require 'unirest'
require 'pp'
require "tty-prompt"



class User
  attr_reader :admin_user, :quit_temp

  def initialize
    @base_url = "http://localhost:3000"
    @jwt = ""
    @prompt = TTY::Prompt.new
    @menu_options = {
      "Show all session emotions" => -> do show_session_emotions end,
      "Show all user's filters" => -> do show_user_filters end,
      "Show user's info" => -> do show_user_info end,
      "[Admin] Show all session emotions" => -> do show_admin_session_emotions end,
      "Sign up (create a user)" => -> do  end,
      "Log in (create a jwt)" => -> do login end,
      "Log out (destroy the jwt)" => -> do logout end,
      "Quit" => -> do quit end
    }
  end

  def show_menu
    system "clear"
    return @prompt.select("Choose an option:", @menu_options.keys)
  end

  def show_session_emotions
    response = Unirest.get("localhost:3000/v1/visual_prowesses?session_emotions=true")
    pp response.body
  end

  def show_user_filters
    response = Unirest.get("localhost:3000/v1/filters?user_filters=true")
    pp response.body
  end

  def show_user_info
    response = Unirest.get("localhost:3000/v1/users?current_user=true")
    pp response.body
  end

  def show_admin_session_emotions
    response = Unirest.get("localhost:3000/v1/visual_prowesses?admin_session_emotions=true")
    pp response.body
  end

  def signup
    print "Enter username: "
    input_user_name = gets.chomp
    print "Enter email: "
    input_email = gets.chomp
    print "Enter Full Name: "
    input_full_name = gets.chomp
    print "Enter Birth Date: "
    input_birth_date = gets.chomp
    print "Enter Gender: "
    input_gender = gets.chomp
    print "Enter password: "
    input_password = gets.chomp
    print "Confirm password: "
    input_password_confirmation = gets.chomp
    response = Unirest.post(
      "#{@base_url}/v1/users",
      parameters: {
        user_name: input_user_name,
        email: input_email,
        password: input_password,
        password_confirmation: input_password_confirmation,
        full_name: input_full_name,
        birth_date: input_birth_date,
        gender: input_gender
      }
    )
    pp response.body
  end

  def login
    print "Enter email: "
    @user_email = gets.chomp
    print "Enter password: "
    input_password = gets.chomp
    response = Unirest.post(
      "#{@base_url}/user_token",
      parameters: {
        auth: {
          email: @user_email,
          password: input_password
        }
      }
    )
    @jwt = response.body["jwt"]
    Unirest.default_header("Authorization", "Bearer #{@jwt}")
    pp response.body
  end

  def logout
    @jwt = ""
    @admin_user = false
    Unirest.clear_default_headers()
    puts "Logged out successfully!"  
  end

  def quit
    puts "Goodbye!"
    @quit = true   
    exit
  end

  def run
    while true
      input_option = show_menu
      menu_method = @menu_options[input_option]
      if menu_method
        menu_method.call
      else
        puts "Unknown option."        
      end
      puts "Press enter to continue"
      gets.chomp
    end     
  end
end

user = User.new
user.run()


