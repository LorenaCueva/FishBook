class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  
  def render_not_found(error)
    render json: {errors: error.record.errors.full_messages}, status: :not_found
  end

  def render_unprocessable_entity(error)
    render json: {errors: error.record.errors.full_messages}, status: :unprocessable_entity
  end

  def authorize
    return render json: {errors: ["Not Authorized"]}, status: :unauthorized unless session.include? :user_id
  end

  # def authorize
  #   return render json: {errors: ["Not Authorized"]}, status: :unauthorized unless session[:user_id] == 
  # end

end
