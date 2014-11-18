//     Overcoat.js 0.0.1
//     http://codeshoppe.github.io/purplecoat.js
//     http://codeshoppe.io
//     (c) 2014 Jennifer Reyes, Code Shoppe
//     Overcoat may be freely distributed under the MIT license.

(function ( $, Bacon ) {
  "use strict";

  var initToggler,
      toggleOvercoats,
      revealOvercoat,
      removeOvercoat,
      initOvercoat,
      handleResize,
      styleOvercoat;

  initToggler = function(toggleElement) {
    var $toggler    = $(toggleElement),
        overcoatName = $toggler.data('overcoat-toggle');

    $toggler.click(function() {
      toggleOvercoats(overcoatName);
    });
  };


  toggleOvercoats = function(name) {
    $("[data-overcoat='" + name + "']").each(function(i, e) {
      var $mannequin = $(e);

      if ($mannequin.hasClass('overcoat-on')) {
        removeOvercoat($mannequin);

      } else if ($mannequin.hasClass('overcoat-off')) {
        revealOvercoat($mannequin);

      } else {
        initOvercoat($mannequin);
      }
    });
  };

  revealOvercoat = function($mannequin) {
    var overcoatId    = $mannequin.data('overcoat-id'),
        overcoatStyle = styleOvercoat($mannequin);

    $mannequin.removeClass('overcoat-off');
    $mannequin.addClass('overcoat-on');


    $("#" + overcoatId)
      .css(overcoatStyle)
      .fadeIn();
  };

  removeOvercoat = function($mannequin) {
    var overcoatId = $mannequin.data('overcoat-id');

    $mannequin.removeClass('overcoat-on');
    $mannequin.addClass('overcoat-off');

    $("#" + overcoatId).fadeOut();
  };

  initOvercoat = function($mannequin) {
    var overcoatId    = "overcoat-" + Date.now().toString(),
        overcoatLabel = $mannequin.data('overcoat-label'),
        overcoatStyle = $.extend(styleOvercoat($mannequin), {'display': 'none'}),
        $overcoat;

    $mannequin
      .data('overcoat-id', overcoatId)
      .removeClass('overcoat-off')
      .addClass('overcoat-on');

    $overcoat = $('<div class="overcoat" />')
      .attr('id', overcoatId)
      .text(overcoatLabel)
      .css(overcoatStyle)
      .appendTo("body")
      .fadeIn();

    handleResize($mannequin, $overcoat);
  };

  handleResize = function($mannequin, $overcoat) {
    $(window).asEventStream('resize')
      .throttle(300)
      .onValue(function() {
        var overcoatStyle;

        if ($overcoat.is(':visible')) {
          overcoatStyle = styleOvercoat($mannequin);
          $overcoat.css(overcoatStyle);
        }
      });
  };

  styleOvercoat = function($mannequin) {
    var boundingBox     = $mannequin[0].getBoundingClientRect(),
        mannequinOffset = $mannequin.offset(),
        customSettings  = {},
        defaultCss;

    defaultCss = {
      'position': 'absolute',
      'top': mannequinOffset.top,
      'left': mannequinOffset.left,
      'width': boundingBox.width,
      'height': boundingBox.height,

      'background-color': "rgba(125, 211, 201, 0.6)",
      'color': 'rgb(255, 255, 255)',

      'z-index': 9999,
      'text-align': 'center',
      'line-height': boundingBox.height.toString() + "px",
      'font-size': boundingBox.width * 0.1
    };

    if ($mannequin.data('overcoat-bgcolor')) {
      customSettings['background-color'] = $mannequin.data('overcoat-bgcolor');
    }
    if ($mannequin.data('overcoat-color')) {
      customSettings.color = $mannequin.data('overcoat-color');
    }

    return $.extend(defaultCss, customSettings);
  };

  $.fn.overcoat = function( options ) {
    return this.each(function(i, e) {
      initToggler($(e));
    });
  };


}( jQuery, Bacon ));
