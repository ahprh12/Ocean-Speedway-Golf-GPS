$(document).ready( function () {

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

	$('table:not(#downs)').DataTable({


		initComplete: function (settings, json) {
	        
	      //   var api = this.api();
			    // var footer = $(this).append('<tfoot><tr>');
			    // this.api().columns().every(function () {
			    //   var column = this;
			    //   $(footer).append('<th>Totals</th>');
			    // });

			    // $(footer).append('</tr></tfoot>');

        },

        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), data;

            // Total over this page
            pageTotal = api
                .column(2, { page: 'current'})
                .data()
                .reduce( function (a, b) {
                    return parseInt(a)+parseInt(b);
                }, 0);

            postTotal(pageTotal);
            //console.log($('tfoot th:eq(2)').html());    
        }

    });

    function postTotal(total) {

    	$('tfoot th:eq(2)').html(total + "T");
    }

});
