$(document).ready(function() {
    
console.log("document ready");
	//start of isotope code
	//init isotope
	var $bigbox = $('.bigbox').isotope({
		//options
		itemSelector: '.bigboxes'
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
      markedBtn = this.  
	  // use filterFn if matches value
	  filterValue = filterFns[ filterValue ] || filterValue;
	  $bigbox.isotope({ filter: filterValue });
	  console.log("smallbox clicked");
	});
	// change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
		console.log("button-group clicked");
	  var $buttonGroup = $( buttonGroup );
	  $buttonGroup.on( 'click', '.smallboxes', function() {

	    $buttonGroup.find('.is-checked').removeClass('is-checked');
	    $buttonGroup.find('.smallboxColor').removeClass('smallboxColor');

	    $( this ).addClass('is-checked');
	    $( this ).addClass('smallboxColor');
	  });
	});
	// end of isotope code


    $('a[data-toggle="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'bottom',
        html: true
    });

	$('.viscomBox').click(function (){
		console.log("cl");
		if($('#viscom').is(":not(:visible)") ){
		    $('#viscom').show(); 
		    $(this).toggleClass('box boxColor'); 
		}else{
		     $('#viscom').hide(); 
		     $(this).toggleClass(' boxColor box'); 
		}
	});

	$('.openDays').click(function (){
		console.log("open days clicked");
		if($('#openDaysContainer').is(":not(:visible)") ){
		    $('#openDaysContainer').show(); 
		    $('#submissionContainer').hide();  
		    $('#resultsContainer').hide(); 
		   	$('.openDays').addClass(' boxColor'); 
		   	$('.submission').removeClass(' boxColor '); 
		    $('.results').removeClass(' boxColor '); 
		}else{
		    $('#openDaysContainer').hide();

		}
	});
	$('.submission').click(function (){
		console.log("submission clicked");
		if($('#submissionContainer').is(":not(:visible)") ){
		    $('#submissionContainer').show(); 
		    $('#openDaysContainer').hide();
		    $('#resultsContainer').hide(); 
		    $('.submission').addClass(' boxColor'); 
		   	$('.openDays').removeClass(' boxColor '); 
		    $('.results').removeClass(' boxColor '); 
		}else{
		    $('#submissionContainer').hide(); 
		    $('#openDaysContainer').toggleClass(' boxColor box'); 
		}
	});
	$('.results').click(function (){
		console.log("results clicked");
		if($('#resultsContainer').is(":not(:visible)") ){
		    $('#resultsContainer').show(); 
		    $('#submissionContainer').hide(); 
		    $('#openDaysContainer').hide();
		    $('.results').addClass(' boxColor'); 
		   	$('.submission').removeClass(' boxColor '); 
		    $('.openDays').removeClass(' boxColor '); 
		}else{
		    $('#resultsContainer').hide(); 
		    $(this).toggleClass(' boxColor box'); 
		}
	});

}); // end of $(document).ready(function() {

function smallboxColor(){
	var box = document.activeElement.tagName;
}	