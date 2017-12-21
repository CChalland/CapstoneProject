class V1::UsersController < ApplicationController

    def index
    user = User.all.order(:id)
    if params[:search_user_name]
      user = user.where(" user_name ILIKE ?", "%#{params[:search_user_name]}%")
    elsif params[:search_user_email]
      user = user.where(" email ILIKE ?", "%#{params[:search_user_email]}%")
    elsif params[:search_user_created]
      user = User.all.order(created_at: :desc)
    end
    render json: user.as_json
  end

  def create
    user = User.new(
      user_name: params[:user_name],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation],
      full_name: params[:full_name],
      birth_date: params[:birth_date],
      gender: params[:gender],
      membership: false,
      admin: false
    )
    if user.save
      render json: {status: "You have successly created a user"}, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :bad_request
    end
  end

  def show
    return_user = User.find_by(id: params[:id].to_i)
    render json: return_user.as_json
  end

  def update
    user = User.find_by(id: params[:id].to_i)
    user.user_name = params[:user_name]
    user.email = params[:email]
    user.password = params[:password]
    user.password_confirmation = params[:password_confirmation]
    user.full_name = params[:full_name]
    user.birth_date = params[:birth_date]
    user.gender = params[:gender]

    if user.save
      render json: user.as_json
    else
      render json: {errors: user.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    user = User.find_by(id: params[:id].to_i)
    user.destroy
    render json: {message: "You have deleted your Account!"}
  end
end
