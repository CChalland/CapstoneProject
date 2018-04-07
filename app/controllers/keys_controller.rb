class KeysController < ApplicationController

  def show
    if Face.last
      session_id = Face.last.session
    else
      session_id = 0
    end

    render json: { 
      id: ENV['FACE_API_ID'],
      key: ENV['FACE_API_KEY1'],
      session_id: session_id
    }
  end
end
