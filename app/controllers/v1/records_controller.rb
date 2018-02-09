class V1::RecordsController < ApplicationController

  def index
    record = Record.all.order(:id)
    if params[:search_type]
      record = record.where(" type ILIKE ?", "%#{params[:search_type]}%")
    end
    render json: record.as_json
  end

  def create
   record = Record.new(
      image_name: params[:image_name],
      image: params[:image]
    )
    if record.save
      render json: record.as_json
    else
      render json: {errors: record.errors.full_messages}, status: :bad_request
    end
  end

  def show
    return_datum = Record.find_by(id: params[:id].to_i)
    render json: return_datum.as_json
  end

  def update
    record = Record.find_by(id: params[:id].to_i)
    record.type = params[:type] || record.type
    record.image = params[:image] || record.image
    if record.save
      render json: record.as_json
    else
      render json: {errors: record.errors.full_messages}, status: :bad_request
    end

  end

  def destroy
    record = Record.find_by(id: params[:id].to_i)
    record.destroy
    render json: {message: "You have deleted this record"}
  end
end
