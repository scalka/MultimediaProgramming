$(document).ready(function() {
console.log("log");
});

var $bigbox = $('.bigbox').isotope({
	//options
});

$('.smallboxes').on('click', 'button', function(){
	var filterValue = $(this).attr('data-filter');
	$bigbox.isotope({ filter: filterValue });
	console.log("btn clicked");
})

