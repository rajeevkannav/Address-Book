require "application_responder"

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, prepend: true

  self.responder = ApplicationResponder

  respond_to :json

  def angular
    render 'layouts/application'
  end
end
