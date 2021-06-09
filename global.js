(function (window, document, undefined) {
  var M = {
    version: "0.1",
    assert: false, // commented production code contains 'if (M.assert'
    debug: false,
  };

  function expose() {
    var oldM = window.M;

    M.noConflict = function () {
      window.M = oldM;
      return this;
    };

    window.M = M;
  }

  // define M as a global M variable, saving the original M to restore later if needed
  if (typeof window !== "undefined") {
    expose();
  }

  M.Util = {
    isNullOrUndefined: function (x) {
      return x === null || x === undefined;
    },
    isNullUndefinedOrEmpty: function (x) {
      return x === null || x === undefined || !x.length;
    },
    identifyUser: function (userId, userTraits) {
      return rudderanalytics.identify(userId, userTraits);
    },
  };

  M.isNullOrUndefined = M.Util.isNullOrUndefined;
  M.isNullUndefinedOrEmpty = M.Util.isNullUndefinedOrEmpty;
  M.identifyUser = M.Util.identifyUser;

  M.Enum = {
    SliderRange: {
      1: "I am single",
      2: "We stay together",
      3: "We are a nuclear family",
      4: "We are a semi-nuclear family",
      5: "We are a joint family",
    },
    TotalFamilyMember: {
      1: 1,
      2: 2,
      3: 4,
      4: 6,
      5: 1000,
    },
  };

  M.SliderRange = M.Enum.SliderRange;
  M.TotalFamilyMember = M.Enum.TotalFamilyMember;

  M.Validators = {
    isFirstSubmit: function ($element) {
      var isSubmitted = $element.data("submitted");
      if (!isSubmitted) {
        $element.data("submitted", true);
        return true;
      }
      return false;
    },
  };

  M.isFirstSubmit = M.Validators.isFirstSubmit;

  M.Modal = {};

  M.Page = {};

  M.Control = {};
})(window, document);

function chr(num) {
  return String.fromCharCode(num);
}
