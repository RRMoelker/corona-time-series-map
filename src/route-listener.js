const tryLogRoute = (url) => {
  if (window.ga) {
    window.ga('send', 'pageview');
  }
};

export const logRouteChanges = () => {
  window.addEventListener('locationchange', function(){
    tryLogRoute(window.location.href);
  });

  // Listener logic based on: https://stackoverflow.com/a/52809105
  history.pushState = ( f => function pushState(){
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  })(history.pushState);

  history.replaceState = ( f => function replaceState(){
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  })(history.replaceState);

  window.addEventListener('popstate',()=>{
    window.dispatchEvent(new Event('locationchange'))
  });
};
