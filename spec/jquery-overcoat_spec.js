describe("jquery-overcoat", function() {
  var clickToggler, clock;

  beforeEach(function() {
    loadFixtures('simple_overcoat_fixture.html');
    clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    $(".overcoat").remove();
    clock.restore();
  });

  clickToggler = function($overcoatToggler) {
    $overcoatToggler.click();
    clock.tick(9000);
  };

  describe("click toggler", function() {
    var $overcoatToggler;

    beforeEach(function() {
      $overcoatToggler = $("#overcoat-toggler");
      $overcoatToggler.overcoat();
    });

    describe("when toggler never clicked", function() {
      it("should reveal the overcoat", function() {
        clickToggler($overcoatToggler);
        expect($(".overcoat").is(':visible')).toEqual(true);
      });
    });

    describe("when overcoat is currently on", function() {
      beforeEach(function() {
        clickToggler($overcoatToggler); // ON
      });

      it("should remove the overcoat", function() {
        clickToggler($overcoatToggler); // OFF
        expect($(".overcoat").is(':visible')).toBeFalsy();
      });
    });

    describe("when overcoat is currently off", function() {
      beforeEach(function() {
        clock = sinon.useFakeTimers();
        clickToggler($overcoatToggler); // ON
        clickToggler($overcoatToggler); // OFF
      });

      it("should reveal the overcoat", function() {
        clickToggler($overcoatToggler); // ON
        expect($(".overcoat").is(':visible')).toEqual(true);
      });
    });
  });

  describe("overcoats", function() {
    var $mannequin, $overcoat, $overcoatToggler;

    describe('with default settings', function() {
      beforeEach(function() {
        $mannequin = $("#mannequin");
        $mannequin.css({
          position: 'absolute',
          top: 75,
          left: 390,
          width: 300,
          height: 100
        });

        $(document).scrollTop(100);
        $overcoatToggler = $("#overcoat-toggler");
        $overcoatToggler.overcoat();
        clickToggler($overcoatToggler); // ON

        $overcoat = $(".overcoat");
      });

      it("should fit the mannequin dimensions", function() {
        expect($mannequin).toHaveFittedOvercoat($overcoat);
      });

      it("should have color", function() {
        expect($overcoat.css('background-color')).toEqual('rgba(125, 211, 201, 0.6)');
        expect($overcoat.css('color')).toEqual('rgb(255, 255, 255)');
      });

      it("should have color from custom data attributes", function() {
        clickToggler($overcoatToggler); // OFF
        $mannequin.data('overcoat-bgcolor', 'rgb(255, 0, 0)');
        $mannequin.data('overcoat-color', 'rgb(0, 255, 0)');

        clickToggler($overcoatToggler); // ON
        expect($overcoat.css('background-color')).toEqual('rgb(255, 0, 0)');
        expect($overcoat.css('color')).toEqual('rgb(0, 255, 0)');
      });

      it("should have styled label", function() {
        expect($overcoat.text()).toEqual('Hello, Overcoat!')
        expect($overcoat.css('text-align')).toEqual('center');
        expect(parseInt($overcoat.css('line-height'))).toEqual(100);
        expect($overcoat.css('font-size')).toEqual('30px');
      });
    });

  });

});
