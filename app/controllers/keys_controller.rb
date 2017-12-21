class KeysController < ApplicationController

  def show
    session_id = Face.last.session

    render json: { 
      id: ENV['EMOTION_API_ID'],
      key: ENV['EMOTION_API_KEY1'],
      session_id: session_id
    }
  end
end
