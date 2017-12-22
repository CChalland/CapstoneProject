class V1::VisualProwessesController < ApplicationController
  
  def index
    if params[:session_emotions]
      emotions = []
      faces = Face.where({session: params[:session_emotions].to_i})
      # faces = Face.where({session: params[:session_emotions], user_id: current_user.id})
      faces.each do |face|
        emotions << face.visual_prowess
      end
      emotions.select! { |emotion| emotion != nil }
      
    else
      emotions = VisualProwess.all.order(:id)
    end
    render json: emotions.as_json
  end

  def create

    @visual_prowess = VisualProwess.new(
      anger: params[:anger],
      contempt: params[:contempt],
      disgust: params[:disgust],
      fear: params[:fear],
      happiness: params[:happiness],
      neutral: params[:neutral],
      sadness: params[:sadness],
      surprise: params[:surprise]
    )
    @visual_prowess.save
    # render json: response.body

    if @visual_prowess.save
      @record = Record.new(
        image: params[:image]
      )
      @record.save
      # render json: response.body
    end

    if @visual_prowess.save && @record.save
      @face = Face.new(
        left_px: params[:leftPx],
        top_px: params[:topPx],
        width_px: params[:widthPx],
        height_px: params[:heightPx],
        visual_prowess_id: VisualProwess.last.id,
        # user_id: current_user.id,
        record_id: Record.last.id,
        session: params[:session].to_i
      )
      @face.save
      # render json: response.body
    end

    render json: response.body
  end

  def show

  end

  def update
    visual_prowess = EomtionState.find_by(id: params[:id].to_i)
    visual_prowess.anger = params[:anger] || visual_prowess.anger
    visual_prowess.contempt = params[:contempt] || visual_prowess.contempt
    visual_prowess.disgust = params[:disgust] || visual_prowess.disgust
    visual_prowess.fear = params[:fear] || visual_prowess.fear
    visual_prowess.happiness = params[:happiness] || visual_prowess.happiness
    visual_prowess.neutral = params[:neutral] || visual_prowess.neutral
    visual_prowess.sadness = params[:sadness] || visual_prowess.sadness
    visual_prowess.surprise = params[:surprise] || visual_prowess.surprise

    if emotion_state.save
      render json: emotion_state.as_json
    else
      render json: {errors: emotion_state.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    @visual_prowess.destroy
  end

end
