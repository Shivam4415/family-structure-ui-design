var sliderJs = (function () {
  let familyMemberAllowed = 1;
  let sumOfFamilyMember = 0;
  let familyStructureData = {
    memberAllowed: 1,
    selectedMembers: 0,
  };
  function init() {
    $("#modalButton").on("click", show);

    const defaultSlider = 2;
    setupSlider("mySlider4", ["1", "2", "3-4", "5-6", "6+"], defaultSlider);
    familyMemberAllowed = M.TotalFamilyMember[defaultSlider + 1];

    $("#mySlider4 input[type=range]").on("click", function (event, args) {
      const d = event.target;
      const range = parseInt($("#mySlider4 input[type=range]").val());
      familyMemberAllowed = M.TotalFamilyMember[range + 1];
      const slider = M.SliderRange[(range + 1).toString()];
      $("#description").html(slider);
    });
  }

  function calculateSumOfFamily() {
    sumOfFamilyMember = 0;
    $("#familyStructureList")
      .find(".visibility-visible")
      .each((e, i) => {
        sumOfFamilyMember += parseInt($(i).children().select().val());
      });
  }

  function onSelectDropdownChanged() {
    calculateSumOfFamily();
    if (sumOfFamilyMember > familyMemberAllowed) {
      $(this)
        .closest(".uk-list")
        .find(".visibility-hidden")
        .each((e, i) => {
          $(i).find(".uk-checkbox").addClass("uk-disabled");
        });
    } else {
      $(this)
        .closest(".uk-list")
        .find(".visibility-hidden")
        .each((e, i) => {
          $(i).find(".uk-checkbox").removeClass("uk-disabled");
        });
    }
  }

  function handleCheckedElement() {
    // const updatedValue = parseInt(
    //   $(this).parent("label").next().children().select().val()
    // );
    if ($(this).is(":checked")) {
      if (sumOfFamilyMember < familyMemberAllowed) {
        $(this)
          .parent("label")
          .next()
          .removeClass("visibility-hidden")
          .addClass("visibility-visible");
        $(this).parent("label").next().on("change", onSelectDropdownChanged);
      } else {
        UIkit.notification({
          message: "Cannot add more than selected family member",
          status: "warning",
          timeout: 400,
        });
      }
    } else {
      $(this)
        .parent("label")
        .next()
        .removeClass("visibility-visible")
        .addClass("visibility-hidden");
      $(this).parent("label").next().off("change", onSelectDropdownChanged);
    }

    calculateSumOfFamily();
  }

  function saveFamilyStructureData() {
    if (sumOfFamilyMember <= familyMemberAllowed) {
      UIkit.modal("#modal-overflow").hide();

      familyStructureData.memberAllowed = familyMemberAllowed;
      familyStructureData.selectedMembers = sumOfFamilyMember;
      UIkit.notification({
        message:
          "Family Structure Saved Successfully \nData Selected " +
          "\nTotal Member Allowed : " +
          familyMemberAllowed +
          "\nTotal member selected: " +
          sumOfFamilyMember,
        status: "success",
        timeout: 800,
      });
    } else {
      UIkit.notification({
        message: "Cannot add more than selected family member",
        status: "warning",
      });
    }
  }

  function show() {
    $(".uk-list .uk-checkbox").each((e, i) => {
      $(i).on("click", handleCheckedElement);
    });

    UIkit.modal("#modal-overflow").show();

    $("#saveFamilyStructure").on("click", saveFamilyStructureData);
  }

  // setup slider HTML, then call the following method with the values
  function setupSlider(id, vals, initialVal = 0) {
    $(`#${id}`).append($("<div>").addClass("step-marks"));
    $(`#${id}`).append($("<div>").addClass("step-labels"));
    $(`#${id}`).append($('<input type="range">'));

    const min = 0;
    const max = vals.length - 1;

    // initialise slider vals
    $(`#${id} input[type=range]`).attr({ min: min, max: max }).val(initialVal);

    vals.forEach((x, i) => {
      if (i < vals.length - 1) {
        $(`#${id} .step-marks`).append($("<div>"));
      }
      const label = $("<span>")
        .text(x)
        .on("click", () => $(`#${id} input[type=range]`).val(i));
      $(`#${id} .step-labels`).append(label);
    });

    const length = vals.length;
    const multiply = length / (length - 1);
    const widthVal = `calc(100% * ${multiply} - 25px)`;
    const marginVal = `calc(${widthVal} / ${length * -2} + 10px)`;

    $(`#${id} .step-labels`).css("width", widthVal);
    $(`#${id} .step-labels`).css("margin-left", marginVal);
    $(`#${id}`).show();
  }
  return {
    init: init,
  };
})();

$(document).ready(function () {
  sliderJs.init();
});
