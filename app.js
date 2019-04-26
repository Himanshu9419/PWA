// handling article
var template = "<article>\n\
    <img src='https://raw.githubusercontent.com/mdn/pwa-examples/master/js13kpwa/data/img/SLUG.jpg?raw=true' alt='NAME'>\n\
    <h3>#POS. NAME</h3>\n\
    <ul>\n\
    <li><span>Author:</span> <strong>AUTHOR</strong></li>\n\
    <li><span>Twitter:</span> <a href='https://twitter.com/TWITTER'>@TWITTER</a></li>\n\
    <li><span>Website:</span> <a href='http://WEBSITE/'>WEBSITE</a></li>\n\
    <li><span>GitHub:</span> <a href='https://GITHUB'>GITHUB</a></li>\n\
    <li><span>More:</span> <a href='http://js13kgames.com/entries/SLUG'>js13kgames.com/entries/SLUG</a></li>\n\
    </ul>\n\
</article>";
var content = '';
for(var i=0; i<games.length; i++) {
    var entry = template.replace(/POS/g,(i+1))
        .replace(/SLUG/g,games[i].slug)
        .replace(/NAME/g,games[i].name)
        .replace(/AUTHOR/g,games[i].author)
        .replace(/TWITTER/g,games[i].twitter)
        .replace(/WEBSITE/g,games[i].website)
        .replace(/GITHUB/g,games[i].github);
    entry = entry.replace('<a href=\'http:///\'></a>','-');
    content += entry;
};
document.getElementById('content').innerHTML = content;


//register a service worker
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pwa-examples/js13kpwa/sw.js');
};


//request permission to show notification
var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
    Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            randomNotification();
        }
    });
});


//function to genereate random notification
function randomNotification() {
    var randomItem = Math.floor(Math.random()*games.length);
    var notifTitle = games[randomItem].name;
    var notifBody = 'Created by '+games[randomItem].author+'.';
    var notifImg = 'data/img/'+games[randomItem].slug+'.jpg';
    var options = {
        body: notifBody,
        icon: notifImg
    }
    //var notif = new Notification(notifTitle, options);
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification('Notification with ServiceWorker');
    });
    setTimeout(randomNotification, 30000);
}
