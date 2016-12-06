$(document).ready(function() {
console.log("document ready");
	//start of isotope code
	//init isotope
	var $bigbox = $('.bigbox').isotope({
		//options
		itemSelector: '.bigboxes',
		layoutMode: 'fitRows',
	});
	// filter functions, name is matching data-filter class and a class in the bigbox divs
	var filterFns = {
	  drawing: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /drawing$/ );
	  },
	  photography: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /photography$/ );
	  },
	  graphicdesign: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /graphicdesign$/ );
	  },
	  modelmaking: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /modelmaking$/ );
	  },
	  music: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /music$/ );
	  },
	  makeup: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /makeup$/ );
	  },
	  costume: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /costume$/ );
	  },
	  film: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /film$/ );
	  },
	  stagedesign: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /stagedesign$/ );
	  },
	  writing: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /writing$/ );
	  },
	  art: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /art$/ );
	  },
	  media: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /media$/ );
	  }
	};
	// on smallbox click the filter is applied to the divs and they are displayed accordingly
	$('.filter-button-group').on( 'click', '.smallboxes', function() {
	  var filterValue = $( this ).attr('data-filter');
	  // use filterFn if matches value
	  filterValue = filterFns[ filterValue ] || filterValue;
	  $bigbox.isotope({ filter: filterValue });
	  console.log("smallbox clicked");
	});
	// change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
		console.log("s clicked");
	  var $buttonGroup = $( buttonGroup );
	  $buttonGroup.on( 'click', '.smallboxes', function() {
	    $buttonGroup.find('.is-checked').removeClass('is-checked');
	    $( this ).addClass('is-checked');
	  });
	});
	// end of isotope code

});