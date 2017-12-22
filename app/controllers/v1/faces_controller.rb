class V1::FacesController < ApplicationController

  def index
    if params[:sessions]
      faces = Face.where({session: params[:sessions], user_id: current_user.id})
    else
      faces = Face.all.order(:id)
    end
    render json: faces.as_json
  end

  def create
    @face = Face.new(
      left_px: params[:leftPx],
      top_px: params[:topPx],
      width_px: params[:widthPx],
      height_px: params[:heightPx],
      visual_prowess_id: params[:visualProwessId],
      sharingan_id: params[:sharinganId],
      user_id: current_user.id,
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
    face.left_px = params[:left_px] || face.left_px
    face.top_px = params[:top_px] || face.top_px
    face.width_px = params[:width_px] || face.width_px
    face.height_px = params[:height_px] || face.height_px
    face.visual_prowess_id = params[:emotion_state_id] || face.visual_prowess_id
    face.sharingan_id = params[:facial_fearture_id] || face.sharingan_id
    face.user_id = params[:user_id] || face.user_id
    face.record_id = params[:record_id] || face.record_id
    face.session = params[:session] || face.session
    
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
