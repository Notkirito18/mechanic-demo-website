$(document).ready(function () {
  //* booking Form
  const bookForm = $("#book-form");
  const bookFormSubmit = $("#book-submit-btn");
  // Reset previous error messages and reset form
  resetErrorMessages();
  bookForm.trigger("reset");
  // Add event listener for form submission
  bookFormSubmit.on("click", () => {
    // variables
    var nameValue = $("#name-input").val();
    var emailValue = $("#email-input").val();
    var phoneValue = $("#phone-input").val();
    var dateValue = $("input[type='date']").val();
    var timeValue = $("input[type='time']").val();
    // errors
    const nameError = $("#name-error");
    const emailError = $("#email-error");
    const phoneError = $("#phone-error");
    const dateError = $("#date-error");
    const timeError = $("#time-error");

    var formIsValid = true;

    // Reset previous error messages
    resetErrorMessages();

    // Name validation
    if (nameValue.length < 2) {
      nameError.text("Name must be at least 2 characters");
      nameError.css("display", "block");
      formIsValid = false;
    }

    // Email and phone validation using regular expressions
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^\+?[0-9]+$/;

    var isEmailValid = emailValue.match(emailPattern);
    var isPhoneValid = phoneValue.length >= 5 && phoneValue.match(phonePattern);

    // Check if at least one valid contact method is provided
    if (!isEmailValid && !isPhoneValid) {
      emailError.text("Please enter a valid email or phone number.");
      emailError.css("display", "block");
      phoneError.text("Please enter a valid email or phone number.");
      phoneError.css("display", "block");
      formIsValid = false;
    } else {
      // Show specific error only if one is present but invalid
      if (emailValue.length > 0 && !isEmailValid) {
        emailError.text("Invalid email format");
        emailError.css("display", "block");
        formIsValid = false;
      }
      if (phoneValue.length > 0 && !isPhoneValid) {
        phoneError.text("Enter a valid phone number or leave empty");
        phoneError.css("display", "block");
        formIsValid = false;
      }
    }

    // --- DATE validation ---
    if (!dateValue) {
      dateError.text("Date is required").css("display", "block");
      formIsValid = false;
    } else {
      const selectedDate = new Date(dateValue);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // remove time portion

      if (selectedDate <= today) {
        dateError.text("Please select a future date").css("display", "block");
        formIsValid = false;
      }
    }

    // --- TIME validation ---
    if (!timeValue) {
      timeError.text("Time is required").css("display", "block");
      formIsValid = false;
    } else {
      const [hour, minute] = timeValue.split(":").map(Number);
      const totalMinutes = hour * 60 + minute;
      const minTime = 8 * 60; // 08:00
      const maxTime = 17 * 60; // 17:00

      if (totalMinutes < minTime || totalMinutes > maxTime) {
        timeError
          .text("Please select working hours time from 08:00 to 17:00")
          .css("display", "block");
        formIsValid = false;
      }
    }

    // Prevent form submission if validation fails
    if (formIsValid) {
      // send form via AJAX
      $.ajax({
        url: bookForm.attr("action"),
        method: bookForm.attr("method"),
        data: bookForm.serialize(),
        success: () => {
          // show the notification
          $("#success-notif")
            .fadeIn(300)
            // after 1.5s, fade out & reload
            .delay(1500)
            .fadeOut(300, () => {
              window.scrollTo(0, 0); // Scroll to top
              location.reload();
            });
        },
        error: () => {
          // you can handle errors here if you want
          alert("Something went wrong. Please try again.");
        },
      });
    }
  });
});

resetErrorMessages = () => {
  const messages = document.getElementsByClassName("error-msg");
  if (messages && messages.length > 0) {
    Array.from(messages).forEach((element) => {
      element.style.display = "none";
    });
  }
};
