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

  aspectRatio: function() {
    var height = this.get('height');
    var width  = this.get('width');

    return height / width;
  }.property('height', 'width'),

  parentAspectRatio: function() {
    var height = this.get('parentHeight');
    var width  = this.get('parentWidth');

    return height / width;
  }.property('parentHeight', 'parentWidth'),

  isPortrait: function() {
    return this.get('width') < this.get('height');
  }.property(),

  style: function() {
    var degrees = this.get('degrees');
    var scale   = this.get('scale');
    return 'transform: rotate(' + degrees + 'deg) scale(' + scale + ');';
  }.property('degrees'),

  src: function() {
    //return 'test.jpg';
    return 'noah.jpg';
    //return 'noah2.jpg';
    //return 'noah3.jpg';
    //return 'noah4.jpg';
    //return 'noah5.jpg';
    //return 'noah6.jpg';
  }.property(),

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

  click: function() {
    var degrees = this.get('degrees');
    if (degrees === 270) {
      this.set('degrees', 0);
    } else {
      this.incrementProperty('degrees', 90);
    }

    var scale = this.get('scale');
    var aspectRatio = this.get('parentAspectRatio');
    var isPortrait = this.get('isPortrait');
    var ratio = aspectRatio;

    if (isPortrait) {
      ratio = 1 / aspectRatio;
    }

    if (scale === 1) {
      this.set('scale', ratio);
    } else {
      this.set('scale', 1);
    }

    var height = this.get('height');
    var width  = this.get('width');
    var ph     = this.get('parentHeight');
    var pw     = this.get('parentWidth');

    console.log('IMAGE - width: ', width, ', height: ' + height);
    console.log('PARENT - width: ', pw, ', height: ' + ph);

    console.log('PORTRAIT?', this.get('isPortrait'));

    console.log('ASPECT RATIO: ', this.get('aspectRatio'));
  }
});
