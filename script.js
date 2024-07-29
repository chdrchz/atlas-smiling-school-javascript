$(document).ready(function () {
  getQuoteData();
  getVideoData();
});

// Show or hide the loader, based on true or false
function showOrHideLoader(shouldShow) {
  if (shouldShow) {
    $(".loader").show();
  } else {
    $(".loader").hide();
  }
}

// Gets quote data from api with ajax
function getQuoteData() {
  // Show the loader while ajax finishes
  showOrHideLoader(true);
  $.ajax({
    url: "https://smileschool-api.hbtn.info/quotes",
    type: "GET",
    success: function (response) {
      // Iterate over response
      response.forEach(function (quote) {
        var item = `<div class="carousel-item d-flex flex-row align-items-center justify-content-center pr-4 pl-4 m-0">
                        <img src="${quote.pic_url}" alt="Image">
                        <div class="container">
                            <p class="quote-text">${quote.text}</p>
                            <p class="quote-text"><strong>${quote.name}</strong></p>
                            <p class="quote-text"><em>${quote.title}</em></p>
                        </div>
                      </div>`;
        $(".quoteCarousel").append(item);
      });

      // Initialize slick carousel after appending items
      $(".quoteCarousel").slick({
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
        prevArrow:
          '<img src="/images/arrow_white_left.png" class="quoteImage" />',
        nextArrow:
          '<img src="/images/arrow_white_right.png" class="quoteImage" />',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              centerMode: false,
            },
          },
        ],
      });

      // Hide the loader since ajax finished
      showOrHideLoader(false);
    },
    error: function (error) {
      console.error(error);
    },
  });
}

// Gets quote data from api with ajax
function getVideoData() {
  $.ajax({
    url: "https://smileschool-api.hbtn.info/popular-tutorials",
    type: "GET",
    success: function (response) {
      console.log(response);

      response.forEach(function (quote) {
        var item = `<div class="carousel-item d-flex flex-row align-items-center justify-content-center pr-4 pl-4 m-0">
                        <img src="${quote.pic_url}" alt="Image">
                            <div class="container">
                                <p class="quote-text">${quote.text}</p>
                                <p class="quote-text"><strong>${quote.name}</strong></p>
                                <p class="quote-text"><em>${quote.title}</em></p>
                            </div>
                        </div>`;
        $(".quoteCarousel").append(item);
      });
    },
    error: function (error) {
      console.error(error);
    },
  });
}
