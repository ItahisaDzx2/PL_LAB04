require 'sinatra'

get '/' do
  erb :index 
end

get '/tests' do
  erb :tests
end

__END__