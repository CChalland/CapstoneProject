class V1::FiltersController < ApplicationController

  def index
    filter = Filter.all.order(:id)
    if params[:search_emotion]
      filter = filter.where(" filter_emotion ILIKE ?", "%#{params[:search_emotion]}%")
    end
    render json: filter.as_json
  end

  def create
   filter = Filter.new(
      filter: params[:filter]
      filter_emotion: params[:filter_emotion],
      filter_category: params[:filter_category],
      user_id: current_user.id,
      public: params[:public]
    )
    if filter.save
      render json: filter.as_json
    else
      render json: {errors: filter.errors.full_messages}, status: :bad_request
    end
  end

  def show
    return_datum = Filter.find_by(id: params[:id].to_i)
    render json: return_datum.as_json
  end

  def update
    filter = Filter.find_by(id: params[:id].to_i)
    filter.filter = params[:type] || filter.filter
    filter.filter_emotion = params[:filter_emotion] || filter.filter_emotion
    filter.filter_category = params[:filter_category] || filter.filter_category
    filter.public = params[:public] || filter.public
    if filter.save
      render json: filter.as_json
    else
      render json: {errors: filter.errors.full_messages}, status: :bad_request
    end

  end

  def destroy
    filter = Filter.find_by(id: params[:id].to_i)
    filter.destroy
    render json: {message: "You have deleted this filter"}
  end

end
