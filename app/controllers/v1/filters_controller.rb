class V1::FiltersController < ApplicationController

  def index
    filter = Filter.all.order(:id)
    if params[:search_emotion]
      filter = filter.where("emotion ILIKE ?", "%#{params[:search_emotion]}%")
    end
    render json: filter.as_json
  end

  def create
   @filter = Filter.new(
      anger: params[:anger],
      contempt: params[:contempt],
      disgust: params[:disgust],
      fear: params[:fear],
      happiness: params[:happiness],
      neutral: params[:neutral],
      sadness: params[:sadness],
      surprise: params[:surprise],
      category: params[:category],
      user_id: current_user.id,
      public?: true
    )
    if @filter.save
      render json: @filter.as_json
    else
      render json: {errors: @filter.errors.full_messages}, status: :bad_request
    end
  end

  def show
    return_datum = Filter.find_by(id: params[:id].to_i)
    render json: return_datum.as_json
  end

  # def update
  #   filter = Filter.find_by(id: params[:id].to_i)
  #   filter.image = params[:type] || filter.image
  #   filter.emotion = params[:emotion] || filter.emotion
  #   filter.category = params[:category] || filter.category
  #   filter.public? = params[:public?] || filter.public?
  #   if filter.save
  #     render json: filter.as_json
  #   else
  #     render json: {errors: filter.errors.full_messages}, status: :bad_request
  #   end
  # end

  def destroy
    filter = Filter.find_by(id: params[:id].to_i)
    filter.destroy
    render json: {message: "You have deleted this filter"}
  end

end
