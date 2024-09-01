var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.isDeleting = false;
  this.el.style.transition = 'width 0.5s ease-in-out'; 
  this.tick();
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.el.style.width = '0';  
    var delayBeforeNextWord = 500; 
    
    var that = this;
    setTimeout(function() {
      that.el.innerHTML = fullTxt; 
      that.el.style.width = that.el.scrollWidth + 'px';  
      that.isDeleting = false;
      that.loopNum++;
      that.tick();
    }, delayBeforeNextWord);
  } else {
    this.el.innerHTML = fullTxt; 
    this.el.style.width = this.el.scrollWidth + 'px'; 

    var displayTime = this.period; 
    var delta = displayTime / 2; 

    var that = this;
    setTimeout(function() {
      that.isDeleting = true;
      that.tick();
    }, displayTime);
  }
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};
