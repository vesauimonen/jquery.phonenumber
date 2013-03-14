/*
 *  Project: jQuery.phoneNumber
 *  Description: Uses PhoneFormat.js to format input field as user inputs a phone number.
 *  Author: @vesauimonen
 *  License: MIT License
 *
 *  PhoneFormat.js Copyright (C) Alan Beebe (alan.beebe@gmail.com).
 *  http://www.phoneformat.com/
 *  PhoneFormat.js is licensed under the Apache License, Version 2.0.
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Plugin boilerplate by Zeno Rocha and Addy Osmani.
 *  http://jqueryboilerplate.com/
 */

;(function($, window, document, undefined) {

  var pluginName = 'phoneNumber';
  var defaults = {
    country: 'FI',
    format: 'local'
  };

  function Plugin(element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      // Associated PhoneFormat.js methods
      this.formats = {
        'local': formatLocal,
        'international': formatInternational,
        'e164': formatE164
      };
      var self = this;
      this.$element.keypress(function(event) {
        self.processKeyPress(event);
      });
    },
    processKeyPress: function(event) {
      var newNumber;
      if (this.isValidInput(event)) {
        if (this.focusAtEnd()) {
          event.preventDefault();
          newNumber = this.formats[this.options.format.toLowerCase()](
            this.options.country.toUpperCase(),
            this.$element.val() + String.fromCharCode(event.which)
          );
          this.$element.val(newNumber);
        }
      } else {
        event.preventDefault();
      }
    },
    focusAtEnd: function() {
      if (this.$element.prop('selectionStart') === null ||
          this.$element.prop(
            'selectionStart'
            ) === this.$element.val().length) {
        return true;
      }
      return false;
    },
    isValidInput: function(event) {
      var SPACE = 32,
        SPECIAL_CHAR_WEBKIT = 0,
        SPECIAL_CHAR_FIREFOX = 33;
      if (event.metaKey || event.ctrlKey) {
        return true;
      } else if (event.which === SPACE) {
        return false;
      } else if (event.which === SPECIAL_CHAR_WEBKIT) {
        return true;
      } else if (event.which < SPECIAL_CHAR_FIREFOX) {
        return true;
      } else if (this.$element.val().length >= 16) {
        return false;
      } else {
        var re = /^\d$/;
        return re.test(String.fromCharCode(event.which)) ||
          String.fromCharCode(event.which) === '+';
      }
    }
  };

  // Plugin wrapper
  $.fn[pluginName] = function(options) {
    if (typeof formatLocal === 'undefined') {
      // PhoneFormat.js not loaded
      $.error( 'jQuery.' + pluginName + ' depency PhoneFormat.js not loaded' );
      return;
    }
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);