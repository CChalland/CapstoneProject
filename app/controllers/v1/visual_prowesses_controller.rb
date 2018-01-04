class V1::VisualProwessesController < ApplicationController

  def index
    if params[:session_emotions]
      last_session = Face.last.session.to_i
      session_index = 1
      emotions = []
      faces = Face.all

      last_session.times do
        session_emotions = []
        selected = faces.select {|face| face.session == session_index}
        selected.each do |face|
          session_emotions << {
            id: face.visual_prowess.id,
            image_name: face.record.image_name,
            image: face.record.image.url,
            anger: (face.visual_prowess.anger * 100).round(4),
            contempt: (face.visual_prowess.contempt * 100).round(4),
            disgust: (face.visual_prowess.disgust * 100).round(4),
            fear: (face.visual_prowess.fear * 100).round(4),
            happiness: (face.visual_prowess.happiness * 100).round(4),
            neutral: (face.visual_prowess.neutral * 100).round(4),
            sadness: (face.visual_prowess.sadness * 100).round(4),
            surprise: (face.visual_prowess.surprise * 100).round(4),
            created_at: face.visual_prowess.friendly_created_at,
            updated_at: face.visual_prowess.friendly_update_at 
          }
        end
        emotions << session_emotions
        session_index += 1
      end

    elsif params[:last]
      emotions = VisualProwess.last

    elsif params[:admin]
      last_session = Face.last.session.to_i
      session_index = 1
      emotions = []
      faces = Face.all

      last_session.times do
        session_emotions = []
        selected = faces.select {|face| face.session == session_index}
        selected.each do |face|
          session_emotions << face.visual_prowess
        end
        emotions << session_emotions
        session_index += 1
      end

    else
      emotions = VisualProwess.all.order(id: :desc)
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
    # @visual_prowess.save
    # render json: response.body

    if @visual_prowess.save
      @record = Record.new(
        image: params[:image]
      )
      if @record.save
        @face = Face.new(
          left_px: params[:leftPx],
          top_px: params[:topPx],
          width_px: params[:widthPx],
          height_px: params[:heightPx],
          visual_prowess_id: @visual_prowess.id,
          user_id: current_user.id,
          record_id: @record.id,
          session: params[:session].to_i
        )
        if @face.save
          render json: @face.as_json
        else
          render json: {errors: @face.errors.full_messages}, status: :bad_request
        end
      else
        render json: {errors: @record.errors.full_messages}, status: :bad_request
      end
    else
      render json: {errors: @visual_prowess.errors.full_messages}, status: :bad_request
    end
  end

  def show
    emotion = VisualProwess.find_by(id: params[:id].to_i)
    render json: emotion.as_json
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
