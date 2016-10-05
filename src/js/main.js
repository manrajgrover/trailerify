const $ = require('jQuery');

$.fn.isThere = function() {
  if (this.length === 0) {
    throw Error("Empty result")
  }
  return this;
}

/**
 * @param  {string} movie Movie Name
 * @param  {string} year  Year in which movie was released 
 * @return  None
 */
const getMovieDetails = (movie, year) => {
  if (movie === undefined || year === undefined) {
    console.log("No information to search for");
    return;
  }
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
      /**
       * Rating found, try to append in main page
       */
      try {
        /**
         * Create list of elements
         */
        const listItem = document.createElement('li');

        /**
         * Create header span
         */
        const headingSpan = document.createElement('span');
        headingSpan.setAttribute('class', 'mthick');
        const heading = document.createTextNode("IMDb Rating: ");
        headingSpan.appendChild(heading);

        /**
         * Create rating span
         */
        const ratingSpan = document.createElement('span');
        const ratings = document.createTextNode(data['imdbRating']);
        ratingSpan.appendChild(ratings);

        /**
         * Append list item to list
         */
        listItem.appendChild(headingSpan);
        listItem.appendChild(ratingSpan);

        $('#main_content .movie_details .more_info > ul .f_col')
          .isThere()
          .append(listItem);
      }
      catch(err) {
        /**
         * Rating found, try to append in trailer page
         */
        try {

          /**
           * Create header span
           */
          const headingSpan = document.createElement('span');
          const heading = document.createTextNode("IMDb Rating");
          headingSpan.appendChild(heading);

          /**
           * Creates rating text node
           */
          const ratings = document.createTextNode(data['imdbRating']);

          /**
           * Appends nodes to the list
           */
          $('#interior .finfo_outer:nth-child(1) .finfo:nth-child(2)')
            .isThere()
            .append("<br/><br/>")
            .append(headingSpan)
            .append("<br/>")
            .append(ratings);
        }
        catch(err) {
          console.log("Error here");
        }
      }
    }
  })
  .fail((err) => {
    console.log(err);
  });
};

const getDetailsFromMainPage = () => {
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

const getMovieDetailsFromTrailerPage = () => {
  /**
   * Get Movie Name from header
   */
  const movieName = $('#main_content .videos .video_bar > h1 > span > a').text();
  /**
   * Get year from heading
   */
  const yearRxp = /\(([^)]+)\)/;
  const yearText = $.trim( $('#main_content .videos .video_bar > h1 > span')
                            .contents()
                            .get(1)
                            .nodeValue );
  const year = yearRxp.exec(yearText)[1];
  /**
   * Populate IMDb Ratings
   */
  getMovieDetails(movieName, year);
}

try {
  getDetailsFromMainPage();
}
catch(err) {
  try {
    getMovieDetailsFromTrailerPage();
  }
  catch(err) {
    console.log("No Movie Found");
  }
}
