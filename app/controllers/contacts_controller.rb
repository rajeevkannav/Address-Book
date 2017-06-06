class ContactsController < ApplicationController

  respond_to :json
  before_action :authenticate_user!

  def index
    respond_with current_user.contacts
  end

  def create
    respond_with current_user.contacts.create(contact_params)
  end

  def show
    respond_with current_user.contacts.find(params[:id])
  end

  def update
    @contact = current_user.contacts.find(params[:id])
    if @contact.update(contact_params)
      respond_with @contact
    else
      respond_with @contact, status: 422
    end

  end

  def destroy
    respond_with current_user.contacts.find(params[:id]).destroy
  end

  private
  def contact_params
    params.require(:contact).permit(:name, :email, :phone, :address, :organization, :birthday, :important_contact)
  end

end
