import Em from 'ember';

export default Em.Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'style'],

  degrees: Em.computed(function() {
    return 0;
  }),

  scale: Em.computed(function() {
    return 1;
  }),

  style: function() {
    var degrees = this.get('degrees');
    var scale   = this.get('scale');
    return 'transform: rotate(' + degrees + 'deg) scale(' + scale + ');';
  }.property('degrees'),

  height: function() {
    return this.$().height();
  }.property(),

  width: function() {
    return this.$().width();
  }.property(),

  parentHeight: function() {
    return this.$().parent().height();
  }.property(),

  parentWidth: function() {
    return this.$().parent().width();
  }.property(),

  swapWidthAndHeight: function() {
    var height = this.get('height');
    var width  = this.get('width');
    this.set('height', width);
    this.set('width', height);
    width = this.get('width');
    height = this.get('height');
  },

  expandOrShrinkToFit: function() {
    var height = this.get('height');
    var width = this.get('width');

    var scale = this.get('scale');

    var virtualWidth = width * scale;
    var virtualHeight = height * scale;
    
    var ph = this.get('parentHeight');
    var pw = this.get('parentWidth');

    if (virtualWidth > pw) {
      scale = pw / width;
      this.set('scale', scale);
    } else if (virtualHeight > ph) {
      scale = ph / height;
      this.set('scale', scale);
    } else if (virtualWidth < pw && virtualHeight < ph) {
      var widthDiff = pw - width;
      var heightDiff = ph - height;
      if (widthDiff > heightDiff) {
        scale = ph / height;
        this.set('scale', scale);
      } else {
        scale = pw/width;
        this.set('scale', scale);
      }
    }
  },

  click: function() {
    this.incrementProperty('degrees', 90);
    this.swapWidthAndHeight(); //Because javascript doesn't know we've rotated the image with CSS
    this.expandOrShrinkToFit();
    this.expandOrShrinkToFit(); //Just a hacky fix for smaller images. Can get rid if we expand on load.
  }

});
