$(document).ready( function () {

    // Down n distance row expand/collapse
    $(function() {

        $("td[colspan=6]").closest("tr").hide();
        $("#downs").click(function(event) {
            //console.log(event);
            event.stopPropagation();
            var $target = $(event.target);
            if ( $target.closest("td").attr("colspan") > 1 ) {
                $target.closest("tr").slideToggle();
            } else {
                $target.closest("tr").next().slideToggle();
            }                    
        });
    });

	$('table:not(#downs)').DataTable();

    $('.drop-down-show-hide').hide();

    // Toggle Table view
    $('#dropDown').change(function () {

        $(this).find("option").each(function () {

            $(document.getElementById(this.value)).hide();
        });

        $(document.getElementById(this.value)).show();

    });
});
