class Users::OmniauthCallbacksController < ApplicationController
  def omniauth_response
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to root_path
    end
  end

  def failure
    redirect_to root_path
  end

  alias_method :facebook, :omniauth_response
  alias_method :github, :omniauth_response
  alias_method :google_oauth2, :omniauth_response
  alias_method :instagram, :omniauth_response
  alias_method :linkedin, :omniauth_response
  alias_method :twitter, :omniauth_response
end
