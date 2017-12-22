class V1::FacesController < ApplicationController

  def index
    face = Face.all.order(:id)
    if params[:search_session]
      face = Face.order(session: :desc)
      render json: face.as_json
    
    elsif params[:avg_session_visual_prowess]
      avg_anger = 0
      avg_contempt = 0
      avg_disgust = 0
      avg_fear = 0
      avg_happiness = 0
      avg_neutral = 0
      avg_sadness = 0
      avg_surprise = 0
      faces = Face.where({session: params[:avg_session_visual_prowess]})
      # faces = Face.where({session: params[:avg_session_visual_prowess], user_id: current_user.id})
      faces.each do |face|
        avg_anger += face.visual_prowess.anger * 100
        avg_contempt += face.visual_prowess.contempt * 100
        avg_disgust += face.visual_prowess.disgust * 100
        avg_fear += face.visual_prowess.fear * 100
        avg_happiness += face.visual_prowess.happiness * 100
        avg_neutral += face.visual_prowess.neutral * 100
        avg_sadness += face.visual_prowess.sadness * 100
        avg_surprise += face.visual_prowess.surprise * 100
      end
      render json: {
        avg_anger: avg_anger / faces.length,
        avg_contempt: avg_contempt / faces.length,
        avg_disgust: avg_disgust / faces.length,
        avg_fear: avg_fear / faces.length,
        avg_happiness: avg_happiness / faces.length,
        avg_neutral: avg_neutral / faces.length,
        avg_sadness: avg_sadness / faces.length,
        avg_surprise: avg_surprise / faces.length
      }
    end
    
  end

  def create
    @face = Face.new(
      left_px: params[:leftPx],
      top_px: params[:topPx],
      width_px: params[:widthPx],
      height_px: params[:heightPx],
      visual_prowess_id: params[:visualProwessId],
      sharingan_id: params[:sharinganId],
      user_id: params[:userId],
      record_id: params[:recordId],
      session: params[:session]
    )

    @face.save
    render json: response.body
  end

  def show
    return_face = Face.find_by(id: params[:id].to_i)
    render json: return_face.as_json
  end

  def update
    face = Face.find_by(id: params[:id].to_i)
    face.left_px = params[:left_px]
    face.top_px = params[:top_px]
    face.width_px = params[:width_px]
    face.height_px = params[:height_px] 
    face.visual_prowess_id = params[:emotion_state_id]
    face.sharingan_id = params[:facial_fearture_id]
    face.user_id = params[:user_id]
    face.record_id = params[:record_id]
    face.session = params[:session]
    
    if face.save
      render json: face.as_json
    else
      render json: {errors: face.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    face = Face.find_by(id: params[:id].to_i)
    face.destroy
    render json: {message: "You have deleted this item"}
  end

end
