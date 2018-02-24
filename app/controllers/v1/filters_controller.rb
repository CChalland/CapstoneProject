class V1::FiltersController < ApplicationController

  def index
    filters = Filter.all.order(:id)
    if params[:public_filters]
      filter = {}
      public_filters =[]
      filters.where(public?: true).each do |public_filter|
        public_filters << {
          id: public_filter.id,
          name: public_filter.name,
          anger: public_filter.anger.url,
          contempt: public_filter.contempt.url,
          disgust: public_filter.disgust.url,
          fear: public_filter.fear.url,
          happiness: public_filter.happiness.url,
          neutral: public_filter.neutral.url,
          sadness: public_filter.sadness.url,
          surprise: public_filter.surprise.url
        }
      end
      filter[:publicFilters] = public_filters

    elsif params[:user_filters]
      filter = {}
      public_filters = []
      user_filters = []
      filters.where(public?: true).each do |public_filter|
        public_filters << {
          id: public_filter.id,
          name: public_filter.name,
          anger: public_filter.anger.url,
          contempt: public_filter.contempt.url,
          disgust: public_filter.disgust.url,
          fear: public_filter.fear.url,
          happiness: public_filter.happiness.url,
          neutral: public_filter.neutral.url,
          sadness: public_filter.sadness.url,
          surprise: public_filter.surprise.url
        }
      end
      current_user.filters.each do |user_filter| 
        user_filters << {
          id: user_filter.id,
          name: user_filter.name,
          anger: user_filter.anger.data,
          contempt: user_filter.contempt.data,
          disgust: user_filter.disgust.data,
          fear: user_filter.fear.data,
          happiness: user_filter.happiness.data,
          neutral: user_filter.neutral.data,
          sadness: user_filter.sadness.data,
          surprise: user_filter.surprise.data
        }
      end
      filter[:publicFilters] = public_filters
      filter[:userFilters] = user_filters
    else
      filter = Filter.all.order(:id)
    end
    render json: filter.as_json
  end

  def create
   @filter = Filter.new(
      name: params[:name],
      anger: params[:anger],
      contempt: params[:contempt],
      disgust: params[:disgust],
      fear: params[:fear],
      happiness: params[:happiness],
      neutral: params[:neutral],
      sadness: params[:sadness],
      surprise: params[:surprise],
      user_id: current_user.id,
      public?: false
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

  def update
    filter = Filter.find_by(id: params[:id].to_i)
    filter.name = params[:name]
    filter.anger = params[:anger]
    filter.contempt = params[:contempt]
    filter.disgust = params[:disgust]
    filter.fear = params[:fear]
    filter.happiness = params[:happiness]
    filter.neutral = params[:neutral]
    filter.sadness = params[:sadness]
    filter.surprise = params[:surprise]
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

