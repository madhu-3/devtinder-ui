# Dev Tinder UI

Ep1:
Using:
Vite bundler, Tailwind, Daisy UI -> Configure them

- Deployments:

  - Frontend
    - npm install -> dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - Copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/\* /var/www/html/
    - Enable port :80 of your instance
  - Backend
    - npm install -> dependencies install
    - Add the EC2 public IP in mongo db atlas
    - Enable port 7777 in security group inbound rule
    - npm intsall pm2 -g
    - pm2 start npm --name "devTinder-backend" -- start
    - pm2 logs
    - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"

  Nginx config
  Frontend = http://3.108.237.62/
  Backend = http://3.108.237.62:7777/

  Domain name = devtinder.com =>3.108.237.62

  Frontend = devtinder.com
  Backend = devtinder.com:7777 => devtinder.com/api

  nginx config :

  server_name 3.108.237.62;

  location /api/ {
  proxy_pass http://localhost:7777/; # Pass the request to the Node.js app
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
  }
