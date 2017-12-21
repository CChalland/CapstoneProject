Rails.application.routes.draw do

  post 'user_token' => 'user_token#create'
  get 'keys' => 'keys#show'
  
  namespace :v1 do
    get '/users' => 'users#index'
    post '/users' => 'users#create'
    get '/users/:id' => 'users#show'
    patch '/users/:id' => 'users#update'
    delete '/users/:id' => 'users#destroy'

    get '/records' => 'records#index'
    post '/records' => 'records#create'
    get '/records/:id' => 'records#show'
    patch '/records/:id' => 'records#update'
    delete '/records/:id' => 'records#destroy'  

    get '/faces' => 'faces#index'
    post '/faces' => 'faces#create'
    get '/faces/:id' => 'faces#show'
    patch '/faces/:id' => 'faces#update'
    delete '/faces/:id' => 'faces#destroy'  

    get '/visual_prowesses' => 'visual_prowesses#index'
    post '/visual_prowesses' => 'visual_prowesses#create'
    get '/visual_prowesses/:id' => 'visual_prowesses#show'
    patch '/visual_prowesses/:id' => 'visual_prowesses#update'
    delete '/visual_prowesses/:id' => 'visual_prowesses#destroy'  

    get '/sharingans' => 'sharingans#index'
    post '/sharingans' => 'sharingans#create'
    get '/sharingans/:id' => 'sharingans#show'
    patch '/sharingans/:id' => 'sharingans#update'
    delete '/sharingans/:id' => 'sharingans#destroy'
  end

end
