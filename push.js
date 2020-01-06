var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BHgX0R08J-k29Z3tQt1flG37lMRq03UkaKFEsBOmpwZETI49lBqvkEtmWqPPE-aiv0kbwsdJQPCCmNyMVG5z_hE",
   "privateKey": "CSbLOGvkaHy1ixdSHxd4ZGduKL7XPaDLMdHUMdeNQEs"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/d7Z-YU4cAnQ:APA91bHtUZ9_Uf3d1tqt50zkonYseaJqQZwCUJMEnP6__eHVxHLKqkbxbV56P55TdjAnHcVYZA0mLl5Mniu7eQ_TXg3kxSQzBCLXiDW5F6_5spd_QISjEdb0MSfW9QoZVJl3H7J2Attr",
   "keys": {
       "p256dh": "BEWqHyqiwTKH14FkSCP84bONhLgjTuyzpQt7bxUQUH6ezhZjxZK3GtFeYemERujf/wQuPt9rOJLqDkWgFMmJtn0=",
       "auth": "oT1hehnSqA5FSTVF0F4sKQ=="
   }
};
var payload = 'Push Notification from Football App';
 
var options = {
   gcmAPIKey: '859086700525',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);