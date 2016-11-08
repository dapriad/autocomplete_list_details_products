//we do this so that  details_prod don't appear
$("#details_prod").hide();
$(document).ready(function () {
    $('.prod').click(function () {
        var id = this.getAttribute('id');
        //alert(id);

        $.get("modules/frontend_products/controller/controller_frontend_products.class.php?idProducto=" + id, function (data, status) {
            var json = JSON.parse(data);
            var product = json.product;
            //alert(product.name);
            //console.log(product);
            
            $('#results').html('');
            $('.pagination_prods').html('');


            var img_product = document.getElementById('img_product');
            img_product.innerHTML = '<img src="' + product.avatar + '" class="img-product"> ';
            
            document.getElementById('prod_name').innerHTML =  product.prod_name;
            
            document.getElementById('dis_date_prod').innerHTML ="Discharge date: "+product.dis_date;
            
            document.getElementById('exp_date_prod').innerHTML ="Expiration date: "+product.exp_date;
            
            document.getElementById('country').innerHTML ="Country: "+product.country;
            
            document.getElementById('province').innerHTML ="Province: "+product.province;
            
            document.getElementById('population').innerHTML ="Population: "+product.population;
            
            document.getElementById('status').innerHTML ="Status: "+product.status;
            
            document.getElementById('price').innerHTML ="Product price: "+product.price+" €";
          
            // $("#img_prod").html('<img src="' + product.avatar + '" height="75" width="75"> ');
            // $("#name_prod").html(product.prod_name);
            // $("#dis_date_prod").html("<strong>Discharge date: <br/></strong>" + product.dis_date);
            // $("#exp_date_prod").html("<strong>Expiration date: <br/></strong>" + product.exp_date);
            // $("#status").html("<strong>Status:</strong>" + product.status);
            // $("#price_prod").html("Price: " + product.price + " €");

            //we do this so that  details_prod  appear
           // $("#details_prod").show();


            // $("#product").dialog({
            //     width: 850, //<!-- ------------- ancho de la ventana -->
            //     height: 500, //<!--  ------------- altura de la ventana -->
            //     //show: "scale", <!-- ----------- animación de la ventana al aparecer -->
            //     //hide: "scale", <!-- ----------- animación al cerrar la ventana -->
            //     resizable: "false", //<!-- ------ fija o redimensionable si ponemos este valor a "true" -->
            //     //position: "down",<!--  ------ posicion de la ventana en la pantalla (left, top, right...) -->
            //     modal: "true", //<!-- ------------ si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
            //     buttons: {
            //         Ok: function () {
            //             $(this).dialog("close");
            //         }
            //     },
            //     show: {
            //         effect: "blind",
            //         duration: 1000
            //     },
            //     hide: {
            //         effect: "explode",
            //         duration: 1000
            //     }
            // });
        })
                .fail(function (xhr) {
                    //if  we already have an error 404
                    if (xhr.status === 404) {
                        $("#results").load("modules/frontend_products/controller/controller_frontend_products.class.php?view_error=false");
                    } else {
                        $("#results").load("modules/frontend_products/controller/controller_frontend_products.class.php?view_error=true");
                    }
                    ;
                });
    });
});
