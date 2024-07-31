// IT'S READY!!!!!!!!!!!!!!!!!
$(document).ready(function () {
  getQuoteData();
  getVideoData();
  getCourseData();
  onInput();
  onClickTopic();
  onClickSortBy();
});


// I really do not like that this is in 3 functions for the filtering
// but I don't really know how to make this less redundant

// Keyword search on input
function onInput() {
  $(".searchInput").on("input", function() {
    var searchValue = $(this).val();
    var selectedTopic = $("#selectedTopic").text();
    var sort = $("#sortBy").text();
    getCourseData(searchValue, selectedTopic, sort);
  });
}

// Topic sort click event
function onClickTopic() {
  $(".sortOptions").on("click", "a", function() {
    var selectedTopic = $(this).text();
    $("#selectedTopic").text(selectedTopic);
    var searchValue = $(".searchInput").val();
    var sort = $("#sortBy").text();
    getCourseData(searchValue, selectedTopic, sort);
  });
}

// Sort by click event
function onClickSortBy() {
  $(".sortBy").on("click", "a", function() {
    var sortBy = $(this).text();
    $("#sortBy").text(sortBy);
    var searchValue = $(".searchInput").val();
    var selectedTopic = $("#selectedTopic").text();
    getCourseData(searchValue, selectedTopic, sortBy);
  });
}

// Show or hide the loader, based on true or false
function showOrHideLoader(shouldShow) {
  if (shouldShow) {
    $(".loader").show();
  } else {
    $(".loader").hide();
  }
}

// Calculate star totals needed
function calculateRatingStars(video) {
  const maxStars = 5;
  const rating = video.star;

  let stars = "";

  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars +=
        '<img src="images/star_on.png" alt="star" width="15px" height="15px" />';
    } else {
      stars +=
        '<img src="images/star_off.png" alt="star" width="15px" height="15px" />';
    }
  }

  return stars;
}

// Creates a video card for each item in the videos array, when called in a loop
function createVideoCard(video) {
  starCount = calculateRatingStars(video);
  var item = `<div class="row align-items-center mx-auto">
                  <div class="d-flex flex-column">
                    <div class="card">
                      <img
                        src="${video.thumb_url}"
                        class="card-img-top"
                        alt="Video thumbnail"
                      />
                      <div class="card-img-overlay text-center">
                        <img
                          src="images/play.png"
                          alt="Play"
                          width="64px"
                          class="align-self-center play-overlay"
                        />
                      </div>
                      <div class="card-body">
                        <h5 class="card-title font-weight-bold">
                          ${video.title}
                        </h5>
                        <p class="card-text text-muted">
                          Lorem ipsum dolor sit amet, consect adipiscing elit,
                          sed do eiusmod.
                        </p>
                        <div class="creator d-flex align-items-center">
                          <img
                            src="images/profile_1.jpg"
                            alt="Creator of
                            Video"
                            width="30px"
                            class="rounded-circle"
                          />
                          <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                        </div>
                        <div class="info pt-3 d-flex justify-content-between">
                          <div class="rating d-flex flex-row">${starCount}</div>
                          <span class="main-color">8 min</span>
                        </div>
                      </div>
                    </div>
                  </div>`;
  return item;
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
                        <div class="d-flex flex-column">
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
  // Wait for ajax to finish
  showOrHideLoader(true);
  $.ajax({
    url: "https://smileschool-api.hbtn.info/popular-tutorials",
    type: "GET",
    success: function (response) {

      response.forEach(function (video) {
        // Create HTML
        var item = createVideoCard(video);
        $(".videoCarousel").append(item);
      });

      // Initialize slick
      $(".videoCarousel").slick({
        centerPadding: "0px",
        slidesToShow: 4,
        infinite: true,
        prevArrow:
          '<img src="/images/arrow_black_left.png" class="videoImage" />',
        nextArrow:
          '<img src="/images/arrow_black_right.png" class="videoImage" />',
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

      // Hide loader
      showOrHideLoader(false);
    },
    error: function (error) {
      console.error(error);
    },
  });
}

// Gets courses from api using ajax
function getCourseData(searchValue = '', selectedTopic = '', sort = '') {
  $.ajax({
    url: "https://smileschool-api.hbtn.info/courses",
    type: "GET",
    data: {
      q: searchValue,
      topic: selectedTopic,
      sort: sort,
    },
    success: function (response) {
      console.log(response);

      var courses = response.courses;

      // Clear the existing videos
      $(".apiVideos").empty();

      // Loop through all videos
      courses.forEach(function (video) {
        // Create HTML for the video card
        var item = createVideoCard(video);
        $(".apiVideos").append(item);
      });
    },
    error: function (error) {
      console.error(error);
    },
  });
}
