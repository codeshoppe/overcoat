beforeEach(function () {
  jasmine.addMatchers({
    toHaveFittedOvercoat: function () {
      return {
        compare: function (actual, expected) {
          var $mannequin = actual,
              $overcoat = expected,
              mannequinBoundingBox,
              overcoatBoundingBox,
              mannequinOffset,
              overcoatOffset;

          mannequinBoundingBox = $mannequin[0].getBoundingClientRect();
          overcoatBoundingBox = $overcoat[0].getBoundingClientRect();

          mannequinOffset = $mannequin.offset();
          overcoatOffset = $overcoat.offset();

          pass = mannequinBoundingBox.top === overcoatBoundingBox.top
            && mannequinBoundingBox.left === overcoatBoundingBox.left
            && mannequinBoundingBox.width === overcoatBoundingBox.width
            && mannequinBoundingBox.height === overcoatBoundingBox.height
            && mannequinOffset.top == overcoatOffset.top
            && mannequinOffset.left == overcoatOffset.left;

          return { pass: pass };
        }
      };
    }
  });
});
