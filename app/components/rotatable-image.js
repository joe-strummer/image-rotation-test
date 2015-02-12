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

  isPortrait: function() {
    return this.get('width') < this.get('height');
  }.property(),

  style: function() {
    var degrees = this.get('degrees');
    var scale   = this.get('scale');
    return 'transform: rotate(' + degrees + 'deg) scale(' + scale + ');';
  }.property('degrees'),

  src: function() {
    return 'test.jpg';
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
    var aspectRatio = this.get('aspectRatio');

    if (scale === 1) {
      this.set('scale', aspectRatio);
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
