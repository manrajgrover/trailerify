const $ = require('jQuery');

/**
 * @param  {string} movie Movie Name
 * @param  {string} year  Year in which movie was released 
 * @return  None
 */
const getMovieDetails = (movie, year) => {
  $.ajax({
    url: 'http://www.omdbapi.com/?t='+movie+'&y='+year+'&plot=short&r=json',
    type: 'GET',
    dataType: 'json'
  })
  .done((data) => {
    // Check for fail response
    if (data.hasOwnProperty('Response') && data['Response'] === 'False') {
      console.log("Movie ratings not found");
    }
    // Show IMDb ratings to user
    else {
      const span = document.createElement('span');
      span.setAttribute('id', 'imdbRating');
      const ratings = document.createTextNode(data['imdbRating']);
      span.appendChild(ratings);
      $('#main_content .videos .video_bar > h1').append(span);
    }
  })
  .fail((err) => {
    console.log(err);
  });
};

try {
  /**
   * Get Movie Name from header
   */
  const movieName = $('#main_content .videos .video_bar > h1 > span').text();

  /**
   * Get year from heading
   */
  const yearRxp = /\(([^)]+)\)/;
  const yearText = $.trim( $('#main_content .videos .video_bar > h1')
                    .contents()
                    .get(1)
                    .nodeValue );
  const year = yearRxp.exec(yearText)[1];

  /**
   * Populate IMDb Ratings
   */
  getMovieDetails(movieName, year);
}
catch(err) {
  console.log('No movie in header');
}
